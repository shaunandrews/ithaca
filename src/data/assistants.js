export const assistants = [
  {
    id: 1,
    title: 'WP.com Support Chat',
    description: 'Answering customer questions in realtime',
    owner: "Team HAL",
    tools: [
      { title: 'Chat', subtitle: 'WordPress.com' },
      { title: 'Persona', subtitle: 'Wappu' },
      { title: 'User Profile' },
      { title: 'Support History' },
      { title: 'Reference', subtitle: 'support.wordpress.com' }
    ],
    instructions: `
        You are a helpful support assistant for WordPress.com. Use [tool title="Persona" value="Wappuu"] for all responses.
        Review the [tool title="User Profile"] and [tool title="Support History"] to learn about the user and their past support interactions. Prioritize recent interactions and use this context in response if needed.
        Review the [tool title="Chat"] to see the user's previous messages and use this context in your response.
        If the user is asking about a specific issue, use the [tool title="Reference" value="support.wordpress.com"] tool to find the most relevant support article.
        If you don't have the information to answer the user's question, say you don't know and escalate to a human agent.
        Be friendly, concise, and professional in all responses.
    `,
    activity: [
      {
        datetime: '2024-06-10T14:12:00Z',
        event: 'New chat message',
        summary: 'Answered a user question about upgrading their WordPress.com plan. Provided relevant support article and offered further assistance.'
      },
      {
        datetime: '2024-06-10T13:45:00Z',
        event: 'Support history review',
        summary: 'Reviewed user support history to provide context for a recurring login issue.'
      },
      {
        datetime: '2024-06-09T17:30:00Z',
        event: 'Escalation',
        summary: 'Escalated a billing issue to a human agent after insufficient information was found in the reference tool.'
      }
    ],
    trigger: 'chat-message',
  },
  {
    id: 2,
    title: 'Tumblr Email Triage',
    description: 'First-line email triage for help@tumblr.com',
    owner: "Team HAL",
    tools: [
      { icon: '/images/icon-zendesk.png', title: 'Zendesk' },
      { title: 'Email', subtitle: 'help@tumblr.com' },
      { title: 'Persona', subtitle: 'TumblrBot' },
      { title: 'User Profile' },
      { title: 'Support History' },
      { title: 'Reference', subtitle: 'support.tumblr.com' }
    ],
    instructions: `
    You are a helpful support assistant for Tumblr.com. Use [tool title="Persona" value="TumblrBot"] for all responses.
    Review the [tool title="Email" value="help@tumblr.com"] to see the user's email and use this context in your response.
    If the user is asking about a specific issue, use the [tool title="Reference" value="support.tumblr.com"] tool to find the most relevant support article.
    If you don't have the information to answer the user's question, say you don't know and escalate to a human agent.
    Be friendly, concise, and professional in all responses.
    `,
    activity: [
      {
        datetime: '2024-06-10T09:00:00Z',
        event: 'New email received',
        summary: 'Triaged a user email about password reset. Sent automated response with instructions and flagged for follow-up.'
      },
      {
        datetime: '2024-06-09T16:20:00Z',
        event: 'Reference lookup',
        summary: 'Provided a support article link for a user asking about Tumblr blog customization.'
      },
      {
        datetime: '2024-06-08T11:05:00Z',
        event: 'Escalation',
        summary: 'Escalated a technical issue to a human agent after automated troubleshooting failed.'
      }
    ],
    trigger: 'email-message',
  },
  {
    id: 3,
    title: 'Gravatar Overdue Projects',
    description: 'Daily Slack reminders for overdue projects',
    owner: "Lighthouse",
    tools: [
      { icon: '/images/icon-linear.png', title: 'Linear' },
      { icon: '/images/icon-slack.png', title: 'Slack' },
    ],
    instructions: `
    Find any overdue projects for the [tool title="Gravatar team" value="Linear"]
    If there hasn't been an update in the last week, determine the owner of the project. If no owner is listed, find the last person to update the project.
    Find the owner in [tool title="Slack"]. If multiple people are found, message the most likely one.
    The Slack message should inform them that the project is overdue, and should include a summary of the project (and its last update) with a link to Linear.
    `,
    activity: [
      {
        datetime: '2024-06-10T08:30:00Z',
        event: 'Scheduled check',
        summary: 'Identified 2 overdue projects in Linear. Sent Slack reminders to project owners.'
      },
      {
        datetime: '2024-06-09T08:30:00Z',
        event: 'Scheduled check',
        summary: 'No overdue projects found during daily check.'
      },
      {
        datetime: '2024-06-08T08:30:00Z',
        event: 'Slack notification',
        summary: 'Sent a reminder to the last updater of an overdue project after no owner was listed.'
      }
    ],
    trigger: 'scheduled',
  },
  {
    id: 4,
    title: 'WP Block Finder',
    description: 'Given some HTML, return a specific block',
    owner: "Team HAL",
    tools: [
      { icon: '/images/icon-input.png', title: 'Input', subtitle: 'HTML' },
      { icon: '/images/icon-input.png', title: 'Input', subtitle: 'Requested block' },
    ],
    instructions: `
    Receive an HTML snippet and a requested block name.
    Parse the HTML and search for the block that matches the requested name.
    If found, return the block's HTML. If not found, reply with a helpful error message.
    Be robust to malformed HTML and ambiguous block names.
    `,
    activity: [
      {
        datetime: '2024-06-10T15:00:00Z',
        event: 'On-demand',
        summary: 'Returned the HTML for a requested "cover" block from a user-provided snippet.'
      },
      {
        datetime: '2024-06-09T12:10:00Z',
        event: 'On-demand',
        summary: 'Could not find the requested block. Provided a helpful error message and suggestions.'
      },
      {
        datetime: '2024-06-08T10:45:00Z',
        event: 'On-demand',
        summary: 'Parsed malformed HTML and successfully returned the requested block.'
      }
    ],
    trigger: 'on-demand',
  },
  {
    id: 5,
    title: 'Meeting Scheduler',
    description: 'Schedules meetings for groups based on Slack messages',
    owner: "Team HAL",
    tools: [
      { icon: '/images/icon-slack.png', title: 'Slack' },
      { title: 'Calendar' }
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
        datetime: '2024-06-11T10:00:00Z',
        event: 'Slack trigger',
        summary: 'Detected a Slack message requesting a meeting. Checked availability for 4 participants.'
      },
      {
        datetime: '2024-06-11T10:01:00Z',
        event: 'Calendar lookup',
        summary: 'Found a mutually available slot at 2:00pm. Created a calendar event and sent invites.'
      },
      {
        datetime: '2024-06-11T10:02:00Z',
        event: 'Slack notification',
        summary: 'Sent a Slack message summarizing the scheduled meeting and participants.'
      }
    ],
    trigger: 'slack-message',
  },
  {
    id: 6,
    title: 'Agent Dave',
    description: 'A Slack chatbot for searching, finding insights, and locating DRIs across many P2 sites.',
    owner: 'Team HAL',
    tools: [
      { icon: '/images/icon-slack.png', title: 'Slack', subtitle: 'Chat' },
      { icon: '/images/icon-input.png', title: 'P2', subtitle: 'Work Sites' }
    ],
    instructions: `
    You are Agent Dave, a helpful Slack chatbot with access to many P2 work sites. Use [tool title="Slack"] to chat with users and [tool title="P2" value="Work Sites"] to search for information, find insights, and locate DRIs (Directly Responsible Individuals) for projects.
    When a user asks a question, search relevant P2s for answers, summaries, or the right person to contact. If you can't find the answer, suggest where the user might look or who to ask next.
    Be concise, resourceful, and friendly. Always cite the P2 or Slack source for your information.
    `,
    activity: [
      {
        datetime: '2024-06-12T09:00:00Z',
        event: 'Slack message',
        summary: 'Helped a user find the DRI for a new project by searching P2 sites.'
      },
      {
        datetime: '2024-06-11T16:30:00Z',
        event: 'Insight search',
        summary: 'Provided a summary of recent discussions about a product launch from multiple P2s.'
      },
      {
        datetime: '2024-06-10T14:45:00Z',
        event: 'Resource location',
        summary: 'Directed a user to the correct P2 for onboarding documentation.'
      }
    ],
    trigger: 'slack-message',
  },
]; 