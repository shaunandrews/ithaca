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
        event: 'New reply (existing chat)',
        customer: 'koalababy3@gmail.com',
        summary: 'Reviewed support history and provided a fix for a recurring login issue.',
        conversationId: 1,
      },
      {
        id: 2,
        datetime: '2024-06-10T13:45:00Z',
        event: 'First reply',
        customer: 'shaun@shaunandrews.com',
        summary: 'Customer had a question about upgrading their WordPress.com plan. Provided relevant support article and offered further assistance.',
        conversationId: 2,
      },
      {
        id: 3,
        datetime: '2024-06-09T17:30:00Z',
        event: 'Escalation',
        customer: 'cain@automattic.com',
        summary: 'Escalated a billing issue to a human agent after insufficient information was found in the reference tool.',
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
        summary: 'Triaged a user email about password reset. Sent automated response with instructions and flagged for follow-up.',
        conversationId: 4,
      },
      {
        id: 5,
        datetime: '2024-06-09T16:20:00Z',
        event: 'Reference lookup',
        summary: 'Provided a support article link for a user asking about Tumblr blog customization.',
        conversationId: 5,
      },
      {
        id: 6,
        datetime: '2024-06-08T11:05:00Z',
        event: 'Escalation',
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
        summary: 'Identified 2 overdue projects in Linear. Sent Slack reminders to project owners.',
        conversationId: 7,
      },
      {
        id: 8,
        datetime: '2024-06-09T08:30:00Z',
        event: 'Scheduled check',
        summary: 'No overdue projects found during daily check.',
        conversationId: 8,
      },
      {
        id: 9,
        datetime: '2024-06-08T08:30:00Z',
        event: 'Slack notification',
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
    title: 'WP Block Finder',
    description: 'Given some HTML, return a specific block',
    owner: "Team HAL",
    ownerIcon: 'icon-teamhal.png',
    tools: [
      { ...tools.find(t => t.title === 'Input'), subtitle: 'HTML' },
      { ...tools.find(t => t.title === 'Input'), subtitle: 'Requested block' },
    ],
    instructions: `
    Receive an HTML snippet and a requested block name.
    Parse the HTML and search for the block that matches the requested name.
    If found, return the block's HTML. If not found, reply with a helpful error message.
    Be robust to malformed HTML and ambiguous block names.
    `,
    activity: [
      {
        id: 10,
        datetime: '2024-06-10T15:00:00Z',
        event: 'On-demand',
        summary: 'Returned the HTML for a requested "cover" block from a user-provided snippet.',
        conversationId: 10,
      },
      {
        id: 11,
        datetime: '2024-06-09T12:10:00Z',
        event: 'On-demand',
        summary: 'Could not find the requested block. Provided a helpful error message and suggestions.',
        conversationId: 11,
      },
      {
        id: 12,
        datetime: '2024-06-08T10:45:00Z',
        event: 'On-demand',
        summary: 'Parsed malformed HTML and successfully returned the requested block.',
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
        summary: 'Detected a Slack message requesting a meeting. Checked availability for 4 participants.',
        conversationId: 13,
      },
      {
        id: 14,
        datetime: '2024-06-11T10:01:00Z',
        event: 'Calendar lookup',
        summary: 'Found a mutually available slot at 2:00pm. Created a calendar event and sent invites.',
        conversationId: 14,
      },
      {
        id: 15,
        datetime: '2024-06-11T10:02:00Z',
        event: 'Slack notification',
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
        summary: 'Helped a user find the DRI for a new project by searching P2 sites.',
        conversationId: 16,
      },
      {
        id: 17,
        datetime: '2024-06-11T16:30:00Z',
        event: 'Insight search',
        summary: 'Provided a summary of recent discussions about a product launch from multiple P2s.',
        conversationId: 17,
      },
      {
        id: 18,
        datetime: '2024-06-10T14:45:00Z',
        event: 'Resource location',
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