export const conversations = [
  {
    id: 1,
    assistantId: 1,
    messages: [
      { role: 'user', text: "I'm still having trouble logging in." },
      { role: 'assistant', text: 'I checked your support history and it looks like clearing your cookies often helps. Can you try that and reset your password again?' }
    ]
  },
  {
    id: 2,
    assistantId: 1,
    messages: [
      { role: 'user', text: 'How do I upgrade my plan?' },
      { role: 'assistant', text: 'Sure! You can upgrade your plan from your billing settings. Here is a link with more details: https://wordpress.com/support/plans/' }
    ]
  },
  {
    id: 3,
    assistantId: 1,
    messages: [
      { role: 'user', text: 'I have a billing issue that I need help with.' },
      { role: 'assistant', text: 'I am not able to resolve this. I will escalate this to a human agent for further assistance.' }
    ]
  },
  {
    id: 4,
    assistantId: 2,
    messages: [
      { role: 'user', text: 'Please help me reset my Tumblr password.' },
      { role: 'assistant', text: 'No problem! I have sent you an email with password reset instructions.' }
    ]
  },
  {
    id: 5,
    assistantId: 2,
    messages: [
      { role: 'user', text: 'How do I customize my blog theme?' },
      { role: 'assistant', text: 'Here is a guide that should help: https://help.tumblr.com/hc/en-us/articles/360041542954-Customizing-your-blog' }
    ]
  },
  {
    id: 6,
    assistantId: 2,
    messages: [
      { role: 'user', text: 'Something went wrong with my account.' },
      { role: 'assistant', text: 'This looks complicated. I am escalating to a human agent.' }
    ]
  },
  {
    id: 7,
    assistantId: 3,
    messages: [
      { role: 'system', text: 'Daily check detected overdue projects.' },
      { role: 'assistant', text: 'Sent reminders in Slack to project owners.' }
    ]
  },
  {
    id: 8,
    assistantId: 3,
    messages: [
      { role: 'system', text: 'Daily check completed.' },
      { role: 'assistant', text: 'No overdue projects found.' }
    ]
  },
  {
    id: 9,
    assistantId: 3,
    messages: [
      { role: 'assistant', text: 'Sent reminder to last updater because no owner was set.' }
    ]
  },
  {
    id: 10,
    assistantId: 4,
    messages: [
      { role: 'user', text: 'Can you find the cover block in this HTML snippet?' },
      { role: 'assistant', text: '<div class="wp-block-cover">...</div>' }
    ]
  },
  {
    id: 11,
    assistantId: 4,
    messages: [
      { role: 'user', text: 'Find the gallery block.' },
      { role: 'assistant', text: 'I could not find a gallery block. Did you mean a different block?' }
    ]
  },
  {
    id: 12,
    assistantId: 4,
    messages: [
      { role: 'user', text: 'Here is some messy HTML, find the heading.' },
      { role: 'assistant', text: '<h2>Example Heading</h2>' }
    ]
  },
  {
    id: 13,
    assistantId: 5,
    messages: [
      { role: 'user', text: 'Can we schedule a meeting with everyone tomorrow?' },
      { role: 'assistant', text: 'I found a time at 2:00pm that works for everyone. Sending invites now.' }
    ]
  },
  {
    id: 14,
    assistantId: 5,
    messages: [
      { role: 'system', text: 'Checked calendars.' },
      { role: 'assistant', text: 'Created event and invited participants.' }
    ]
  },
  {
    id: 15,
    assistantId: 5,
    messages: [
      { role: 'assistant', text: 'Sent Slack message with meeting details.' }
    ]
  },
  {
    id: 16,
    assistantId: 6,
    messages: [
      { role: 'user', text: 'Who is the DRI for the new project?' },
      { role: 'assistant', text: 'The DRI is Jane Doe. Here is a P2 link with more info.' }
    ]
  },
  {
    id: 17,
    assistantId: 6,
    messages: [
      { role: 'user', text: 'What are people saying about the product launch?' },
      { role: 'assistant', text: 'Here is a summary of the latest discussions on P2.' }
    ]
  },
  {
    id: 18,
    assistantId: 6,
    messages: [
      { role: 'user', text: 'Where can I find onboarding docs?' },
      { role: 'assistant', text: 'Check out this P2 post with the onboarding steps.' }
    ]
  }
];
