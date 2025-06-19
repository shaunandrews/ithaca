export const conversations = [
  {
    id: 1,
    agentId: 1,
    messages: [
      { role: 'user', text: "I'm still having trouble logging in." },
      { role: 'agent', text: 'I checked your support history and it looks like clearing your cookies often helps. Can you try that and reset your password again?' }
    ]
  },
  {
    id: 2,
    agentId: 1,
    messages: [
      { role: 'user', text: 'How do I upgrade my plan?' },
      { role: 'agent', text: 'Sure! You can upgrade your plan from your billing settings. Here is a link with more details: https://wordpress.com/support/plans/' }
    ]
  },
  {
    id: 3,
    agentId: 1,
    messages: [
      { role: 'user', text: 'I have a billing issue that I need help with.' },
      { role: 'agent', text: 'I am not able to resolve this. I will escalate this to a human agent for further assistance.' }
    ]
  },
  {
    id: 4,
    agentId: 2,
    messages: [
      { role: 'user', text: 'Please help me reset my Tumblr password.' },
      { role: 'agent', text: 'No problem! I have sent you an email with password reset instructions.' }
    ]
  },
  {
    id: 5,
    agentId: 2,
    messages: [
      { role: 'user', text: 'How do I customize my blog theme?' },
      { role: 'agent', text: 'Here is a guide that should help: https://help.tumblr.com/hc/en-us/articles/360041542954-Customizing-your-blog' }
    ]
  },
  {
    id: 6,
    agentId: 2,
    messages: [
      { role: 'user', text: 'Something went wrong with my account.' },
      { role: 'agent', text: 'This looks complicated. I am escalating to a human agent.' }
    ]
  },
  {
    id: 7,
    agentId: 3,
    messages: [
      { role: 'system', text: 'Daily check detected overdue projects.' },
      { role: 'agent', text: 'Sent reminders in Slack to project owners.' }
    ]
  },
  {
    id: 8,
    agentId: 3,
    messages: [
      { role: 'system', text: 'Daily check completed.' },
      { role: 'agent', text: 'No overdue projects found.' }
    ]
  },
  {
    id: 9,
    agentId: 3,
    messages: [
      { role: 'agent', text: 'Sent reminder to last updater because no owner was set.' }
    ]
  },
  {
    id: 10,
    agentId: 4,
    messages: [
      { role: 'user', text: 'Can you find the cover block in this HTML snippet?' },
      { role: 'agent', text: '<div class="wp-block-cover">...</div>' }
    ]
  },
  {
    id: 11,
    agentId: 4,
    messages: [
      { role: 'user', text: 'Find the gallery block.' },
      { role: 'agent', text: 'I could not find a gallery block. Did you mean a different block?' }
    ]
  },
  {
    id: 12,
    agentId: 4,
    messages: [
      { role: 'user', text: 'Here is some messy HTML, find the heading.' },
      { role: 'agent', text: '<h2>Example Heading</h2>' }
    ]
  },
  {
    id: 13,
    agentId: 5,
    messages: [
      { role: 'user', text: 'Can we schedule a meeting with everyone tomorrow?' },
      { role: 'agent', text: 'I found a time at 2:00pm that works for everyone. Sending invites now.' }
    ]
  },
  {
    id: 14,
    agentId: 5,
    messages: [
      { role: 'system', text: 'Checked calendars.' },
      { role: 'agent', text: 'Created event and invited participants.' }
    ]
  },
  {
    id: 15,
    agentId: 5,
    messages: [
      { role: 'agent', text: 'Sent Slack message with meeting details.' }
    ]
  },
  {
    id: 16,
    agentId: 6,
    messages: [
      { role: 'user', text: 'Who is the DRI for the new project?' },
      { role: 'agent', text: 'The DRI is Jane Doe. Here is a P2 link with more info.' }
    ]
  },
  {
    id: 17,
    agentId: 6,
    messages: [
      { role: 'user', text: 'What are people saying about the product launch?' },
      { role: 'agent', text: 'Here is a summary of the latest discussions on P2.' }
    ]
  },
  {
    id: 18,
    agentId: 6,
    messages: [
      { role: 'user', text: 'Where can I find onboarding docs?' },
      { role: 'agent', text: 'Check out this P2 post with the onboarding steps.' }
    ]
  }
];
