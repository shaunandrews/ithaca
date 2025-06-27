export const conversations = [
  {
    id: 1,
    agentId: 1,
    datetime: '2024-06-10T14:12:00Z',
    event: 'Troubleshooting login issue',
    customer: 'koalababy3@gmail.com',
    summary: 'Reviewed support history and provided a fix for a recurring login issue. Sent a link to the support article.',
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
    datetime: '2024-06-10T13:45:00Z',
    event: 'Obscured header navigation',
    customer: 'shaun@shaunandrews.com',
    summary: 'Accidentally obscured header navigation while editing their site. Provided initial troubleshooting steps.',
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
    datetime: '2024-06-09T17:30:00Z',
    event: 'Charged twice',
    customer: 'cain@automattic.com',
    summary: 'Customer appears to have accidentally created two sites. Requested confirmation about new site before refunding and cancelling the subscription.',
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
    datetime: '2024-06-10T09:00:00Z',
    event: 'New email received',
    customer: 'shaun@shaunandrews.com',
    summary: 'Triaged a user email about password reset. Sent automated response with instructions and flagged for follow-up.',
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
    datetime: '2024-06-09T16:20:00Z',
    event: 'Reference lookup',
    customer: 'tumblruser@example.com',
    summary: 'Provided a support article link for a user asking about Tumblr blog customization.',
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
    datetime: '2024-06-08T11:05:00Z',
    event: 'Escalation',
    customer: 'techsupport@tumblr.com',
    summary: 'Escalated a technical issue to a human agent after automated troubleshooting failed.',
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
    datetime: '2024-06-10T08:30:00Z',
    event: 'Scheduled check',
    customer: 'shaun.andrews@automattic.com',
    summary: 'Identified 2 overdue projects in Linear. Sent Slack reminders to project owners.',
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
    datetime: '2024-06-09T08:30:00Z',
    event: 'Scheduled check',
    customer: 'jack.smith@automattic.com',
    summary: 'No overdue projects found during daily check.',
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
    datetime: '2024-06-08T08:30:00Z',
    event: 'Slack notification',
    customer: 'katie.genovese@automattic.com',
    summary: 'Sent a reminder to the last updater of an overdue project after no owner was listed.',
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
    datetime: '2024-06-10T15:00:00Z',
    event: 'Creating a new site',
    customer: 'developer@wordpress.org',
    summary: 'A new customer wants a site for their coffee shop. They have an Instagram account and want a site that matches the look and feel of their account.',
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
    datetime: '2024-06-09T12:10:00Z',
    event: 'Block customization',
    customer: 'designer@example.com',
    summary: 'Client requested custom styling for their portfolio gallery. Needed to modify the grid layout and add hover effects to match their brand colors.',
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
    datetime: '2024-06-08T10:45:00Z',
    event: 'Layout optimization',
    customer: 'frontend@startup.com',
    summary: 'Startup needed responsive design improvements for their landing page. Optimized mobile layout and fixed spacing issues across different screen sizes.',
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
    id: 16,
    agentId: 6,
    datetime: '2024-06-12T09:00:00Z',
    event: 'Slack message',
    customer: 'new.employee@automattic.com',
    summary: 'Helped a user find the DRI for a new project by searching P2 sites.',
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
    datetime: '2024-06-11T16:30:00Z',
    event: 'Insight search',
    customer: 'product.manager@automattic.com',
    summary: 'Provided a summary of recent discussions about a product launch from multiple P2s.',
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
    datetime: '2024-06-10T14:45:00Z',
    event: 'Resource location',
    customer: 'hr.team@automattic.com',
    summary: 'Directed a user to the correct P2 for onboarding documentation.',
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
