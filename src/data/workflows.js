import { experts } from './experts.js';

export const sampleAgentWorkflow = {
    id: 'sample-agent-workflow',
    name: 'Customer Support Agent',
    description: 'Handles customer messages through various processing steps',
    steps: [
        {
            uid: 'receive-message',
            stepNumber: 1,
            title: 'Receive message',
            type: 'trigger',
            inputs: [],
            outputs: ['message']
        },
        {
            uid: 'gather-context',
            stepNumber: 2,
            title: getExpertById(1)?.title || 'Gather context',
            type: 'expert',
            expertId: 1,
            inputs: getExpertById(1)?.inputs || ['message.author.id'],
            outputs: getExpertById(1)?.outputs || [
                'context.customer_profile',
                'context.purchase_history',
                'context.support_history',
                'context.customer_sites'
            ]
        },
        {
            uid: 'interpret-meaning',
            stepNumber: 3,
            title: getExpertById(2)?.title || 'Interpret meaning',
            type: 'expert',
            expertId: 2,
            inputs: getExpertById(2)?.inputs || ['message'],
            outputs: getExpertById(2)?.outputs || ['context.needs', 'context.intent']
        },
        {
            uid: 'assign-tags',
            stepNumber: 4,
            title: getExpertById(3)?.title || 'Assign tags',
            type: 'expert',
            expertId: 3,
            inputs: getExpertById(3)?.inputs || ['message'],
            outputs: getExpertById(3)?.outputs || ['context.tags']
        },
        {
            uid: 'analyze-sentiment',
            stepNumber: 5,
            title: getExpertById(4)?.title || 'Analyze sentiment',
            type: 'expert',
            expertId: 4,
            inputs: getExpertById(4)?.inputs || ['message'],
            outputs: getExpertById(4)?.outputs || ['context.sentiment']
        },
        {
            uid: 'if-else',
            stepNumber: 6,
            title: 'If/Else',
            type: 'control-flow',
            controlType: 'conditional',
            inputs: ['context.tags', 'context.sentiment'],
            outputs: [],
            branches: [
                {
                    condition: {
                        type: 'equals',
                        variable: 'tag',
                        value: 'billing'
                    },
                    steps: [
                        {
                            uid: 'compose-escalation-billing',
                            title: getExpertById(5)?.title || 'Compose escalation',
                            type: 'expert',
                            expertId: 5,
                            inputs: getExpertById(5)?.inputs || ['message', 'context'],
                            outputs: getExpertById(5)?.outputs || ['conversation_escalation_summary']
                        },
                        {
                            uid: 'send-email-billing',
                            title: 'Send email',
                            type: 'tool',
                            inputs: ['email_address', 'email_subject', 'email_body'],
                            outputs: []
                        }
                    ]
                },
                {
                    condition: {
                        type: 'equals',
                        variable: 'tag',
                        value: 'legal'
                    },
                    steps: [
                        {
                            uid: 'create-zendesk-legal',
                            title: 'Create Zendesk ticket',
                            type: 'tool',
                            inputs: [],
                            outputs: []
                        },
                        {
                            uid: 'send-response-legal',
                            title: 'Send response',
                            type: 'tool',
                            inputs: [],
                            outputs: []
                        },
                        {
                            uid: 'end-flow-legal',
                            title: 'End flow',
                            type: 'exit',
                            inputs: [],
                            outputs: []
                        }
                    ]
                },
                {
                    condition: {
                        type: 'equals',
                        variable: 'context.sentiment',
                        value: 'very angry'
                    },
                    steps: [
                        {
                            uid: 'escalate-to-human',
                            title: 'Escalate to human',
                            type: 'tool',
                            inputs: [],
                            outputs: []
                        },
                        {
                            uid: 'wait-for-response',
                            title: 'Wait for response',
                            type: 'pause',
                            inputs: [],
                            outputs: []
                        }
                    ]
                }
            ]
        },
        {
            uid: 'gather-sources',
            stepNumber: 7,
            title: getExpertById(6)?.title || 'Gather sources',
            type: 'expert',
            expertId: 6,
            inputs: getExpertById(6)?.inputs || ['tags', 'context.customer_profile', 'context.purchase_history', 'context.support_history', 'context.customer_sites'],
            outputs: getExpertById(6)?.outputs || ['context.sources']
        },
        {
            uid: 'compose-response',
            stepNumber: 8,
            title: getExpertById(7)?.title || 'Compose response',
            type: 'expert',
            expertId: 7,
            inputs: getExpertById(7)?.inputs || ['message', 'context'],
            outputs: getExpertById(7)?.outputs || ['response']
        },
        {
            uid: 'send-response',
            stepNumber: 9,
            title: 'Send response',
            type: 'tool',
            inputs: ['message', 'response'],
            outputs: []
        },
        {
            uid: 'end-flow',
            stepNumber: 10,
            title: 'End flow',
            type: 'exit',
            inputs: [],
            outputs: []
        }
    ],
    variables: [
        'message',
        'tag',
        'email_address',
        'email_subject',
        'email_body'
    ],
    contextVariables: [
        'customer_profile',
        'purchase_history',
        'support_history',
        'customer_sites',
        'tags',
        'sentiment',
        'needs',
        'intent',
        'sources',
        'response',
        'conversation_escalation_summary'
    ]
}

// Export for use in components
export const workflows = [
    sampleAgentWorkflow
]

// Helper function to get a workflow by ID
export function getWorkflowById(id) {
    return workflows.find(workflow => workflow.id === id)
}

// Helper function to get an expert by ID for workflow steps
export function getExpertById(id) {
    return experts.find(expert => expert.id === id)
}

// Helper function to flatten all steps (including nested ones) for easy searching
export function getAllStepsFlat(workflow) {
    const allSteps = []
    
    function extractSteps(steps) {
        steps.forEach(step => {
            allSteps.push(step)
            if (step.type === 'control-flow' && step.branches) {
                step.branches.forEach(branch => {
                    if (branch.steps) {
                        extractSteps(branch.steps)
                    }
                })
            }
        })
    }
    
    extractSteps(workflow.steps)
    return allSteps
}

// Helper function to find a step by UID anywhere in the workflow
export function findStepByUid(workflow, uid) {
    return getAllStepsFlat(workflow).find(step => step.uid === uid)
} 