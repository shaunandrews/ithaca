import { tools } from './tools.js';

export const experts = [
    {
        id: 1,
        title: 'HTML Block Finder',
        description:
            'Returns requested blocks from user-provided HTML snippets.',
        instructions: `
            You are an HTML parsing expert. Use [tool title="Input" value="HTML"] to parse the provided HTML content.
            Find and return the specific HTML blocks or elements that match the user's request.
            Be precise and only return the requested content without additional markup.
        `,
        tools: [{ ...tools.find((t) => t.id === 10), subtitle: 'HTML' }],
        usage: 'Daily',
    },
    {
        id: 2,
        title: 'Billing Lookup',
        description: 'Retrieves customer billing info from Zendesk.',
        instructions: `
            You are a billing lookup expert. Use [tool title="Zendesk"] to retrieve customer billing information.
            Always verify customer identity before providing billing details.
            Present billing information in a clear, organized format.
        `,
        tools: [{ ...tools.find((t) => t.id === 11) }],
        usage: 'Daily',
    },
    {
        id: 3,
        title: 'Docs Answer Bot',
        description: 'Finds helpful articles for common questions.',
        instructions: `
            You are a documentation expert. Use [tool title="Reference" value="support.wordpress.com"] to find relevant support articles.
            Match user questions to the most appropriate documentation.
            Provide clear, actionable answers with links to full articles when helpful.
        `,
        tools: [
            {
                ...tools.find((t) => t.id === 7),
                subtitle: 'support.wordpress.com',
            },
        ],
        usage: 'High',
    },
    {
        id: 4,
        title: 'Meeting Time Finder',
        description: 'Suggests meeting times based on participants calendars.',
        instructions: `
            You are a meeting scheduling expert. Use [tool title="Calendar"] to check participant availability.
            Use [tool title="Email"] to send meeting invitations once a time is confirmed.
            Find optimal meeting times that work for all participants and respect time zones.
        `,
        tools: [
            { ...tools.find((t) => t.id === 1) },
            { ...tools.find((t) => t.id === 2) },
        ],
        usage: 'Medium',
    },
];
