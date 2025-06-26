import { tools } from './tools.js';

export const agents = [
  {
    id: 1,
    title: 'WP.com Support Chat',
    description: 'Answering customer questions in realtime',
    owner: "Team HAL",
    ownerIcon: 'icon-teamhal.png',
    tools: [
      { ...tools.find(t => t.title === 'Chat'), subtitle: 'WordPress.com' },
      { ...tools.find(t => t.title === 'Persona'), subtitle: 'Wappu' },
      { ...tools.find(t => t.title === 'User Profile') },
      { ...tools.find(t => t.title === 'Support History') },
      { ...tools.find(t => t.title === 'Reference'), subtitle: 'support.wordpress.com' }
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
    activity: [
      {
        id: 1,
        datetime: '2024-06-10T14:12:00Z',
        event: 'Troubleshooting login issue',
        customer: 'koalababy3@gmail.com',
        summary: 'Reviewed support history and provided a fix for a recurring login issue. Sent a link to the support article.',
        conversationId: 1,
      },
      {
        id: 2,
        datetime: '2024-06-10T13:45:00Z',
        event: 'Obscured header navigation',
        customer: 'shaun@shaunandrews.com',
        summary: 'Accidentally obscured header navigation while editing their site. Provided initial troubleshooting steps.',
        conversationId: 2,
      },
      {
        id: 3,
        datetime: '2024-06-09T17:30:00Z',
        event: 'Charged twice',
        customer: 'cain@automattic.com',
        summary: 'Customer appears to have accidentally created two sites. Requested confirmation about new site before refunding and cancelling the subscription.',
        conversationId: 3,
      }
    ],
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
    tools: [
      { ...tools.find(t => t.title === 'Zendesk') },
      { ...tools.find(t => t.title === 'Email'), subtitle: 'help@tumblr.com' },
      { ...tools.find(t => t.title === 'Persona'), subtitle: 'TumblrBot' },
      { ...tools.find(t => t.title === 'User Profile') },
      { ...tools.find(t => t.title === 'Support History') },
      { ...tools.find(t => t.title === 'Reference'), subtitle: 'support.tumblr.com' }
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
    activity: [
      {
        id: 4,
        datetime: '2024-06-10T09:00:00Z',
        event: 'New email received',
        customer: 'shaun@shaunandrews.com',
        summary: 'Triaged a user email about password reset. Sent automated response with instructions and flagged for follow-up.',
        conversationId: 4,
      },
      {
        id: 5,
        datetime: '2024-06-09T16:20:00Z',
        event: 'Reference lookup',
        customer: 'tumblruser@example.com',
        summary: 'Provided a support article link for a user asking about Tumblr blog customization.',
        conversationId: 5,
      },
      {
        id: 6,
        datetime: '2024-06-08T11:05:00Z',
        event: 'Escalation',
        customer: 'techsupport@tumblr.com',
        summary: 'Escalated a technical issue to a human agent after automated troubleshooting failed.',
        conversationId: 6,
      }
    ],
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
    tools: [
      { ...tools.find(t => t.title === 'Linear'), subtitle: 'Team Gravatar' },
      { ...tools.find(t => t.title === 'Slack') },
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
    activity: [
      {
        id: 7,
        datetime: '2024-06-10T08:30:00Z',
        event: 'Scheduled check',
        customer: 'shaun.andrews@automattic.com',
        summary: 'Identified 2 overdue projects in Linear. Sent Slack reminders to project owners.',
        conversationId: 7,
      },
      {
        id: 8,
        datetime: '2024-06-09T08:30:00Z',
        event: 'Scheduled check',
        customer: 'jack.smith@automattic.com',
        summary: 'No overdue projects found during daily check.',
        conversationId: 8,
      },
      {
        id: 9,
        datetime: '2024-06-08T08:30:00Z',
        event: 'Slack notification',
        customer: 'katie.genovese@automattic.com',
        summary: 'Sent a reminder to the last updater of an overdue project after no owner was listed.',
        conversationId: 9,
      }
    ],
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
    tools: [
      { ...tools.find(t => t.title === 'Input'), subtitle: 'HTML' },
      { ...tools.find(t => t.title === 'Input'), subtitle: 'Requested block' },
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
    activity: [
      {
        id: 10,
        datetime: '2024-06-10T15:00:00Z',
        event: 'Creating a new site',
        customer: 'developer@wordpress.org',
        summary: 'A new customer wants a site for their coffee shop. They have an Instagram account and want a site that matches the look and feel of their account.',
        conversationId: 10,
      },
      {
        id: 11,
        datetime: '2024-06-09T12:10:00Z',
        event: 'Block customization',
        customer: 'designer@example.com',
        summary: 'Client requested custom styling for their portfolio gallery. Needed to modify the grid layout and add hover effects to match their brand colors.',
        conversationId: 11,
      },
      {
        id: 12,
        datetime: '2024-06-08T10:45:00Z',
        event: 'Layout optimization',
        customer: 'frontend@startup.com',
        summary: 'Startup needed responsive design improvements for their landing page. Optimized mobile layout and fixed spacing issues across different screen sizes.',
        conversationId: 12,
      }
    ],
    trigger: 'on-demand',
    previewEvents: [
      { loading: 'Parsing HTML...', done: 'Block found', delay: 1000 },
    ],
  },
  {
    id: 5,
    title: 'Meeting Scheduler',
    description: 'Schedules meetings for groups based on Slack messages',
    owner: "Team HAL",
    ownerIcon: 'icon-teamhal.png',
    tools: [
      { ...tools.find(t => t.title === 'Slack') },
      { ...tools.find(t => t.title === 'Calendar') }
    ],
    stats: {
      totalConversations: 287,
      qualityScore: 4.1,
      flagRate: 5.8,
      correctionPercentage: 16.3,
      avgResponseTime: 95, // seconds
      escalationRate: 22.3,
      agentVersion: '2.0.4',
      satisfactionRating: 3.9,
      resolutionRate: 74.6,
      firstContactResolution: 68.2,
      uptime: 97.4,
      commonFeedbackThemes: [
        'Good at finding meeting times',
        'Sometimes schedules inconvenient times',
        'Calendar integration works well',
        'Could better handle timezone conflicts'
      ],
      performanceTrend: 'declining',
      lastUpdated: '2024-06-11T10:02:00Z'
    },
    instructions: `
    Find all participants for the meeting. This is usually indicated in the triggering [tool title="Slack"] message. If no one is specified refer to the members of the channel.
    Avoid scheduling meetings with more than 8 participants, and no longer than 45 minutes.
    For each participant, check their [tool title="Calendar"] and find times when everyone is available for a short meeting in the next 48 hours.
    If a suitable time is available, create a [tool title="Calendar"] event at the earliest mutually available time inviting all participants and send a [tool title="Slack"] message with the event details.
    If no suitable time is available, send a [tool title="Slack"] explaining that you can't find a time.
    `,
    activity: [
      {
        id: 13,
        datetime: '2024-06-11T10:00:00Z',
        event: 'Slack trigger',
        customer: 'team.lead@company.com',
        summary: 'Detected a Slack message requesting a meeting. Checked availability for 4 participants.',
        conversationId: 13,
      },
      {
        id: 14,
        datetime: '2024-06-11T10:01:00Z',
        event: 'Calendar lookup',
        customer: 'project.manager@startup.io',
        summary: 'Found a mutually available slot at 2:00pm. Created a calendar event and sent invites.',
        conversationId: 14,
      },
      {
        id: 15,
        datetime: '2024-06-11T10:02:00Z',
        event: 'Slack notification',
        customer: 'product.owner@tech.com',
        summary: 'Sent a Slack message summarizing the scheduled meeting and participants.',
        conversationId: 15,
      }
    ],
    trigger: 'slack-message',
    previewEvents: [
      { loading: 'Checking Slack for meeting requests...', done: 'Meeting scheduled', delay: 1000 },
    ],
  },
  {
    id: 6,
    title: 'Agent Dave',
    description: 'A Slack chatbot for searching, finding insights, and locating DRIs across many P2 sites.',
    owner: '@apeatling',
    ownerIcon: 'avatar-apeatling.png',
    tools: [
      { ...tools.find(t => t.title === 'Slack'), subtitle: 'Chat' },
      { ...tools.find(t => t.title === 'P2'), subtitle: 'Work Sites' }
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
    activity: [
      {
        id: 16,
        datetime: '2024-06-12T09:00:00Z',
        event: 'Slack message',
        customer: 'new.employee@automattic.com',
        summary: 'Helped a user find the DRI for a new project by searching P2 sites.',
        conversationId: 16,
      },
      {
        id: 17,
        datetime: '2024-06-11T16:30:00Z',
        event: 'Insight search',
        customer: 'product.manager@automattic.com',
        summary: 'Provided a summary of recent discussions about a product launch from multiple P2s.',
        conversationId: 17,
      },
      {
        id: 18,
        datetime: '2024-06-10T14:45:00Z',
        event: 'Resource location',
        customer: 'hr.team@automattic.com',
        summary: 'Directed a user to the correct P2 for onboarding documentation.',
        conversationId: 18,
      }
    ],
    trigger: 'slack-message',
    previewEvents: [
      { loading: 'Searching P2 sites...', done: 'Found DRI', delay: 1000 },
    ],
  },
]; 