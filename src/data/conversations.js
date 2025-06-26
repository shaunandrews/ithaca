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
            { name: 'Inquiry type', description: 'Help' },
            { name: 'Is legal inquiry', description: 'False' },
            { name: 'Is wpengine inquiry', description: 'False' },
            { name: 'Is ai data sharing question', description: 'False' },
            { name: 'Is very frustrated with wordpress com', description: 'False' },
            { name: 'Language', description: 'En' },
            { name: 'Product', description: 'Wordpress.com' },
            { name: 'Category', description: 'Creating & editing the site (includes design, using Gutenberg/block editor, customizing theme, etc)' }
          ]
        }
      }
    ]
  },
  {
    id: 2,
    agentId: 1,
    messages: [
      { role: 'user', text: 'I worked on some editing for my header and now when I go to the website I can\'t click any of the pages. Nothing happens. I suspect I have something covering it, but I can see anything obvious in the list view.' },
      {
        role: 'agent',
        text: 'I\'m sorry to hear you\'re having trouble with your header navigation. It sounds like there might be an invisible element blocking your menu links.\n\nLet\'s try to fix this by editing your header template part. Go to your dashboard, then Appearance → Editor, open List View (the icon with three horizontal lines), and select your Header template part. Look for any blocks that might be overlapping your navigation menu - sometimes a transparent Group block or Button block could be causing this issue.\n\nWould you like me to provide more specific steps for troubleshooting this header navigation problem?',
        meta: {
          thinkingTime: 9541,
          sources: [
            {
              name: 'Arrange content in your site\'s header',
              description: 'Make your header full width'
            },
            {
              name: 'Edit the header',
              description: 'The header is the top part of a website that typically shows the site title, a logo, and a navigation menu. Our guides will show you how to customize your website\'s header.'
            },
            {
              name: 'Edit the page template',
              description: 'The Page template is used for standard pages on your site, such as an About or Contact page. Pages using this template will have the same overall layout, ensuring a consistent experience for visitors browsing through your site. This guide will show you how to edit the page template.'
            }
          ],
          classifiers: [
            { name: 'Inquiry type', description: 'Help' },
            { name: 'Is legal inquiry', description: 'False' },
            { name: 'Is wpengine inquiry', description: 'False' },
            { name: 'Is ai data sharing question', description: 'False' },
            { name: 'Is very frustrated with wordpress com', description: 'False' },
            { name: 'Language', description: 'En' },
            { name: 'Product', description: 'WordPress.com' },
            { name: 'Category', description: 'Creating & editing the site (includes design, using Gutenberg/block editor, customizing theme, etc)' }
          ]
        }
      },
      {
        role: 'user',
        text: 'I tried that, but it didn\'t work. I still can\'t click any of the pages. There was nothing obvious in the way.'
      },
      {
        role: 'agent',
        text: 'That can be frustrating when the issue isn\'t immediately visible. Let\'s try a different approach to troubleshoot your header.\n\nWhen in the Site Editor looking at your header template part, try selecting different areas by clicking around your header - sometimes this can reveal invisible blocks. Also, check if you have any Group blocks that might have their height set to 100% or any blocks with absolute positioning that could be covering your navigation links.\n\nWould it help if I walked you through how to reset your header to the theme default, which might be a quicker solution if you can\'t identify the problematic element?',
        meta: {
          thinkingTime: 9541,
        }
      },
      {
        role: 'user',
        text: 'is there a way to undo any changes I did like at a given time'
      },
      {
        role: 'agent',
        text: 'Yes, there are a few ways to undo changes you\'ve made to your site!\n\nYou can restore a previous version of your header template part by going to Editor → Templates → Template Parts, selecting your header, and then clicking on "Revisions" in the right sidebar. This will show you previously saved versions that you can load.\n\nAlternatively, since you have a Personal plan, you can restore your entire site to a previous point using Jetpack Backup. Go to your dashboard, then Jetpack → Backup, select a date before you made the problematic changes, and click "Restore to this point."\n\nWould you like more details on either of these options?',
        meta: {
          thinkingTime: 4567,
        }
      },
      {
        role: 'user',
        text: 'it tells me that I need to upgrade to a business plan'
      },
      {
        role: 'agent',
        text: 'I see the confusion now. You\'re right - the full backup and restore feature is only available on Business and Commerce plans, not the Personal plan you currently have. In this case, your best option is to use the template revisions feature. Go to Appearance → Editor → Templates → Template Parts, select your header, then look for "Revisions" in the right sidebar settings panel. This should allow you to restore a previous version of just your header template.\n\nWould you like me to explain how to use the template revisions feature in more detail?',
        meta: {
          thinkingTime: 9541,
        }
      }
    ]
  },
  {
    id: 3,
    agentId: 1,
    messages: [
      { role: 'user', text: 'I was charged twice for my plan this month. I need a refund, and can someone look into why this happened?' },
      {
        role: 'agent',
        text: 'Absolutely. I can see that you have two sites with monthly subscriptions. Did you mean to create a new site? It seems like it may have been accidental.',
        meta: {
          thinkingTime: 4567,
          sources: [
            { name: 'Managing purchases', description: 'You can view, renew, or cancel your subscriptions and update payment methods directly from your WordPress.com account. In this guide, you\'ll learn how to manage all your purchases without contacting support.' },
            { name: 'Turn Automatic Renewal On or Off', description: 'Auto-renew helps ensure your website remains online without needing to track the expiry date. This guide explains how to enable and disable automatic renewal and make a payment for your site\'s purchases.' }
          ],
          classifiers: [
            { name: 'Inquiry type', description: 'Help' },
            { name: 'Is legal inquiry', description: 'False' },
            { name: 'Is wpengine inquiry', description: 'False' },
            { name: 'Is ai data sharing question', description: 'False' },
            { name: 'Is very frustrated with wordpress com', description: 'False' },
            { name: 'Language', description: 'En' },
            { name: 'Product', description: 'Wordpress.com' },
            { name: 'Category', description: 'Creating & editing the site (includes design, using Gutenberg/block editor, customizing theme, etc)' }
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
