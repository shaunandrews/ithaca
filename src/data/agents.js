import { tools } from './tools.js';

export const agents = [
  {
    id: 1,
    title: 'WP.com Support Chat',
    description: 'Answering customer questions in realtime',
    owner: "Team HAL",
    ownerIcon: 'icon-teamhal.png',
    tags: ['wordpress.com', 'chat', 'support', 'customer-service', 'wapuu', 'realtime', 'troubleshooting'],
    tools: [
      { ...tools.find(t => t.id === 4), subtitle: 'WordPress.com' },
      { ...tools.find(t => t.id === 3), subtitle: 'Wappu' },
      { ...tools.find(t => t.id === 6) },
      { ...tools.find(t => t.id === 5) },
      { ...tools.find(t => t.id === 7), subtitle: 'support.wordpress.com' }
    ],
    stats: {
      totalConversations: 1247,
      qualityScore: 4.6,
      flagRate: 2.3,
      correctionPercentage: 8.7,
      avgResponseTime: 45, // seconds
      escalationRate: 12.4,
      agentVersion: '2.1.3',
      satisfactionRating: 4.5,
      resolutionRate: 87.2,
      firstContactResolution: 72.8,
      uptime: 99.2,
      commonFeedbackThemes: [
        'Helpful and friendly',
        'Quick response time',
        'Sometimes needs human escalation',
        'Good at finding relevant articles'
      ],
      performanceTrend: 'improving',
      lastUpdated: '2024-06-10T14:30:00Z'
    },
    instructions: `
        You are a helpful support agent for WordPress.com. Use [tool title="Persona" value="Wappuu"] for all responses.
        Review the [tool title="User Profile"] and [tool title="Support History"] to learn about the user and their past support interactions. Prioritize recent interactions and use this context in response if needed.
        Review the [tool title="Chat"] to see the user's previous messages and use this context in your response.
        If the user is asking about a specific issue, use the [tool title="Reference" value="support.wordpress.com"] tool to find the most relevant support article.
        If you don't have the information to answer the user's question, say you don't know and escalate to a human agent.
        Be friendly, concise, and professional in all responses.
    `,
    conversationIds: [1, 2, 3],
    trigger: 'chat-message',
    previewEvents: [
      {
        question: "Hi, I'm Wappuu, an AI helper for WordPress.com. How can I help you today?"
      },
      {
        loading: 'Reviewing your question...',
        done: 'Found a relevant support article',
        delay: 1200,
      },
      {
        loading: 'Reviewing your profile and support history...',
        done: 'Reviewed profile and recent support history.',
        delay: 1000,
      },
      {
        loading: 'Reviewing chat history...',
        done: 'No relevant chat history found.',
        delay: 1000,
      },
      {
        loading: 'Wappuu is composing response...',
        done: 'Response ready.',
        delay: 1000,
      },
      {
        question: 'Oh no! That\'s no good. But I can help you with that. \n\nI\'ve found a few articles that might help you. \n\n[tool title="Reference" value="support.wordpress.com"]\n\nBasically, you need to find the "reset password" link and check your email for a new message.\n\nHopefully this helps. Are you able to reset you password?',
      }
    ],
  },
  {
    id: 2,
    title: 'Tumblr Email Triage',
    description: 'First-line email triage for help@tumblr.com',
    owner: "Team HAL",
    ownerIcon: 'icon-teamhal.png',
    tags: ['tumblr', 'email', 'triage', 'support', 'zendesk', 'first-line', 'automation'],
    tools: [
      { ...tools.find(t => t.id === 11) },
      { ...tools.find(t => t.id === 8), subtitle: 'help@tumblr.com' },
      { ...tools.find(t => t.id === 3), subtitle: 'TumblrBot' },
      { ...tools.find(t => t.id === 6) },
      { ...tools.find(t => t.id === 5) },
      { ...tools.find(t => t.id === 7), subtitle: 'support.tumblr.com' }
    ],
    stats: {
      totalConversations: 892,
      qualityScore: 4.2,
      flagRate: 3.1,
      correctionPercentage: 11.2,
      avgResponseTime: 180, // seconds (3 minutes)
      escalationRate: 18.7,
      agentVersion: '1.8.9',
      satisfactionRating: 4.1,
      resolutionRate: 79.3,
      firstContactResolution: 65.4,
      uptime: 98.7,
      commonFeedbackThemes: [
        'Good at categorizing issues',
        'Sometimes too robotic',
        'Needs better context understanding',
        'Fast triage processing'
      ],
      performanceTrend: 'stable',
      lastUpdated: '2024-06-09T16:45:00Z'
    },
    instructions: `
    You are a helpful support agent for Tumblr.com. Use [tool title="Persona" value="TumblrBot"] for all responses.
    Review the [tool title="Email" value="help@tumblr.com"] to see the user's email and use this context in your response.
    If the user is asking about a specific issue, use the [tool title="Reference" value="support.tumblr.com"] tool to find the most relevant support article.
    If you don't have the information to answer the user's question, say you don't know and escalate to a human agent.
    Be friendly, concise, and professional in all responses.
    `,
    conversationIds: [4, 5, 6],
    trigger: 'email-message',
    previewEvents: [
      { loading: 'Connecting to email...', done: 'Connected to email', delay: 1000 },
    ],
  },
  {
    id: 3,
    title: 'Gravatar Overdue Projects',
    description: 'Daily Slack reminders for overdue projects',
    owner: "Lighthouse",
    ownerIcon: 'icon-teamlighthouse.png',
    tags: ['gravatar', 'linear', 'slack', 'project-management', 'reminders', 'automation', 'scheduled', 'overdue'],
    tools: [
      { ...tools.find(t => t.id === 9), subtitle: 'Team Gravatar' },
      { ...tools.find(t => t.id === 1) },
    ],
    stats: {
      totalConversations: 156,
      qualityScore: 4.8,
      flagRate: 1.2,
      correctionPercentage: 3.4,
      avgResponseTime: 5, // seconds (very fast for automated tasks)
      escalationRate: 0.6,
      agentVersion: '3.2.1',
      satisfactionRating: 4.7,
      resolutionRate: 96.8,
      firstContactResolution: 94.2,
      uptime: 99.8,
      commonFeedbackThemes: [
        'Very reliable for reminders',
        'Excellent at finding project owners',
        'Helpful project summaries',
        'Never misses scheduled runs'
      ],
      performanceTrend: 'excellent',
      lastUpdated: '2024-06-10T08:30:00Z'
    },
    instructions: `
    Find any overdue projects for the [tool title="Linear" value="Team Gravatar"]
    If there hasn't been an update in the last week, determine the owner of the project. If no owner is listed, find the last person to update the project.
    Find the owner in [tool title="Slack"]. If multiple people are found, message the most likely one.
    The Slack message should inform them that the project is overdue, and should include a summary of the project (and its last update) with a link to Linear.
    `,
    conversationIds: [7, 8, 9],
    trigger: 'scheduled',
    previewEvents: [
      {
        loading: 'Connecting to Linear',
        done: 'Connected to Linear',
        delay: 1000,
      },
      {
        loading: 'Reviewing 23 Gravatar projects',
        done: 'Found 3 overdue projects',
        delay: 1200,
        details: [
          'Profile Color Scheme, Owner: Shaun Andrews • 1 day overdue',
          'Gravatar for Teams, Owner: Jack Smith • 2 days overdue',
          'Combined Design Controls, Owner: Katie Genovese • 3 days overdue',
        ],
      },
      {
        loading: 'Searching Slack for project owners',
        done: 'Found 3 project owners and sent each a message',
        delay: 1000,
        details: [
          'Shaun Andrews: "Hey Shaun, the Profile Color Scheme is 1 day overdue. Can you take a look? linear.app/s/profile-color-scheme"',
          'Jack Smith: "Hey Jack, the Gravatar for Teams is 2 days overdue. Can you take a look? linear.app/s/gravatar-for-teams"',
          'Katie Genovese: "Hey Katie, the Combined Design Controls is 3 days overdue. Can you take a look? linear.app/s/combined-design-controls"',
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Big Sky',
    description: 'Designing beautiful sites for WordPress.com',
    owner: "Team HAL",
    ownerIcon: 'icon-teamhal.png',
    tags: ['wordpress.com', 'design', 'html', 'blocks', 'parsing', 'sites', 'frontend', 'development'],
    tools: [
      { ...tools.find(t => t.id === 10), subtitle: 'HTML' },
      { ...tools.find(t => t.id === 10), subtitle: 'Requested block' },
    ],
    stats: {
      totalConversations: 423,
      qualityScore: 4.4,
      flagRate: 4.7,
      correctionPercentage: 14.8,
      avgResponseTime: 12, // seconds
      escalationRate: 5.2,
      agentVersion: '1.4.7',
      satisfactionRating: 4.3,
      resolutionRate: 91.5,
      firstContactResolution: 88.9,
      uptime: 99.1,
      commonFeedbackThemes: [
        'Great at parsing HTML',
        'Handles malformed code well',
        'Could be better with edge cases',
        'Fast and accurate results'
      ],
      performanceTrend: 'improving',
      lastUpdated: '2024-06-10T15:15:00Z'
    },
    instructions: `
    You are a helpful designer for WordPress.com. Use [tool title="Input" value="HTML"] to parse the HTML and [tool title="Input" value="Requested block"] to search for the block that matches the requested name.
    If found, return the block's HTML. If not found, reply with a helpful error message.
    Be robust to malformed HTML and ambiguous block names.
    Be friendly, concise, and professional in all responses.
    `,
    conversationIds: [10, 11, 12],
    trigger: 'on-demand',
    previewEvents: [
      { loading: 'Parsing HTML...', done: 'Block found', delay: 1000 },
    ],
  },

  {
    id: 6,
    title: 'Agent Dave',
    description: 'A Slack chatbot for searching, finding insights, and locating DRIs across many P2 sites.',
    owner: '@apeatling',
    ownerIcon: 'avatar-apeatling.png',
    tags: ['slack', 'p2', 'search', 'dri', 'chatbot', 'insights', 'information-retrieval', 'workplace'],
    tools: [
      { ...tools.find(t => t.id === 1), subtitle: 'Chat' },
      { ...tools.find(t => t.id === 12), subtitle: 'Work Sites' }
    ],
    stats: {
      totalConversations: 1834,
      qualityScore: 4.7,
      flagRate: 1.8,
      correctionPercentage: 6.2,
      avgResponseTime: 28, // seconds
      escalationRate: 7.9,
      agentVersion: '4.1.2',
      satisfactionRating: 4.6,
      resolutionRate: 92.1,
      firstContactResolution: 85.7,
      uptime: 99.6,
      commonFeedbackThemes: [
        'Excellent at finding the right person',
        'Very knowledgeable about P2 content',
        'Saves time on information searches',
        'Great contextual understanding'
      ],
      performanceTrend: 'excellent',
      lastUpdated: '2024-06-12T09:15:00Z'
    },
    instructions: `
    You are Agent Dave, a helpful Slack chatbot with access to many P2 work sites. Use [tool title="Slack"] to chat with users and [tool title="P2" value="Work Sites"] to search for information, find insights, and locate DRIs (Directly Responsible Individuals) for projects.
    When a user asks a question, search relevant P2s for answers, summaries, or the right person to contact. If you can't find the answer, suggest where the user might look or who to ask next.
    Be concise, resourceful, and friendly. Always cite the P2 or Slack source for your information.
    `,
    conversationIds: [16, 17, 18],
    trigger: 'slack-message',
    previewEvents: [
      { loading: 'Searching P2 sites...', done: 'Found DRI', delay: 1000 },
    ],
  },
]; 