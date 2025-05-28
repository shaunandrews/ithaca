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
  },
]; 