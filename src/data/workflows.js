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
            description: 'A message from a customer, usually a chat (synchronous) or email (asynchronous)',
            inputs: [],
            outputs: ['message']
        },
        {
            uid: 'gather-context',
            stepNumber: 2,
            title: 'Gather context',
            type: 'expert',
            description: 'Gathers information about the customer',
            inputs: ['message.author.id'],
            outputs: [
                'context.customer_profile',
                'context.purchase_history',
                'context.support_history',
                'context.customer_sites'
            ]
        },
        {
            uid: 'interpret-meaning',
            stepNumber: 3,
            title: 'Interpret meaning',
            type: 'expert',
            description: 'Uses Natural Language Processing (NLP) to understand intent and needs.',
            inputs: ['message'],
            outputs: ['context.needs', 'context.intent']
        },
        {
            uid: 'assign-tags',
            stepNumber: 4,
            title: 'Assign tags',
            type: 'expert',
            description: 'Generate a tag or list of tags based on text. Optionally define a list of tags to choose from.',
            inputs: ['message'],
            outputs: ['context.tags']
        },
        {
            uid: 'analyze-sentiment',
            stepNumber: 5,
            title: 'Analyze sentiment',
            type: 'expert',
            description: 'Determines how the customer is feeling',
            inputs: ['message'],
            outputs: ['context.sentiment']
        },
        {
            uid: 'if-else',
            stepNumber: 6,
            title: 'If/Else',
            type: 'control-flow',
            controlType: 'conditional',
            description: 'accepts inputs and allows rules to determine the next step',
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
                            title: 'Compose escalation',
                            type: 'expert',
                            description: 'Summarizes conversation and includes relevant links.',
                            inputs: ['message', 'context'],
                            outputs: ['conversation_escalation_summary']
                        },
                        {
                            uid: 'send-email-billing',
                            title: 'Send email',
                            type: 'tool',
                            description: 'Send an email',
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
                            description: 'forward information to legal team via zendesk',
                            inputs: [],
                            outputs: []
                        },
                        {
                            uid: 'send-response-legal',
                            title: 'Send response',
                            type: 'tool',
                            description: 'respond to customer via original channel',
                            inputs: [],
                            outputs: []
                        },
                        {
                            uid: 'end-flow-legal',
                            title: 'End flow',
                            type: 'exit',
                            description: 'Terminates the workflow',
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
                            description: 'Contact a human and wait for guidance',
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
            title: 'Gather sources',
            type: 'expert',
            description: 'Collects information from available sources',
            inputs: ['tags', 'context.customer_profile', 'context.purchase_history', 'context.support_history', 'context.customer_sites'],
            outputs: ['context.sources']
        },
        {
            uid: 'compose-response',
            stepNumber: 8,
            title: 'Compose response',
            type: 'expert',
            description: 'Composes a response to a message based on the context.',
            inputs: ['message', 'context'],
            outputs: ['response']
        },
        {
            uid: 'send-response',
            stepNumber: 9,
            title: 'Send response',
            type: 'tool',
            description: 'Sends a response to a message',
            inputs: ['message', 'response'],
            outputs: []
        },
        {
            uid: 'end-flow',
            stepNumber: 10,
            title: 'End flow',
            type: 'action',
            description: 'Completes the workflow',
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