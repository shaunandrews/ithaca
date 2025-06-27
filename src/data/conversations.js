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
    event: 'Header Navigation Not Clickable After Edit',
    customer: 'shaun@shaunandrews.com',
    summary: 'Customer edited their site header and navigation links became unclickable. Troubleshooting steps like checking for overlapping or invisible blocks did not help. The customer asked about undoing changes but learned that full site restores require a Business plan. The agent explained that header template revisions are available and offered further instructions if needed.',
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
  },
  {
    id: 19,
    agentId: 1,
    datetime: '2024-06-11T10:30:00Z',
    event: 'Domain connection issues',
    customer: 'webmaster@example.com',
    summary: 'Customer having trouble connecting their custom domain to WordPress.com. Walked through DNS settings and provided nameserver configuration steps.',
    messages: [
      { role: 'user', text: 'I bought a domain from GoDaddy but it\'s not working with my WordPress.com site. Can you help me connect it?' },
      {
        role: 'agent',
        text: 'I\'d be happy to help you connect your custom domain! There are two main ways to do this: you can either point your domain to WordPress.com using nameservers, or update your DNS records.\n\nFor the easiest setup, I recommend using nameservers. In your GoDaddy account, go to your domain settings and change the nameservers to:\nns1.wordpress.com\nns2.wordpress.com\nns3.wordpress.com\n\nAfter that, come back to your WordPress.com dashboard and add your domain under Settings → Domains. The changes can take up to 24 hours to take effect.\n\nWould you like me to walk you through the step-by-step process?',
        meta: {
          thinkingTime: 3456,
          sources: [
            { name: 'Connect an existing domain', description: 'How to connect a domain you already own to your WordPress.com site' },
            { name: 'DNS and nameservers', description: 'Understanding DNS settings and nameserver configuration' }
          ],
          classifiers: [
            { name: 'Inquiry type', description: 'Help' },
            { name: 'Is legal inquiry', description: 'False' },
            { name: 'Is wpengine inquiry', description: 'False' },
            { name: 'Is ai data sharing question', description: 'False' },
            { name: 'Is very frustrated with wordpress com', description: 'False' },
            { name: 'Language', description: 'En' },
            { name: 'Product', description: 'WordPress.com' },
            { name: 'Category', description: 'Domains' }
          ]
        }
      }
    ]
  },
  {
    id: 20,
    agentId: 1,
    datetime: '2024-06-11T14:15:00Z',
    event: 'Comment moderation help',
    customer: 'blogger@lifestyle.com',
    summary: 'Customer needed help setting up comment moderation and dealing with spam comments. Explained moderation settings and recommended Akismet.',
    messages: [
      { role: 'user', text: 'I keep getting spam comments on my blog. How can I stop them or at least moderate them before they appear?' },
      {
        role: 'agent',
        text: 'Great question! WordPress.com has several built-in tools to help manage comments and reduce spam.\n\nFirst, go to Settings → Discussion in your dashboard. Here you can:\n• Require comments to be approved before appearing\n• Require users to fill out name and email\n• Hold comments with multiple links for moderation\n• Automatically close comments on posts older than a certain number of days\n\nFor spam protection, Akismet comes free with all WordPress.com sites and automatically filters spam comments. Make sure it\'s activated under Plugins → Installed Plugins.\n\nYou can also manage comments by going to Comments in your dashboard sidebar, where you can approve, spam, or delete comments in bulk.\n\nWould you like me to explain any of these settings in more detail?',
        meta: {
          thinkingTime: 4567,
          sources: [
            { name: 'Comment settings', description: 'How to configure comment moderation and spam protection' },
            { name: 'Managing comments', description: 'Tools for moderating and managing blog comments' }
          ],
          classifiers: [
            { name: 'Inquiry type', description: 'Help' },
            { name: 'Is legal inquiry', description: 'False' },
            { name: 'Is wpengine inquiry', description: 'False' },
            { name: 'Is ai data sharing question', description: 'False' },
            { name: 'Is very frustrated with wordpress com', description: 'False' },
            { name: 'Language', description: 'En' },
            { name: 'Product', description: 'WordPress.com' },
            { name: 'Category', description: 'Comments and community' }
          ]
        }
      }
    ]
  },
  {
    id: 21,
    agentId: 1,
    datetime: '2024-06-10T16:45:00Z',
    event: 'Publishing problems',
    customer: 'author@writingblog.com',
    summary: 'Customer unable to publish posts, getting error messages. Identified browser cache issue and provided troubleshooting steps.',
    messages: [
      { role: 'user', text: 'I can\'t publish my blog post. When I click "Publish" nothing happens, and sometimes I get an error message that says something went wrong.' },
      {
        role: 'agent',
        text: 'I\'m sorry you\'re having trouble publishing your post! This is usually caused by a browser issue or connectivity problem. Let\'s try these troubleshooting steps:\n\n1. **Clear your browser cache and cookies** for WordPress.com\n2. **Try a different browser** or incognito/private mode\n3. **Disable browser extensions** temporarily\n4. **Check your internet connection** - try refreshing the page\n\nIf you\'re still having issues, try saving your post as a draft first, then publishing it. You can also try the "Schedule" option to publish it immediately.\n\nAre you seeing any specific error messages I can help troubleshoot?',
        meta: {
          thinkingTime: 2345,
          sources: [
            { name: 'Publishing posts', description: 'How to publish and schedule blog posts' },
            { name: 'Troubleshooting editor issues', description: 'Common editor problems and solutions' }
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
      }
    ]
  },
  {
    id: 22,
    agentId: 1,
    datetime: '2024-06-09T13:20:00Z',
    event: 'Theme customization',
    customer: 'creative@artportfolio.com',
    summary: 'Customer wanted to customize their theme colors and fonts. Explained the difference between theme customization and site editing, provided guidance on both.',
    messages: [
      { role: 'user', text: 'How can I change the colors and fonts on my website? I want to make it more personal but I don\'t know where to start.' },
      {
        role: 'agent',
        text: 'Great question! You have several options for customizing your site\'s appearance, depending on your theme and plan.\n\n**For most themes:**\nGo to Appearance → Customize in your dashboard. Here you\'ll find options for:\n• Colors (background, text, accent colors)\n• Fonts and typography\n• Header and footer settings\n• Layout options\n\n**For block themes (newer themes):**\nUse Appearance → Editor → Global Styles to access:\n• Color palette customization\n• Typography settings\n• Spacing and layout controls\n\n**For more advanced customization:**\nWith a Premium plan or higher, you can add custom CSS under Appearance → Customize → Additional CSS.\n\nWhat specific changes are you looking to make? I can provide more targeted guidance based on your theme and goals!',
        meta: {
          thinkingTime: 5678,
          sources: [
            { name: 'Customizing your site', description: 'How to customize colors, fonts, and layout' },
            { name: 'Using the Site Editor', description: 'Block theme customization with Global Styles' }
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
      }
    ]
  },
  {
    id: 23,
    agentId: 1,
    datetime: '2024-06-08T11:30:00Z',
    event: 'SEO and site visibility',
    customer: 'business@localbakery.com',
    summary: 'Small business owner asking about SEO and why their site isn\'t showing up in Google searches. Provided SEO basics and site visibility settings.',
    messages: [
      { role: 'user', text: 'My bakery website has been live for 2 months but I can\'t find it on Google. What am I doing wrong?' },
      {
        role: 'agent',
        text: 'Getting found on Google takes time and some optimization! Let me help you check a few important settings:\n\n**First, check your site visibility:**\nGo to Settings → General and make sure "Discourage search engines from indexing this site" is **unchecked**.\n\n**For better SEO:**\n• Add a site description under Settings → General\n• Use the built-in SEO features (available with all plans)\n• Write descriptive page titles and meta descriptions\n• Add alt text to your images\n• Create quality content regularly\n• Submit your sitemap to Google Search Console\n\n**Your sitemap URL is:** yourdomain.com/sitemap.xml\n\nGoogle typically takes 2-8 weeks to fully index new sites. With a Premium plan or higher, you get advanced SEO tools and can connect Google Analytics to track your progress.\n\nWould you like me to walk you through setting up Google Search Console?',
        meta: {
          thinkingTime: 6789,
          sources: [
            { name: 'SEO on WordPress.com', description: 'Search engine optimization basics and tools' },
            { name: 'Site visibility settings', description: 'How to control search engine indexing' }
          ],
          classifiers: [
            { name: 'Inquiry type', description: 'Help' },
            { name: 'Is legal inquiry', description: 'False' },
            { name: 'Is wpengine inquiry', description: 'False' },
            { name: 'Is ai data sharing question', description: 'False' },
            { name: 'Is very frustrated with wordpress com', description: 'False' },
            { name: 'Language', description: 'En' },
            { name: 'Product', description: 'WordPress.com' },
            { name: 'Category', description: 'SEO and site promotion' }
          ]
        }
      }
    ]
  },
  {
    id: 24,
    agentId: 1,
    datetime: '2024-06-07T15:00:00Z',
    event: 'Mobile responsiveness',
    customer: 'photographer@portraits.com',
    summary: 'Customer concerned about how their photography site looks on mobile devices. Explained responsive design and provided mobile optimization tips.',
    messages: [
      { role: 'user', text: 'My photography website looks great on desktop but terrible on mobile phones. How can I fix this?' },
      {
        role: 'agent',
        text: 'Most WordPress.com themes are responsive, meaning they automatically adjust to different screen sizes, but there are ways to optimize the mobile experience!\n\n**To check and improve mobile display:**\n\n1. **Use the mobile preview** in the editor - look for the mobile icon in the top toolbar\n2. **Optimize images** - large photos can slow loading and look stretched on mobile\n3. **Check your layout** - some complex layouts may need adjustment for mobile\n4. **Test navigation** - make sure your menu works well on touch devices\n\n**For photography sites specifically:**\n• Use gallery blocks instead of individual images when possible\n• Consider a mobile-first theme designed for photography\n• Ensure images are properly sized (WordPress.com automatically creates mobile versions)\n\n**Advanced options:**\nWith a Premium plan, you can add custom CSS to fine-tune the mobile experience.\n\nCan you tell me which theme you\'re using? I can provide more specific guidance based on your setup!',
        meta: {
          thinkingTime: 4321,
          sources: [
            { name: 'Mobile-responsive themes', description: 'How themes adapt to different screen sizes' },
            { name: 'Optimizing for mobile', description: 'Tips for improving mobile site performance' }
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
      }
    ]
  },
  {
    id: 25,
    agentId: 1,
    datetime: '2024-06-06T12:45:00Z',
    event: 'Plugin installation inquiry',
    customer: 'ecommerce@smallshop.com',
    summary: 'Customer wanted to install specific plugins for their online store. Explained plugin limitations on different plans and suggested alternatives.',
    messages: [
      { role: 'user', text: 'I want to add a contact form plugin and a booking system to my site. How do I install plugins?' },
      {
        role: 'agent',
        text: 'I\'d love to help with your plugin needs! Plugin installation depends on your WordPress.com plan:\n\n**For contact forms:**\nGood news! You don\'t need a plugin - WordPress.com includes a built-in Contact Form block that works on all plans. Just add the "Form" block to any page or post.\n\n**For booking systems:**\nThis typically requires third-party plugins, which are only available with the Business plan ($25/month) or higher.\n\n**Your current options:**\n• **Free/Personal/Premium plans**: Use built-in blocks and widgets, plus approved plugins from our marketplace\n• **Business plan and higher**: Install any plugin from the WordPress.org repository\n\n**Alternatives for booking without plugins:**\n• Embed booking widgets from services like Calendly or Acuity\n• Use the HTML block to add booking code from external services\n• Link to external booking pages\n\nWould you like me to show you how to set up the contact form, or would you prefer information about upgrading to access more plugins?',
        meta: {
          thinkingTime: 5432,
          sources: [
            { name: 'Installing plugins', description: 'Plugin installation requirements and limitations by plan' },
            { name: 'Contact forms', description: 'How to create contact forms without plugins' }
          ],
          classifiers: [
            { name: 'Inquiry type', description: 'Help' },
            { name: 'Is legal inquiry', description: 'False' },
            { name: 'Is wpengine inquiry', description: 'False' },
            { name: 'Is ai data sharing question', description: 'False' },
            { name: 'Is very frustrated with wordpress com', description: 'False' },
            { name: 'Language', description: 'En' },
            { name: 'Product', description: 'WordPress.com' },
            { name: 'Category', description: 'Plugins and integrations' }
          ]
        }
      }
    ]
  },
  {
    id: 26,
    agentId: 1,
    datetime: '2024-06-05T09:15:00Z',
    event: 'Email forwarding setup',
    customer: 'professional@consultingfirm.com',
    summary: 'Customer wanted to set up professional email with their domain. Explained email forwarding options and G Suite integration.',
    messages: [
      { role: 'user', text: 'I have a custom domain and want email like info@mydomain.com. How do I set this up?' },
      {
        role: 'agent',
        text: 'Great question! Professional email with your custom domain is definitely possible. Here are your options:\n\n**Email Forwarding (included with domain):**\nIf you purchased your domain through WordPress.com, you get 3 free email forwards. Go to Domains → your domain → Email and set up forwards like:\n• info@yourdomain.com → your-gmail@gmail.com\n• hello@yourdomain.com → your-personal-email@example.com\n\n**Professional Email Services:**\nFor full email hosting (not just forwarding), you\'ll need a third-party service:\n• **G Suite/Google Workspace** - Professional Gmail with your domain\n• **Microsoft 365** - Outlook with your domain\n• **Titan Email** - Available through some domain providers\n\n**Setting up G Suite:**\nYou can integrate G Suite with WordPress.com by updating your domain\'s MX records in your DNS settings.\n\nWould you like me to walk you through setting up email forwarding, or are you interested in full email hosting with G Suite?',
        meta: {
          thinkingTime: 3789,
          sources: [
            { name: 'Email forwarding', description: 'How to set up email forwarding with your domain' },
            { name: 'Professional email setup', description: 'Integrating third-party email services' }
          ],
          classifiers: [
            { name: 'Inquiry type', description: 'Help' },
            { name: 'Is legal inquiry', description: 'False' },
            { name: 'Is wpengine inquiry', description: 'False' },
            { name: 'Is ai data sharing question', description: 'False' },
            { name: 'Is very frustrated with wordpress com', description: 'False' },
            { name: 'Language', description: 'En' },
            { name: 'Product', description: 'WordPress.com' },
            { name: 'Category', description: 'Domains' }
          ]
        }
      }
    ]
  },
  {
    id: 27,
    agentId: 1,
    datetime: '2024-06-04T14:30:00Z',
    event: 'Site migration help',
    customer: 'migrating@olddomain.com',
    summary: 'Customer wanted to import content from another WordPress site. Guided through the import process and explained what transfers and what doesn\'t.',
    messages: [
      { role: 'user', text: 'I want to move my old WordPress blog to WordPress.com. How do I transfer all my posts and pages?' },
      {
        role: 'agent',
        text: 'I\'ll help you migrate your content to WordPress.com! The process depends on where your current site is hosted:\n\n**For WordPress.org (self-hosted) sites:**\n1. Go to Tools → Import in your WordPress.com dashboard\n2. Choose "WordPress" and follow the prompts\n3. Export your content from your old site (Tools → Export)\n4. Upload the export file to WordPress.com\n\n**What transfers:**\n• Posts and pages (including content, titles, dates)\n• Comments\n• Categories and tags\n• Featured images\n\n**What may need manual setup:**\n• Theme and customizations\n• Plugins (many aren\'t available on WordPress.com)\n• Widgets and menus\n• Custom post types (Business plan required)\n\n**For other platforms:**\nWe have importers for Blogger, Medium, Tumblr, and others under Tools → Import.\n\n**Important:** Test the import process first! You can always delete the imported content and try again if needed.\n\nWhat platform is your current site on? I can provide more specific guidance!',
        meta: {
          thinkingTime: 6543,
          sources: [
            { name: 'Importing content', description: 'How to import from WordPress and other platforms' },
            { name: 'Site migration guide', description: 'Complete guide to moving your site to WordPress.com' }
          ],
          classifiers: [
            { name: 'Inquiry type', description: 'Help' },
            { name: 'Is legal inquiry', description: 'False' },
            { name: 'Is wpengine inquiry', description: 'False' },
            { name: 'Is ai data sharing question', description: 'False' },
            { name: 'Is very frustrated with wordpress com', description: 'False' },
            { name: 'Language', description: 'En' },
            { name: 'Product', description: 'WordPress.com' },
            { name: 'Category', description: 'Site management and migration' }
          ]
        }
      }
    ]
  },
  {
    id: 28,
    agentId: 1,
    datetime: '2024-06-03T16:20:00Z',
    event: 'Storage limit reached',
    customer: 'photographer@wildlife.com',
    summary: 'Customer hit their storage limit and couldn\'t upload more photos. Explained storage limits by plan and provided optimization tips.',
    messages: [
      { role: 'user', text: 'I keep getting an error that I\'ve reached my storage limit. I can\'t upload any more photos to my wildlife photography blog.' },
      {
        role: 'agent',
        text: 'I understand how frustrating that must be for a photography blog! Let me help you understand your storage options:\n\n**Current storage limits:**\n• Free plan: 3GB\n• Personal plan: 6GB\n• Premium plan: 13GB\n• Business plan: 200GB\n• Commerce plan: 200GB\n\n**To check your current usage:**\nGo to your dashboard → Settings → General and look for the storage meter.\n\n**Ways to free up space:**\n• Delete unused media files (Media → Library)\n• Optimize image sizes before uploading\n• Remove duplicate images\n• Consider using external galleries (like Flickr embeds)\n\n**For photography sites, I recommend:**\n• **Premium plan** for more storage and better media tools\n• **Business plan** if you need lots of high-res images\n• Using WordPress.com\'s automatic image optimization\n\nWould you like me to help you check which files are using the most space, or would you prefer to discuss upgrading your plan?',
        meta: {
          thinkingTime: 4567,
          sources: [
            { name: 'Storage limits', description: 'Storage allowances by plan and how to manage space' },
            { name: 'Managing media files', description: 'How to optimize and organize your media library' }
          ],
          classifiers: [
            { name: 'Inquiry type', description: 'Help' },
            { name: 'Is legal inquiry', description: 'False' },
            { name: 'Is wpengine inquiry', description: 'False' },
            { name: 'Is ai data sharing question', description: 'False' },
            { name: 'Is very frustrated with wordpress com', description: 'False' },
            { name: 'Language', description: 'En' },
            { name: 'Product', description: 'WordPress.com' },
            { name: 'Category', description: 'Site management and storage' }
          ]
        }
      }
    ]
  },
  {
    id: 29,
    agentId: 1,
    datetime: '2024-06-02T10:00:00Z',
    event: 'SSL certificate questions',
    customer: 'security@techstartup.com',
    summary: 'Customer asking about HTTPS and SSL certificates for their site. Explained that SSL is automatic on WordPress.com and provided security best practices.',
    messages: [
      { role: 'user', text: 'Do I need to install an SSL certificate for my site? I want to make sure it\'s secure and shows https://' },
      {
        role: 'agent',
        text: 'Great news! SSL certificates are automatically included and managed for all WordPress.com sites - you don\'t need to do anything!\n\n**What this means:**\n• Your site automatically uses HTTPS (secure connection)\n• SSL certificates are installed and renewed automatically\n• Visitors see the padlock icon in their browser\n• No additional cost or setup required\n\n**For custom domains:**\nWhen you connect a custom domain, WordPress.com automatically provides and maintains the SSL certificate for that domain too.\n\n**Additional security features:**\n• Automatic security updates\n• DDoS protection\n• Malware scanning\n• Secure login (two-factor authentication available)\n\n**To verify your SSL is working:**\nVisit your site with https:// - you should see a padlock icon in the address bar.\n\n**Forcing HTTPS:**\nIf you want to ensure all visitors use the secure version, this is handled automatically on WordPress.com.\n\nIs there a specific security concern you\'d like me to address, or are you seeing any SSL-related errors?',
        meta: {
          thinkingTime: 3456,
          sources: [
            { name: 'SSL certificates', description: 'Automatic SSL and HTTPS on WordPress.com' },
            { name: 'Site security', description: 'Security features and best practices' }
          ],
          classifiers: [
            { name: 'Inquiry type', description: 'Help' },
            { name: 'Is legal inquiry', description: 'False' },
            { name: 'Is wpengine inquiry', description: 'False' },
            { name: 'Is ai data sharing question', description: 'False' },
            { name: 'Is very frustrated with wordpress com', description: 'False' },
            { name: 'Language', description: 'En' },
            { name: 'Product', description: 'WordPress.com' },
            { name: 'Category', description: 'Security and SSL' }
          ]
        }
      }
    ]
  },
  {
    id: 30,
    agentId: 1,
    datetime: '2024-06-01T13:45:00Z',
    event: 'Social media integration',
    customer: 'marketing@brandagency.com',
    summary: 'Customer wanted to connect their social media accounts and add sharing buttons. Provided guidance on social integrations and Jetpack Social features.',
    messages: [
      { role: 'user', text: 'How can I connect my Instagram and Twitter accounts to my blog? I want posts to automatically share and want social buttons on my site.' },
      {
        role: 'agent',
        text: 'I\'ll help you set up social media integration! WordPress.com offers several ways to connect with social platforms:\n\n**Auto-sharing posts to social media:**\n1. Go to Marketing → Connections in your dashboard\n2. Connect your Twitter, Facebook, LinkedIn, and Tumblr accounts\n3. Choose which post types to auto-share\n4. Customize sharing messages and timing\n\n**Adding social sharing buttons:**\n• Use the "Social Icons" block in posts/pages\n• Add sharing buttons via Appearance → Customize → Widgets\n• Jetpack includes additional sharing options\n\n**Instagram integration:**\n• Use the Instagram block to embed posts\n• Add your Instagram widget to sidebars\n• Link to your Instagram profile in social menus\n\n**Note:** Instagram doesn\'t support auto-sharing like Twitter/Facebook, but you can embed individual posts.\n\n**Social features by plan:**\n• All plans: Basic social sharing and embeds\n• Premium+: Advanced social media tools\n• Business+: Full Jetpack Social features\n\nWould you like me to walk you through connecting a specific social media account, or help you add sharing buttons to your site?',
        meta: {
          thinkingTime: 5678,
          sources: [
            { name: 'Social media integration', description: 'How to connect and share to social platforms' },
            { name: 'Jetpack Social features', description: 'Advanced social media tools and auto-sharing' }
          ],
          classifiers: [
            { name: 'Inquiry type', description: 'Help' },
            { name: 'Is legal inquiry', description: 'False' },
            { name: 'Is wpengine inquiry', description: 'False' },
            { name: 'Is ai data sharing question', description: 'False' },
            { name: 'Is very frustrated with wordpress com', description: 'False' },
            { name: 'Language', description: 'En' },
            { name: 'Product', description: 'WordPress.com' },
            { name: 'Category', description: 'Social media and sharing' }
          ]
        }
      }
    ]
  }
];
