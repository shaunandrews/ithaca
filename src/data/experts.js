import { tools } from './tools.js';

export const experts = [
    {
        id: 1,
        title: 'Gather context',
        description: 'Gathers comprehensive information about customers from multiple sources.',
        instructions: `
            You are a customer context expert. Use [tool title="User Profile"] to access customer account details.
            Use [tool title="Support History"] to review previous support interactions.
            Use [tool title="P2" value="Work Sites"] to find customer sites and projects.
            Compile a complete picture of the customer's profile, purchase history, and support interactions.
        `,
        inputs: ['message.author.id'],
        outputs: [
            'context.customer_profile',
            'context.purchase_history',
            'context.support_history',
            'context.customer_sites'
        ],
        tools: [
            { ...tools.find((t) => t.id === 6) },
            { ...tools.find((t) => t.id === 5) },
            { ...tools.find((t) => t.id === 12), subtitle: 'Work Sites' },
        ],
        usage: 'High',
    },
    {
        id: 2,
        title: 'Analyze intent',
        description: 'Uses NLP to understand customer intent and needs from messages.',
        instructions: `
            You are a natural language processing expert. Use [tool title="Input" value="Customer Message"] to analyze the provided message.
            Determine the customer's underlying intent and specific needs.
            Classify the type of request and identify key information the customer is seeking.
            Provide clear intent categorization and needs assessment.
        `,
        inputs: ['message'],
        outputs: ['context.needs', 'context.intent'],
        tools: [
            { ...tools.find((t) => t.id === 10), subtitle: 'Customer Message' },
        ],
        usage: 'High',
    },
    {
        id: 3,
        title: 'Assign tags',
        description: 'Generates relevant tags for a message based on content analysis.',
        instructions: `
            You are a message classification expert. Use [tool title="Input" value="Message Content"] to analyze the message.
            Generate appropriate tags that categorize the message content (e.g., billing, technical, legal, refund).
            Use consistent tagging conventions and select from predefined tag categories when available.
            Provide multiple relevant tags when appropriate.
        `,
        inputs: ['message'],
        outputs: ['context.tags'],
        tools: [
            { ...tools.find((t) => t.id === 10), subtitle: 'Message Content' },
        ],
        usage: 'High',
    },
    {
        id: 4,
        title: 'Analyze sentiment',
        description: 'Determines customer emotional state and sentiment from messages.',
        instructions: `
            You are a sentiment analysis expert. Use [tool title="Input" value="Customer Message"] to analyze the emotional tone.
            Determine the customer's sentiment level (positive, neutral, negative, very angry, frustrated, etc.).
            Identify emotional indicators and urgency levels.
            Provide actionable sentiment insights for appropriate response handling.
        `,
        inputs: ['message'],
        outputs: ['context.sentiment'],
        tools: [
            { ...tools.find((t) => t.id === 10), subtitle: 'Customer Message' },
        ],
        usage: 'High',
    },
    {
        id: 5,
        title: 'Compose escalation',
        description: 'Creates comprehensive escalation summaries for specialized teams.',
        instructions: `
            You are an escalation specialist. Use [tool title="Reference"] to find relevant documentation and procedures.
            Create detailed escalation summaries that include conversation context, customer details, and relevant links.
            Ensure escalations contain all necessary information for efficient handoff to specialized teams.
            Format escalations clearly with priority levels and next steps.
        `,
        inputs: ['message', 'context'],
        outputs: ['conversation_escalation_summary'],
        tools: [
            { ...tools.find((t) => t.id === 7) },
        ],
        usage: 'Medium',
    },
    {
        id: 6,
        title: 'Gather sources',
        description: 'Collects relevant information from multiple sources based on context.',
        instructions: `
            You are a source compilation expert. Use [tool title="Reference"] to find relevant documentation.
            Use [tool title="Support History"] to review related support cases.
            Use [tool title="P2" value="Work Sites"] to gather site-specific information.
            Compile comprehensive source material that addresses the customer's needs and context.
        `,
        inputs: ['tags', 'context.customer_profile', 'context.purchase_history', 'context.support_history', 'context.customer_sites'],
        outputs: ['context.sources'],
        tools: [
            { ...tools.find((t) => t.id === 7) },
            { ...tools.find((t) => t.id === 5) },
            { ...tools.find((t) => t.id === 12), subtitle: 'Work Sites' },
        ],
        usage: 'High',
    },
    {
        id: 7,
        title: 'Compose response',
        description: 'Composes helpful, contextual responses to customer messages.',
        instructions: `
            You are a response composition expert. Use [tool title="Reference"] to find relevant documentation.
            Use [tool title="Persona"] to adopt appropriate tone and voice for responses.
            Create helpful, accurate responses that address customer needs using available context.
            Ensure responses are clear, professional, and actionable.
        `,
        inputs: ['message', 'context'],
        outputs: ['response'],
        tools: [
            { ...tools.find((t) => t.id === 7) },
            { ...tools.find((t) => t.id === 3) },
        ],
        usage: 'High',
    },
];
