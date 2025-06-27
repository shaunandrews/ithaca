import { tools } from './tools.js';

export const experts = [
    {
        id: 1,
        title: 'HTML Block Finder',
        description:
            'Returns requested blocks from user-provided HTML snippets.',
        tools: [{ ...tools.find((t) => t.id === 10), subtitle: 'HTML' }],
        usage: 'Daily',
    },
    {
        id: 2,
        title: 'Billing Lookup',
        description: 'Retrieves customer billing info from Zendesk.',
        tools: [{ ...tools.find((t) => t.id === 11) }],
        usage: 'Daily',
    },
    {
        id: 3,
        title: 'Docs Answer Bot',
        description: 'Finds helpful articles for common questions.',
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
        tools: [
            { ...tools.find((t) => t.id === 1) },
            { ...tools.find((t) => t.id === 2) },
        ],
        usage: 'Medium',
    },
];
