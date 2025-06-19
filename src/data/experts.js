import { tools } from './tools.js';

export const experts = [
  {
    id: 1,
    title: 'HTML Block Finder',
    description: 'Returns requested blocks from user-provided HTML snippets.',
    tools: [
      { ...tools.find(t => t.title === 'Input'), subtitle: 'HTML' }
    ],
    usage: 'Daily',
  },
  {
    id: 2,
    title: 'Billing Lookup',
    description: 'Retrieves customer billing info from Zendesk.',
    tools: [
      { ...tools.find(t => t.title === 'Zendesk') }
    ],
    usage: 'Daily',
  },
  {
    id: 3,
    title: 'Docs Answer Bot',
    description: 'Finds helpful articles for common questions.',
    tools: [
      { ...tools.find(t => t.title === 'Reference'), subtitle: 'support.wordpress.com' }
    ],
    usage: 'High',
  },
  {
    id: 4,
    title: 'Meeting Time Finder',
    description: 'Suggests meeting times based on participants calendars.',
    tools: [
      { ...tools.find(t => t.title === 'Slack') },
      { ...tools.find(t => t.title === 'Calendar') }
    ],
    usage: 'Medium',
  },
];
