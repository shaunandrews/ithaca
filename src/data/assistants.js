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
  },
]; 