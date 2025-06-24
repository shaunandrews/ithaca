export const conversations = [
  {
    id: 1,
    agentId: 1,
    messages: [
      { role: 'user', text: "I'm still having trouble logging in." },
      {
        role: 'agent',
        text: 'I checked your support history and it looks like clearing your cookies often helps. Can you try that and reset your password again?',
        meta: {
          thinkingTime: 1234,
          sources: [
            { name: 'Login Support', description: 'Common login issues' },
            { name: 'Password Reset', description: 'How to reset your password' }
          ],
          classifiers: [
            { name: 'Login Issue', description: 'Category' },
            { name: 'Technical Support', description: 'Type' }
          ]
        }
      }
    ]
  },
  {
    id: 2,
    agentId: 1,
    messages: [
      { role: 'user', text: 'How do I upgrade my plan?' },
      {
        role: 'agent',
        text: 'Sure! You can upgrade your plan from your billing settings. Here is a link with more details: https://wordpress.com/support/plans/',
        meta: {
          thinkingTime: 9541,
          sources: [
            {
              name: 'Choose a Host',
              description: 'I Don\'t Know Which Host to Choose'
            },
            {
              name: 'Change a Domain\'s Name Servers',
              description: 'Change Name Servers Away from WordPress.com'
            },
            {
              name: 'Troubleshooting Domain Errors',
              description: 'Where is my Domain Registered?'
            },
            {
              name: 'Choose Your Site\'s Primary Data Center',
              description: 'Frequently Asked Questions'
            },
            { name: 'cPanel', description: 'WordPress.com Hosting Features' },
            { name: 'Why Is My Site Down?', description: 'Check With Your Host' },
            { name: 'Server Settings', description: 'Access Your Server Settings' }
          ],
          classifiers: [
            { name: 'Refund', description: 'Type' },
            { name: 'False', description: 'Legal Inquiry' },
            { name: 'English (en)', description: 'Language' },
            { name: 'Unknown', description: 'Product', editable: true },
            { name: 'Plan cancelation / Refund request', description: 'Category' }
          ]
        }
      }
    ]
  },
  {
    id: 3,
    agentId: 1,
    messages: [
      { role: 'user', text: 'I have a billing issue that I need help with.' },
      {
        role: 'agent',
        text: 'I am not able to resolve this. I will escalate this to a human agent for further assistance.',
        meta: {
          thinkingTime: 4567,
          sources: [
            { name: 'Billing', description: 'Billing FAQs' },
            { name: 'Escalation', description: 'When to escalate to a human' }
          ],
          classifiers: [
            { name: 'Billing', description: 'Category', editable: true },
            { name: 'Escalate', description: 'Action' }
          ]
        }
      }
    ]
  },
  {
    id: 4,
    agentId: 2,
    messages: [
      { role: 'user', text: 'Please help me reset my Tumblr password.' },
      {
        role: 'agent',
        text: 'No problem! I have sent you an email with password reset instructions.',
        meta: {
          thinkingTime: 2345,
          sources: [
            { name: 'Tumblr Password Reset', description: 'Password reset instructions' }
          ],
          classifiers: [
            { name: 'Password Reset', description: 'Category' },
            { name: 'Tumblr', description: 'Product' }
          ]
        }
      }
    ]
  },
  {
    id: 5,
    agentId: 2,
    messages: [
      { role: 'user', text: 'How do I customize my blog theme?' },
      {
        role: 'agent',
        text: 'Here is a guide that should help: https://help.tumblr.com/hc/en-us/articles/360041542954-Customizing-your-blog',
        meta: {
          thinkingTime: 3456,
          sources: [
            { name: 'Tumblr Theme Customization', description: 'A guide to customizing your theme' }
          ],
          classifiers: [
            { name: 'Customization', description: 'Category' },
            { name: 'Tumblr', description: 'Product' }
          ]
        }
      }
    ]
  },
  {
    id: 6,
    agentId: 2,
    messages: [
      { role: 'user', text: 'Something went wrong with my account.' },
      {
        role: 'agent',
        text: 'This looks complicated. I am escalating to a human agent.',
        meta: {
          thinkingTime: 5678,
          sources: [
            { name: 'Account Support', description: 'Common account issues' },
            { name: 'Escalation', description: 'When to escalate to a human' }
          ],
          classifiers: [
            { name: 'Account Issue', description: 'Category' },
            { name: 'Escalate', description: 'Action' }
          ]
        }
      }
    ]
  },
  {
    id: 7,
    agentId: 3,
    messages: [
      { role: 'system', text: 'Daily check detected overdue projects.' },
      {
        role: 'agent',
        text: 'Sent reminders in Slack to project owners.',
        meta: {
          thinkingTime: 1111,
          sources: [
            { name: 'Project Management Tool', description: 'List of overdue projects' }
          ],
          classifiers: [
            { name: 'Automation', description: 'Type' },
            { name: 'Project Management', description: 'Category' }
          ]
        }
      }
    ]
  },
  {
    id: 8,
    agentId: 3,
    messages: [
      { role: 'system', text: 'Daily check completed.' },
      {
        role: 'agent',
        text: 'No overdue projects found.',
        meta: {
          thinkingTime: 2222,
          sources: [
            { name: 'Project Management Tool', description: 'List of all projects' }
          ],
          classifiers: [
            { name: 'Automation', description: 'Type' },
            { name: 'Project Management', description: 'Category' }
          ]
        }
      }
    ]
  },
  {
    id: 9,
    agentId: 3,
    messages: [
      {
        role: 'agent',
        text: 'Sent reminder to last updater because no owner was set.',
        meta: {
          thinkingTime: 3333,
          sources: [
            { name: 'Project Management Tool', description: 'Project details' }
          ],
          classifiers: [
            { name: 'Automation', description: 'Type' },
            { name: 'Project Management', description: 'Category' }
          ]
        }
      }
    ]
  },
  {
    id: 10,
    agentId: 4,
    messages: [
      { role: 'user', text: 'Can you find the cover block in this HTML snippet?' },
      {
        role: 'agent',
        text: '<div class="wp-block-cover">...</div>',
        meta: {
          thinkingTime: 4444,
          sources: [
            { name: 'HTML Parser', description: 'Tool to parse HTML' }
          ],
          classifiers: [
            { name: 'Code Analysis', description: 'Category' },
            { name: 'WordPress', description: 'Product' }
          ]
        }
      }
    ]
  },
  {
    id: 11,
    agentId: 4,
    messages: [
      { role: 'user', text: 'Find the gallery block.' },
      {
        role: 'agent',
        text: 'I could not find a gallery block. Did you mean a different block?',
        meta: {
          thinkingTime: 5555,
          sources: [
            { name: 'HTML Parser', description: 'Tool to parse HTML' }
          ],
          classifiers: [
            { name: 'Code Analysis', description: 'Category' },
            { name: 'Negative', description: 'Result' }
          ]
        }
      }
    ]
  },
  {
    id: 12,
    agentId: 4,
    messages: [
      { role: 'user', text: 'Here is some messy HTML, find the heading.' },
      {
        role: 'agent',
        text: '<h2>Example Heading</h2>',
        meta: {
          thinkingTime: 6666,
          sources: [
            { name: 'HTML Parser', description: 'Tool to parse HTML' }
          ],
          classifiers: [
            { name: 'Code Analysis', description: 'Category' },
            { name: 'WordPress', description: 'Product' }
          ]
        }
      }
    ]
  },
  {
    id: 13,
    agentId: 5,
    messages: [
      { role: 'user', text: 'Can we schedule a meeting with everyone tomorrow?' },
      {
        role: 'agent',
        text: 'I found a time at 2:00pm that works for everyone. Sending invites now.',
        meta: {
          thinkingTime: 7777,
          sources: [
            { name: 'Calendar API', description: 'Access to calendars' }
          ],
          classifiers: [
            { name: 'Scheduling', description: 'Category' },
            { name: 'Success', description: 'Result' }
          ]
        }
      }
    ]
  },
  {
    id: 14,
    agentId: 5,
    messages: [
      { role: 'system', text: 'Checked calendars.' },
      {
        role: 'agent',
        text: 'Created event and invited participants.',
        meta: {
          thinkingTime: 8888,
          sources: [
            { name: 'Calendar API', description: 'Access to calendars' }
          ],
          classifiers: [
            { name: 'Scheduling', description: 'Category' },
            { name: 'Automation', description: 'Type' }
          ]
        }
      }
    ]
  },
  {
    id: 15,
    agentId: 5,
    messages: [
      {
        role: 'agent',
        text: 'Sent Slack message with meeting details.',
        meta: {
          thinkingTime: 9999,
          sources: [
            { name: 'Slack API', description: 'Access to send messages' }
          ],
          classifiers: [
            { name: 'Communication', description: 'Category' },
            { name: 'Automation', description: 'Type' }
          ]
        }
      }
    ]
  },
  {
    id: 16,
    agentId: 6,
    messages: [
      { role: 'user', text: 'Who is the DRI for the new project?' },
      {
        role: 'agent',
        text: 'The DRI is Jane Doe. Here is a P2 link with more info.',
        meta: {
          thinkingTime: 1010,
          sources: [
            { name: 'P2', description: 'Project documentation' }
          ],
          classifiers: [
            { name: 'Project Management', description: 'Category' },
            { name: 'Information Retrieval', description: 'Type' }
          ]
        }
      }
    ]
  },
  {
    id: 17,
    agentId: 6,
    messages: [
      { role: 'user', text: 'What are people saying about the product launch?' },
      {
        role: 'agent',
        text: 'Here is a summary of the latest discussions on P2.',
        meta: {
          thinkingTime: 2020,
          sources: [
            { name: 'P2', description: 'Product launch discussions' }
          ],
          classifiers: [
            { name: 'Summarization', description: 'Category' },
            { name: 'Information Retrieval', description: 'Type' }
          ]
        }
      }
    ]
  },
  {
    id: 18,
    agentId: 6,
    messages: [
      { role: 'user', text: 'Where can I find onboarding docs?' },
      {
        role: 'agent',
        text: 'Check out this P2 post with the onboarding steps.',
        meta: {
          thinkingTime: 3030,
          sources: [
            { name: 'P2', description: 'Onboarding documentation' }
          ],
          classifiers: [
            { name: 'Onboarding', description: 'Category' },
            { name: 'Information Retrieval', description: 'Type' }
          ]
        }
      }
    ]
  }
];
