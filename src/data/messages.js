export const messages = {
    1: [
        {
            role: 'user',
            text: "I'm still having trouble logging in.",
        },
        {
            role: 'agent',
            text: 'I checked your support history and it looks like **clearing your cookies** often helps. Can you try that and reset your password again?\n\n**Steps to try:**\n1. Clear your browser cookies\n2. Reset your password\n3. Try logging in again',
            meta: {
                thinkingTime: 1234,
                sources: [
                    {
                        name: 'Login Support',
                        description: 'Common login issues',
                    },
                    {
                        name: 'Password Reset',
                        description: 'How to reset your password',
                    },
                ],
                classifiers: [
                    {
                        name: 'Inquiry type',
                        description: 'Help',
                    },
                    {
                        name: 'Is legal inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is wpengine inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is ai data sharing question',
                        description: 'False',
                    },
                    {
                        name: 'Is very frustrated with wordpress com',
                        description: 'False',
                    },
                    {
                        name: 'Language',
                        description: 'En',
                    },
                    {
                        name: 'Product',
                        description: 'Wordpress.com',
                    },
                    {
                        name: 'Category',
                        description:
                            'Creating & editing the site (includes design, using Gutenberg/block editor, customizing theme, etc)',
                    },
                ],
            },
        },
    ],
    2: [
        {
            role: 'user',
            text: "I worked on some editing for my header and now when I go to the website I can't click any of the pages. Nothing happens. I suspect I have something covering it, but I can see anything obvious in the list view.",
        },
        {
            role: 'agent',
            text: "I'm sorry to hear you're having trouble with your header navigation. It sounds like there might be an **invisible element** blocking your menu links.\n\n## Here's how to fix this:\n\n### Step 1: Access the Header Editor\n1. Go to your **dashboard**\n2. Navigate to **Appearance → Editor**\n3. Open **List View** (the icon with three horizontal lines)\n4. Select your **Header template part**\n\n### Step 2: Look for Overlapping Elements\n- Check for transparent **Group blocks**\n- Look for **Button blocks** that might be covering the menu\n- Watch for elements with absolute positioning\n\n> **Tip:** Sometimes clicking around different areas in the header can reveal invisible blocks\n\nWould you like me to provide more specific steps for troubleshooting this header navigation problem?",
            meta: {
                thinkingTime: 9541,
                sources: [
                    {
                        name: "Arrange content in your site's header",
                        description: 'Make your header full width',
                    },
                    {
                        name: 'Edit the header',
                        description:
                            "The header is the top part of a website that typically shows the site title, a logo, and a navigation menu. Our guides will show you how to customize your website's header.",
                    },
                    {
                        name: 'Edit the page template',
                        description:
                            'The Page template is used for standard pages on your site, such as an About or Contact page. Pages using this template will have the same overall layout, ensuring a consistent experience for visitors browsing through your site. This guide will show you how to edit the page template.',
                    },
                ],
                classifiers: [
                    {
                        name: 'Inquiry type',
                        description: 'Help',
                    },
                    {
                        name: 'Is legal inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is wpengine inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is ai data sharing question',
                        description: 'False',
                    },
                    {
                        name: 'Is very frustrated with wordpress com',
                        description: 'False',
                    },
                    {
                        name: 'Language',
                        description: 'En',
                    },
                    {
                        name: 'Product',
                        description: 'WordPress.com',
                    },
                    {
                        name: 'Category',
                        description:
                            'Creating & editing the site (includes design, using Gutenberg/block editor, customizing theme, etc)',
                    },
                ],
            },
        },
        {
            role: 'user',
            text: "I tried that, but it didn't work. I still can't click any of the pages. There was nothing obvious in the way.",
        },
        {
            role: 'agent',
            text: "That can be frustrating when the issue isn't immediately visible. Let's try a different approach to troubleshoot your header.\n\nWhen in the Site Editor looking at your header template part, try selecting different areas by clicking around your header - sometimes this can reveal invisible blocks. Also, check if you have any Group blocks that might have their height set to 100% or any blocks with absolute positioning that could be covering your navigation links.\n\nWould it help if I walked you through how to reset your header to the theme default, which might be a quicker solution if you can't identify the problematic element?",
            meta: {
                thinkingTime: 9541,
            },
        },
        {
            role: 'user',
            text: 'is there a way to undo any changes I did like at a given time',
        },
        {
            role: 'agent',
            text: 'Yes, there are a few ways to undo changes you\'ve made to your site!\n\nYou can restore a previous version of your header template part by going to Editor → Templates → Template Parts, selecting your header, and then clicking on "Revisions" in the right sidebar. This will show you previously saved versions that you can load.\n\nAlternatively, since you have a Personal plan, you can restore your entire site to a previous point using Jetpack Backup. Go to your dashboard, then Jetpack → Backup, select a date before you made the problematic changes, and click "Restore to this point."\n\nWould you like more details on either of these options?',
            meta: {
                thinkingTime: 4567,
            },
        },
        {
            role: 'user',
            text: 'it tells me that I need to upgrade to a business plan',
        },
        {
            role: 'agent',
            text: 'I see the confusion now. You\'re right - the full backup and restore feature is only available on Business and Commerce plans, not the Personal plan you currently have. In this case, your best option is to use the template revisions feature. Go to Appearance → Editor → Templates → Template Parts, select your header, then look for "Revisions" in the right sidebar settings panel. This should allow you to restore a previous version of just your header template.\n\nWould you like me to explain how to use the template revisions feature in more detail?',
            meta: {
                thinkingTime: 9541,
            },
        },
    ],
    3: [
        {
            role: 'user',
            text: 'I was charged twice for my plan this month. I need a refund, and can someone look into why this happened?',
        },
        {
            role: 'agent',
            text: 'Absolutely. I can see that you have two sites with monthly subscriptions. Did you mean to create a new site? It seems like it may have been accidental.',
            meta: {
                thinkingTime: 4567,
                sources: [
                    {
                        name: 'Managing purchases',
                        description:
                            "You can view, renew, or cancel your subscriptions and update payment methods directly from your WordPress.com account. In this guide, you'll learn how to manage all your purchases without contacting support.",
                    },
                    {
                        name: 'Turn Automatic Renewal On or Off',
                        description:
                            "Auto-renew helps ensure your website remains online without needing to track the expiry date. This guide explains how to enable and disable automatic renewal and make a payment for your site's purchases.",
                    },
                ],
                classifiers: [
                    {
                        name: 'Inquiry type',
                        description: 'Help',
                    },
                    {
                        name: 'Is legal inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is wpengine inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is ai data sharing question',
                        description: 'False',
                    },
                    {
                        name: 'Is very frustrated with wordpress com',
                        description: 'False',
                    },
                    {
                        name: 'Language',
                        description: 'En',
                    },
                    {
                        name: 'Product',
                        description: 'Wordpress.com',
                    },
                    {
                        name: 'Category',
                        description:
                            'Creating & editing the site (includes design, using Gutenberg/block editor, customizing theme, etc)',
                    },
                ],
            },
        },
    ],
    4: [
        {
            role: 'user',
            text: 'Please help me reset my Tumblr password.',
        },
        {
            role: 'agent',
            text: 'No problem! I have sent you an email with password reset instructions.',
            meta: {
                thinkingTime: 2345,
                sources: [
                    {
                        name: 'Tumblr Password Reset',
                        description: 'Password reset instructions',
                    },
                ],
                classifiers: [
                    {
                        name: 'Password Reset',
                        description: 'Category',
                    },
                    {
                        name: 'Tumblr',
                        description: 'Product',
                    },
                ],
            },
        },
    ],
    5: [
        {
            role: 'user',
            text: 'How do I customize my blog theme?',
        },
        {
            role: 'agent',
            text: 'Here is a guide that should help: https://help.tumblr.com/hc/en-us/articles/360041542954-Customizing-your-blog',
            meta: {
                thinkingTime: 3456,
                sources: [
                    {
                        name: 'Tumblr Theme Customization',
                        description: 'A guide to customizing your theme',
                    },
                ],
                classifiers: [
                    {
                        name: 'Customization',
                        description: 'Category',
                    },
                    {
                        name: 'Tumblr',
                        description: 'Product',
                    },
                ],
            },
        },
    ],
    6: [
        {
            role: 'user',
            text: 'Something went wrong with my account.',
        },
        {
            role: 'agent',
            text: 'This looks complicated. I am escalating to a human agent.',
            meta: {
                thinkingTime: 5678,
                sources: [
                    {
                        name: 'Account Support',
                        description: 'Common account issues',
                    },
                    {
                        name: 'Escalation',
                        description: 'When to escalate to a human',
                    },
                ],
                classifiers: [
                    {
                        name: 'Account Issue',
                        description: 'Category',
                    },
                    {
                        name: 'Escalate',
                        description: 'Action',
                    },
                ],
            },
        },
    ],
    10: [
        {
            role: 'user',
            text: 'Can you find the cover block in this HTML snippet?',
        },
        {
            role: 'agent',
            text: '<div class="wp-block-cover">...</div>',
            meta: {
                thinkingTime: 4444,
                sources: [
                    {
                        name: 'HTML Parser',
                        description: 'Tool to parse HTML',
                    },
                ],
                classifiers: [
                    {
                        name: 'Code Analysis',
                        description: 'Category',
                    },
                    {
                        name: 'WordPress',
                        description: 'Product',
                    },
                ],
            },
        },
    ],
    11: [
        {
            role: 'user',
            text: 'Find the gallery block.',
        },
        {
            role: 'agent',
            text: 'I could not find a gallery block. Did you mean a different block?',
            meta: {
                thinkingTime: 5555,
                sources: [
                    {
                        name: 'HTML Parser',
                        description: 'Tool to parse HTML',
                    },
                ],
                classifiers: [
                    {
                        name: 'Code Analysis',
                        description: 'Category',
                    },
                    {
                        name: 'Negative',
                        description: 'Result',
                    },
                ],
            },
        },
    ],
    12: [
        {
            role: 'user',
            text: 'Here is some messy HTML, find the heading.',
        },
        {
            role: 'agent',
            text: '<h2>Example Heading</h2>',
            meta: {
                thinkingTime: 6666,
                sources: [
                    {
                        name: 'HTML Parser',
                        description: 'Tool to parse HTML',
                    },
                ],
                classifiers: [
                    {
                        name: 'Code Analysis',
                        description: 'Category',
                    },
                    {
                        name: 'WordPress',
                        description: 'Product',
                    },
                ],
            },
        },
    ],
    16: [
        {
            role: 'user',
            text: 'Who is the DRI for the new project?',
        },
        {
            role: 'agent',
            text: 'The DRI is Jane Doe. Here is a P2 link with more info.',
            meta: {
                thinkingTime: 1010,
                sources: [
                    {
                        name: 'P2',
                        description: 'Project documentation',
                    },
                ],
                classifiers: [
                    {
                        name: 'Project Management',
                        description: 'Category',
                    },
                    {
                        name: 'Information Retrieval',
                        description: 'Type',
                    },
                ],
            },
        },
    ],
    17: [
        {
            role: 'user',
            text: 'What are people saying about the product launch?',
        },
        {
            role: 'agent',
            text: 'Here is a summary of the latest discussions on P2.',
            meta: {
                thinkingTime: 2020,
                sources: [
                    {
                        name: 'P2',
                        description: 'Product launch discussions',
                    },
                ],
                classifiers: [
                    {
                        name: 'Summarization',
                        description: 'Category',
                    },
                    {
                        name: 'Information Retrieval',
                        description: 'Type',
                    },
                ],
            },
        },
    ],
    18: [
        {
            role: 'user',
            text: 'Where can I find onboarding docs?',
        },
        {
            role: 'agent',
            text: 'Check out this P2 post with the onboarding steps.',
            meta: {
                thinkingTime: 3030,
                sources: [
                    {
                        name: 'P2',
                        description: 'Onboarding documentation',
                    },
                ],
                classifiers: [
                    {
                        name: 'Onboarding',
                        description: 'Category',
                    },
                    {
                        name: 'Information Retrieval',
                        description: 'Type',
                    },
                ],
            },
        },
    ],
    19: [
        {
            role: 'user',
            text: "I bought a domain from GoDaddy but it's not working with my WordPress.com site. Can you help me connect it?",
        },
        {
            role: 'agent',
            text: "I'd be happy to help you connect your custom domain! There are **two main ways** to do this:\n\n- Point your domain to WordPress.com using **nameservers** (recommended)\n- Update your **DNS records** manually\n\n## Recommended: Using Nameservers\n\nFor the easiest setup, I recommend using nameservers. In your [GoDaddy account](https://godaddy.com), go to your domain settings and change the nameservers to:\n\n```\nns1.wordpress.com\nns2.wordpress.com\nns3.wordpress.com\n```\n\n### Next Steps:\n1. Come back to your WordPress.com dashboard\n2. Add your domain under **Settings → Domains**\n3. Wait up to **24 hours** for changes to take effect\n\n*Note: DNS propagation can sometimes take longer depending on your location.*\n\nWould you like me to walk you through the step-by-step process?",
            meta: {
                thinkingTime: 3456,
                sources: [
                    {
                        name: 'Connect an existing domain',
                        description:
                            'How to connect a domain you already own to your WordPress.com site',
                    },
                    {
                        name: 'DNS and nameservers',
                        description:
                            'Understanding DNS settings and nameserver configuration',
                    },
                ],
                classifiers: [
                    {
                        name: 'Inquiry type',
                        description: 'Help',
                    },
                    {
                        name: 'Is legal inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is wpengine inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is ai data sharing question',
                        description: 'False',
                    },
                    {
                        name: 'Is very frustrated with wordpress com',
                        description: 'False',
                    },
                    {
                        name: 'Language',
                        description: 'En',
                    },
                    {
                        name: 'Product',
                        description: 'WordPress.com',
                    },
                    {
                        name: 'Category',
                        description: 'Domains',
                    },
                ],
            },
        },
    ],
    20: [
        {
            role: 'user',
            text: 'I keep getting spam comments on my blog. How can I stop them or at least moderate them before they appear?',
        },
        {
            role: 'agent',
            text: "Great question! WordPress.com has several **built-in tools** to help manage comments and reduce spam.\n\n## Comment Moderation Settings\n\nFirst, go to **Settings → Discussion** in your dashboard. Here you can:\n\n- Require comments to be **approved before appearing**\n- Require users to fill out **name and email**\n- Hold comments with multiple links for moderation\n- Automatically close comments on posts older than a certain number of days\n\n## Spam Protection\n\nFor spam protection, **Akismet** comes free with all WordPress.com sites and automatically filters spam comments. Make sure it's activated under `Plugins → Installed Plugins`.\n\n> **Pro tip:** Akismet learns from your spam/ham decisions, so the more you moderate, the better it gets!\n\n## Managing Comments\n\nYou can also manage comments by going to **Comments** in your dashboard sidebar, where you can:\n\n1. **Approve** legitimate comments\n2. Mark **spam** for suspicious content  \n3. **Delete** unwanted comments\n4. Use **bulk actions** for efficiency\n\nWould you like me to explain any of these settings in more detail?",
            meta: {
                thinkingTime: 4567,
                sources: [
                    {
                        name: 'Comment settings',
                        description:
                            'How to configure comment moderation and spam protection',
                    },
                    {
                        name: 'Managing comments',
                        description:
                            'Tools for moderating and managing blog comments',
                    },
                ],
                classifiers: [
                    {
                        name: 'Inquiry type',
                        description: 'Help',
                    },
                    {
                        name: 'Is legal inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is wpengine inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is ai data sharing question',
                        description: 'False',
                    },
                    {
                        name: 'Is very frustrated with wordpress com',
                        description: 'False',
                    },
                    {
                        name: 'Language',
                        description: 'En',
                    },
                    {
                        name: 'Product',
                        description: 'WordPress.com',
                    },
                    {
                        name: 'Category',
                        description: 'Comments and community',
                    },
                ],
            },
        },
    ],
    21: [
        {
            role: 'user',
            text: 'I can\'t publish my blog post. When I click "Publish" nothing happens, and sometimes I get an error message that says something went wrong.',
        },
        {
            role: 'agent',
            text: "I'm sorry you're having trouble publishing your post! This is usually caused by a browser issue or connectivity problem. Let's try these troubleshooting steps:\n\n1. **Clear your browser cache and cookies** for WordPress.com\n2. **Try a different browser** or incognito/private mode\n3. **Disable browser extensions** temporarily\n4. **Check your internet connection** - try refreshing the page\n\nIf you're still having issues, try saving your post as a draft first, then publishing it. You can also try the \"Schedule\" option to publish it immediately.\n\nAre you seeing any specific error messages I can help troubleshoot?",
            meta: {
                thinkingTime: 2345,
                sources: [
                    {
                        name: 'Publishing posts',
                        description: 'How to publish and schedule blog posts',
                    },
                    {
                        name: 'Troubleshooting editor issues',
                        description: 'Common editor problems and solutions',
                    },
                ],
                classifiers: [
                    {
                        name: 'Inquiry type',
                        description: 'Help',
                    },
                    {
                        name: 'Is legal inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is wpengine inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is ai data sharing question',
                        description: 'False',
                    },
                    {
                        name: 'Is very frustrated with wordpress com',
                        description: 'False',
                    },
                    {
                        name: 'Language',
                        description: 'En',
                    },
                    {
                        name: 'Product',
                        description: 'WordPress.com',
                    },
                    {
                        name: 'Category',
                        description:
                            'Creating & editing the site (includes design, using Gutenberg/block editor, customizing theme, etc)',
                    },
                ],
            },
        },
    ],
    22: [
        {
            role: 'user',
            text: "How can I change the colors and fonts on my website? I want to make it more personal but I don't know where to start.",
        },
        {
            role: 'agent',
            text: "Great question! You have several options for customizing your site's appearance, depending on your theme and plan.\n\n**For most themes:**\nGo to Appearance → Customize in your dashboard. Here you'll find options for:\n• Colors (background, text, accent colors)\n• Fonts and typography\n• Header and footer settings\n• Layout options\n\n**For block themes (newer themes):**\nUse Appearance → Editor → Global Styles to access:\n• Color palette customization\n• Typography settings\n• Spacing and layout controls\n\n**For more advanced customization:**\nWith a Premium plan or higher, you can add custom CSS under Appearance → Customize → Additional CSS.\n\nWhat specific changes are you looking to make? I can provide more targeted guidance based on your theme and goals!",
            meta: {
                thinkingTime: 5678,
                sources: [
                    {
                        name: 'Customizing your site',
                        description:
                            'How to customize colors, fonts, and layout',
                    },
                    {
                        name: 'Using the Site Editor',
                        description:
                            'Block theme customization with Global Styles',
                    },
                ],
                classifiers: [
                    {
                        name: 'Inquiry type',
                        description: 'Help',
                    },
                    {
                        name: 'Is legal inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is wpengine inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is ai data sharing question',
                        description: 'False',
                    },
                    {
                        name: 'Is very frustrated with wordpress com',
                        description: 'False',
                    },
                    {
                        name: 'Language',
                        description: 'En',
                    },
                    {
                        name: 'Product',
                        description: 'WordPress.com',
                    },
                    {
                        name: 'Category',
                        description:
                            'Creating & editing the site (includes design, using Gutenberg/block editor, customizing theme, etc)',
                    },
                ],
            },
        },
    ],
    23: [
        {
            role: 'user',
            text: "My bakery website has been live for 2 months but I can't find it on Google. What am I doing wrong?",
        },
        {
            role: 'agent',
            text: 'Getting found on Google takes time and some optimization! Let me help you check a few important settings:\n\n**First, check your site visibility:**\nGo to Settings → General and make sure "Discourage search engines from indexing this site" is **unchecked**.\n\n**For better SEO:**\n• Add a site description under Settings → General\n• Use the built-in SEO features (available with all plans)\n• Write descriptive page titles and meta descriptions\n• Add alt text to your images\n• Create quality content regularly\n• Submit your sitemap to Google Search Console\n\n**Your sitemap URL is:** yourdomain.com/sitemap.xml\n\nGoogle typically takes 2-8 weeks to fully index new sites. With a Premium plan or higher, you get advanced SEO tools and can connect Google Analytics to track your progress.\n\nWould you like me to walk you through setting up Google Search Console?',
            meta: {
                thinkingTime: 6789,
                sources: [
                    {
                        name: 'SEO on WordPress.com',
                        description:
                            'Search engine optimization basics and tools',
                    },
                    {
                        name: 'Site visibility settings',
                        description: 'How to control search engine indexing',
                    },
                ],
                classifiers: [
                    {
                        name: 'Inquiry type',
                        description: 'Help',
                    },
                    {
                        name: 'Is legal inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is wpengine inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is ai data sharing question',
                        description: 'False',
                    },
                    {
                        name: 'Is very frustrated with wordpress com',
                        description: 'False',
                    },
                    {
                        name: 'Language',
                        description: 'En',
                    },
                    {
                        name: 'Product',
                        description: 'WordPress.com',
                    },
                    {
                        name: 'Category',
                        description: 'SEO and site promotion',
                    },
                ],
            },
        },
    ],
    24: [
        {
            role: 'user',
            text: 'My photography website looks great on desktop but terrible on mobile phones. How can I fix this?',
        },
        {
            role: 'agent',
            text: "Most WordPress.com themes are responsive, meaning they automatically adjust to different screen sizes, but there are ways to optimize the mobile experience!\n\n**To check and improve mobile display:**\n\n1. **Use the mobile preview** in the editor - look for the mobile icon in the top toolbar\n2. **Optimize images** - large photos can slow loading and look stretched on mobile\n3. **Check your layout** - some complex layouts may need adjustment for mobile\n4. **Test navigation** - make sure your menu works well on touch devices\n\n**For photography sites specifically:**\n• Use gallery blocks instead of individual images when possible\n• Consider a mobile-first theme designed for photography\n• Ensure images are properly sized (WordPress.com automatically creates mobile versions)\n\n**Advanced options:**\nWith a Premium plan, you can add custom CSS to fine-tune the mobile experience.\n\nCan you tell me which theme you're using? I can provide more specific guidance based on your setup!",
            meta: {
                thinkingTime: 4321,
                sources: [
                    {
                        name: 'Mobile-responsive themes',
                        description:
                            'How themes adapt to different screen sizes',
                    },
                    {
                        name: 'Optimizing for mobile',
                        description:
                            'Tips for improving mobile site performance',
                    },
                ],
                classifiers: [
                    {
                        name: 'Inquiry type',
                        description: 'Help',
                    },
                    {
                        name: 'Is legal inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is wpengine inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is ai data sharing question',
                        description: 'False',
                    },
                    {
                        name: 'Is very frustrated with wordpress com',
                        description: 'False',
                    },
                    {
                        name: 'Language',
                        description: 'En',
                    },
                    {
                        name: 'Product',
                        description: 'WordPress.com',
                    },
                    {
                        name: 'Category',
                        description:
                            'Creating & editing the site (includes design, using Gutenberg/block editor, customizing theme, etc)',
                    },
                ],
            },
        },
    ],
    25: [
        {
            role: 'user',
            text: 'I want to add a contact form plugin and a booking system to my site. How do I install plugins?',
        },
        {
            role: 'agent',
            text: 'I\'d love to help with your plugin needs! Plugin installation depends on your WordPress.com plan:\n\n**For contact forms:**\nGood news! You don\'t need a plugin - WordPress.com includes a built-in Contact Form block that works on all plans. Just add the "Form" block to any page or post.\n\n**For booking systems:**\nThis typically requires third-party plugins, which are only available with the Business plan ($25/month) or higher.\n\n**Your current options:**\n• **Free/Personal/Premium plans**: Use built-in blocks and widgets, plus approved plugins from our marketplace\n• **Business plan and higher**: Install any plugin from the WordPress.org repository\n\n**Alternatives for booking without plugins:**\n• Embed booking widgets from services like Calendly or Acuity\n• Use the HTML block to add booking code from external services\n• Link to external booking pages\n\nWould you like me to show you how to set up the contact form, or would you prefer information about upgrading to access more plugins?',
            meta: {
                thinkingTime: 5432,
                sources: [
                    {
                        name: 'Installing plugins',
                        description:
                            'Plugin installation requirements and limitations by plan',
                    },
                    {
                        name: 'Contact forms',
                        description:
                            'How to create contact forms without plugins',
                    },
                ],
                classifiers: [
                    {
                        name: 'Inquiry type',
                        description: 'Help',
                    },
                    {
                        name: 'Is legal inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is wpengine inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is ai data sharing question',
                        description: 'False',
                    },
                    {
                        name: 'Is very frustrated with wordpress com',
                        description: 'False',
                    },
                    {
                        name: 'Language',
                        description: 'En',
                    },
                    {
                        name: 'Product',
                        description: 'WordPress.com',
                    },
                    {
                        name: 'Category',
                        description: 'Plugins and integrations',
                    },
                ],
            },
        },
        {
            role: 'user',
            text: 'oh awesome, thanks! could you show me how to actually set up the contact form? i have a small business and really need this working',
        },
        {
            role: 'agent',
            text: 'Absolutely! The built-in contact form is perfect for small businesses. Here\'s how to set it up:\n\n**Step 1: Add the Form Block**\n1. Go to the page where you want the form (usually "Contact" page)\n2. Click the **+ (Add Block)** button\n3. Search for "Form" and select the **Form block**\n4. Choose a form layout (simple contact form works great)\n\n**Step 2: Customize Your Form**\n• **Add fields**: Name, Email, Subject, Message (these are standard)\n• **Optional fields**: Phone, Company, Website\n• **Required fields**: Mark essential fields as required\n\n**Step 3: Configure Settings**\n• Set the **submit button text** (e.g., "Send Message")\n• Add a **confirmation message** for after submission\n• Choose email notification settings\n\nThe form automatically includes spam protection and works on all devices. Would you like me to explain the email notification setup next?',
            meta: {
                thinkingTime: 4321,
                sources: [
                    {
                        name: 'Contact form setup',
                        description: 'Step-by-step guide to creating contact forms',
                    },
                    {
                        name: 'Form block customization',
                        description: 'How to customize form fields and settings',
                    },
                ],
                classifiers: [
                    {
                        name: 'Inquiry type',
                        description: 'Help',
                    },
                    {
                        name: 'Is legal inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is wpengine inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is ai data sharing question',
                        description: 'False',
                    },
                    {
                        name: 'Is very frustrated with wordpress com',
                        description: 'False',
                    },
                    {
                        name: 'Language',
                        description: 'En',
                    },
                    {
                        name: 'Product',
                        description: 'WordPress.com',
                    },
                    {
                        name: 'Category',
                        description: 'Contact forms and communication',
                    },
                ],
            },
        },
        {
            role: 'user',
            text: 'yeah definitely! so when someone fills out the form, where does it actually go? like do I get an email or what?',
        },
        {
            role: 'agent',
            text: 'Great question! Here\'s how email notifications work with the contact form:\n\n**Default Email Settings:**\n• Form submissions go to your **WordPress.com account email**\n• You\'ll get an email notification for each submission\n• The sender\'s reply-to address is automatically set to their email\n\n**To customize email settings:**\n1. Click on your Form block\n2. In the block settings sidebar, find **"Email Settings"**\n3. You can change:\n   • **To email address** (where submissions go)\n   • **From name** (how it appears in your inbox)\n   • **Subject line** (customize the email subject)\n\n**Email format includes:**\n• All form field responses\n• Timestamp of submission\n• Sender\'s information\n• Sometimes IP address (for security)\n\n**Pro tip:** Set up a dedicated email like contact@yourbusiness.com using email forwarding, then point form notifications there for a more professional setup.\n\nDo you need help setting up email forwarding for your business?',
            meta: {
                thinkingTime: 3567,
                sources: [
                    {
                        name: 'Form email notifications',
                        description: 'How contact form emails work and customization options',
                    },
                    {
                        name: 'Email management',
                        description: 'Managing business email with WordPress.com',
                    },
                ],
                classifiers: [
                    {
                        name: 'Inquiry type',
                        description: 'Help',
                    },
                    {
                        name: 'Is legal inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is wpengine inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is ai data sharing question',
                        description: 'False',
                    },
                    {
                        name: 'Is very frustrated with wordpress com',
                        description: 'False',
                    },
                    {
                        name: 'Language',
                        description: 'En',
                    },
                    {
                        name: 'Product',
                        description: 'WordPress.com',
                    },
                    {
                        name: 'Category',
                        description: 'Contact forms and communication',
                    },
                ],
            },
        },
        {
            role: 'user',
            text: 'ok cool that makes sense for the contact form. now about the booking thing - you mentioned calendly? can you tell me more about that stuff?',
        },
        {
            role: 'agent',
            text: 'Absolutely! External booking services are often the best solution, even better than plugins in many cases. Here are the top options:\n\n**Calendly (Most Popular)**\n• **Free plan**: 1 event type, unlimited bookings\n• **Paid plans**: Start at $8/month for multiple event types\n• **Features**: Calendar sync, automated emails, timezone detection\n• **Integration**: Easy embed code for WordPress.com\n\n**Acuity Scheduling**\n• **Free plan**: Limited features\n• **Paid plans**: Start at $14/month\n• **Features**: Advanced customization, intake forms, packages\n\n**SimplyBook.me**\n• **Free plan**: Up to 50 bookings/month\n• **Features**: Great for service businesses, payment integration\n\n**How to embed in WordPress.com:**\n1. Get your booking widget code from the service\n2. Add an **HTML block** to your page\n3. Paste the embed code\n4. Save and preview\n\nCalendly tends to work best for most small businesses. Would you like me to walk you through setting up a Calendly integration?',
            meta: {
                thinkingTime: 5678,
                sources: [
                    {
                        name: 'Third-party booking services',
                        description: 'Comparison of external booking and scheduling tools',
                    },
                    {
                        name: 'Embedding external widgets',
                        description: 'How to integrate third-party services into WordPress.com',
                    },
                ],
                classifiers: [
                    {
                        name: 'Inquiry type',
                        description: 'Help',
                    },
                    {
                        name: 'Is legal inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is wpengine inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is ai data sharing question',
                        description: 'False',
                    },
                    {
                        name: 'Is very frustrated with wordpress com',
                        description: 'False',
                    },
                    {
                        name: 'Language',
                        description: 'En',
                    },
                    {
                        name: 'Product',
                        description: 'WordPress.com',
                    },
                    {
                        name: 'Category',
                        description: 'Booking systems and integrations',
                    },
                ],
            },
        },
        {
            role: 'user',
            text: 'yes! calendly sounds perfect actually. can you walk me through how to get it on my site? i do consulting so this would be huge for me',
        },
        {
            role: 'agent',
            text: 'Perfect choice for a consulting business! Calendly integrates beautifully with WordPress.com. Here\'s the complete setup:\n\n**Step 1: Set up your Calendly account**\n1. Go to calendly.com and create a free account\n2. Connect your Google/Outlook calendar\n3. Create your first event type (e.g., "30-minute consultation")\n4. Set your availability and preferences\n\n**Step 2: Get your embed code**\n1. In Calendly, go to your event type\n2. Click **"Share"** → **"Embed"**\n3. Choose **"Inline Embed"** for best results\n4. Copy the provided HTML code\n\n**Step 3: Add to your WordPress.com site**\n1. Edit the page where you want booking (e.g., "Book a Call")\n2. Add an **HTML block** (+  → search "HTML")\n3. Paste your Calendly embed code\n4. **Preview** to test, then **Publish**\n\n**Pro tip:** You can also use Calendly\'s popup or redirect options if you prefer those over inline embedding.\n\nThe setup takes about 10 minutes total. Need help with any specific part?',
            meta: {
                thinkingTime: 4444,
                sources: [
                    {
                        name: 'Calendly integration guide',
                        description: 'Step-by-step Calendly setup and embedding',
                    },
                    {
                        name: 'HTML block usage',
                        description: 'How to use HTML blocks for external integrations',
                    },
                ],
                classifiers: [
                    {
                        name: 'Inquiry type',
                        description: 'Help',
                    },
                    {
                        name: 'Is legal inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is wpengine inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is ai data sharing question',
                        description: 'False',
                    },
                    {
                        name: 'Is very frustrated with wordpress com',
                        description: 'False',
                    },
                    {
                        name: 'Language',
                        description: 'En',
                    },
                    {
                        name: 'Product',
                        description: 'WordPress.com',
                    },
                    {
                        name: 'Category',
                        description: 'Booking systems and integrations',
                    },
                ],
            },
        },
        {
            role: 'user',
            text: 'this is super helpful btw! but wait, you mentioned something about a business plan earlier? what kind of booking plugins could i actually install with that?',
        },
        {
            role: 'agent',
            text: 'Great question! The Business plan ($25/month) opens up the entire WordPress.org plugin repository. Here are the top booking plugins you\'d gain access to:\n\n**Popular Booking Plugins:**\n\n**Bookly** (Premium)\n• Advanced appointment booking\n• Multiple staff members\n• Payment integration (PayPal, Stripe)\n• SMS notifications\n\n**WooCommerce Bookings** (Premium)\n• Perfect if you sell products + services\n• Integrates with WooCommerce for payments\n• Great for events, rentals, appointments\n\n**Amelia** (Premium)\n• Beautiful interface\n• Employee management\n• Package bookings\n• WhatsApp notifications\n\n**Easy Appointments** (Free)\n• Simple booking system\n• Google Calendar sync\n• Email notifications\n\n**Business Plan Benefits Beyond Plugins:**\n• 200GB storage\n• Advanced SEO tools\n• Google Analytics integration\n• Remove WordPress.com branding\n• Custom themes and unlimited customization\n\nHonestly, for most consultants, Calendly + Contact Form handles 90% of needs. But if you need advanced features like multiple staff, packages, or integrated payments, the Business plan might be worth it.\n\nWhat specific features are most important for your consulting business?',
            meta: {
                thinkingTime: 6789,
                sources: [
                    {
                        name: 'WordPress Business plan features',
                        description: 'Complete overview of Business plan capabilities and plugins',
                    },
                    {
                        name: 'Booking plugin comparison',
                        description: 'Popular booking and appointment plugins for WordPress',
                    },
                ],
                classifiers: [
                    {
                        name: 'Inquiry type',
                        description: 'Help',
                    },
                    {
                        name: 'Is legal inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is wpengine inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is ai data sharing question',
                        description: 'False',
                    },
                    {
                        name: 'Is very frustrated with wordpress com',
                        description: 'False',
                    },
                    {
                        name: 'Language',
                        description: 'En',
                    },
                    {
                        name: 'Product',
                        description: 'WordPress.com',
                    },
                    {
                        name: 'Category',
                        description: 'Plans and upgrades',
                    },
                ],
            },
        },
        {
            role: 'user',
            text: 'hmm $25/month seems kinda steep though. how much does calendly cost compared to upgrading? trying to figure out what makes the most sense financially',
        },
        {
            role: 'agent',
            text: 'Smart thinking! Let me break down the costs so you can make an informed decision:\n\n**Calendly Pricing:**\n• **Free**: 1 event type, unlimited bookings, basic features\n• **Essentials**: $8/month - Multiple event types, integrations\n• **Professional**: $12/month - Advanced features, workflows\n• **Teams**: $16/month per user - Team scheduling, admin features\n\n**WordPress.com Business Plan:**\n• **$25/month** ($300/year) - Includes everything plus plugins\n\n**Cost Comparison Scenarios:**\n\n**Option 1: Current Plan + Calendly Free**\n• Cost: Your current plan + $0 = Most affordable\n• Good for: Simple consultation booking\n\n**Option 2: Current Plan + Calendly Paid**\n• Cost: Your current plan + $8-12/month\n• Good for: Professional booking with multiple services\n\n**Option 3: Business Plan**\n• Cost: $25/month\n• Good for: If you need advanced booking + other Business plan features\n\n**My recommendation:** Start with Calendly free or Essentials ($8). You can always upgrade later if you need more features. The Business plan makes sense if you also want:\n• Advanced SEO tools\n• Custom themes\n• Multiple plugins\n• Integrated payments\n\nDoes this help with your decision?',
            meta: {
                thinkingTime: 5555,
                sources: [
                    {
                        name: 'WordPress.com pricing',
                        description: 'Current pricing for all WordPress.com plans',
                    },
                    {
                        name: 'Third-party service costs',
                        description: 'Comparison of external booking service pricing',
                    },
                ],
                classifiers: [
                    {
                        name: 'Inquiry type',
                        description: 'Help',
                    },
                    {
                        name: 'Is legal inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is wpengine inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is ai data sharing question',
                        description: 'False',
                    },
                    {
                        name: 'Is very frustrated with wordpress com',
                        description: 'False',
                    },
                    {
                        name: 'Language',
                        description: 'En',
                    },
                    {
                        name: 'Product',
                        description: 'WordPress.com',
                    },
                    {
                        name: 'Category',
                        description: 'Pricing and plan comparison',
                    },
                ],
            },
        },
        {
            role: 'user',
            text: 'gotcha, that makes sense. if i wanted to upgrade later though, is it like a pain to do or pretty straightforward?',
        },
        {
            role: 'agent',
            text: 'The upgrade process is very straightforward! Here\'s exactly how it works:\n\n**Upgrading Steps:**\n1. Go to your WordPress.com dashboard\n2. Click **Plans** in the sidebar\n3. Select **Business plan** and click **"Upgrade"**\n4. Choose billing cycle (monthly or annual for savings)\n5. Complete payment - upgrade is instant!\n\n**What happens immediately:**\n• All Business plan features activate instantly\n• Plugin installation becomes available\n• Storage increases to 200GB\n• Advanced customization tools unlock\n\n**No downtime or disruption:**\n• Your site stays online during upgrade\n• All content and settings remain exactly the same\n• Existing Calendly integration keeps working\n\n**Pro-rated billing:**\n• You only pay the difference for the current billing period\n• Next renewal will be at the new plan rate\n\n**Money-saving tip:**\n• Annual billing gives you 2 months free\n• Business annual = $25 × 10 months = $250 vs $300 monthly\n\n**You can also downgrade later** if you find you don\'t need all the features, though you\'ll lose plugin access.\n\nSo you can definitely start with your current plan + Calendly and upgrade anytime if your needs grow!',
            meta: {
                thinkingTime: 4321,
                sources: [
                    {
                        name: 'Plan upgrade process',
                        description: 'How to upgrade WordPress.com plans and what to expect',
                    },
                    {
                        name: 'Billing and pricing',
                        description: 'WordPress.com billing cycles and upgrade pricing',
                    },
                ],
                classifiers: [
                    {
                        name: 'Inquiry type',
                        description: 'Help',
                    },
                    {
                        name: 'Is legal inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is wpengine inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is ai data sharing question',
                        description: 'False',
                    },
                    {
                        name: 'Is very frustrated with wordpress com',
                        description: 'False',
                    },
                    {
                        name: 'Language',
                        description: 'En',
                    },
                    {
                        name: 'Product',
                        description: 'WordPress.com',
                    },
                    {
                        name: 'Category',
                        description: 'Plan upgrades and billing',
                    },
                ],
            },
        },
        {
            role: 'user',
            text: 'perfect! ok so im thinking contact form first, then calendly. can you just give me like a quick rundown of what i need to do?',
        },
        {
            role: 'agent',
            text: 'Excellent plan! Here\'s your step-by-step action plan:\n\n**Phase 1: Contact Form Setup (10 minutes)**\n1. Go to your Contact page (or create one)\n2. Add **Form block** (+ button → search "Form")\n3. Customize fields: Name, Email, Subject, Message\n4. Set up email notifications to go to your business email\n5. Add confirmation message\n6. Test the form by submitting it yourself\n\n**Phase 2: Calendly Integration (15 minutes)**\n1. Sign up for free Calendly account at calendly.com\n2. Connect your calendar (Google/Outlook)\n3. Create your consultation event type\n4. Get embed code (Share → Embed → Inline)\n5. Create "Book a Call" page on your site\n6. Add **HTML block** and paste Calendly code\n7. Preview and publish\n\n**Phase 3: Test Everything**\n• Submit a test contact form\n• Book a test appointment through Calendly\n• Check that emails are working correctly\n\n**Total time:** About 30 minutes for both!\n\nThis gives you a professional contact + booking system without any monthly fees to start. You can always add premium features later as your business grows.\n\nReady to get started?',
            meta: {
                thinkingTime: 3333,
                sources: [
                    {
                        name: 'Implementation planning',
                        description: 'Best practices for setting up contact and booking systems',
                    },
                    {
                        name: 'Small business setup guide',
                        description: 'Essential website features for consulting businesses',
                    },
                ],
                classifiers: [
                    {
                        name: 'Inquiry type',
                        description: 'Help',
                    },
                    {
                        name: 'Is legal inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is wpengine inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is ai data sharing question',
                        description: 'False',
                    },
                    {
                        name: 'Is very frustrated with wordpress com',
                        description: 'False',
                    },
                    {
                        name: 'Language',
                        description: 'En',
                    },
                    {
                        name: 'Product',
                        description: 'WordPress.com',
                    },
                    {
                        name: 'Category',
                        description: 'Implementation and setup',
                    },
                ],
            },
        },
        {
            role: 'user',
            text: 'dude this has been so helpful! one more thing though - is there anything else i should definitely have on my consulting site? like am i missing something obvious?',
        },
        {
            role: 'agent',
            text: 'So glad I could help! For a consulting website, you\'ve got the essentials covered with contact forms and booking. Here are a few more features that can really enhance your professional presence:\n\n**Essential Additions:**\n\n**Testimonials Section**\n• Use "Quote" blocks or "Columns" block with client quotes\n• Add client photos for credibility\n• Include client names and companies\n\n**About Page with Professional Bio**\n• Your expertise and background\n• Professional headshot\n• Client success stories\n\n**Services/Pricing Page**\n• Clear description of what you offer\n• Transparent pricing (builds trust)\n• Package options if applicable\n\n**Blog for Content Marketing**\n• Share your expertise\n• Improve SEO\n• Build authority in your field\n\n**Social Proof Elements**\n• Client logos\n• Certifications\n• Case studies\n\n**Professional Email**\n• Consider yourname@yourdomain.com\n• Use email forwarding (included with domain)\n\n**Analytics** (Premium+ plans)\n• Track visitor behavior\n• See which pages convert best\n\nYour current plan + these content additions will create a powerful consulting website. The contact form and Calendly booking will handle the conversion side perfectly!\n\nNeed help with any of these additional features?',
            meta: {
                thinkingTime: 6666,
                sources: [
                    {
                        name: 'Consulting website best practices',
                        description: 'Essential features for professional service websites',
                    },
                    {
                        name: 'Website conversion optimization',
                        description: 'Features that improve client acquisition for consultants',
                    },
                ],
                classifiers: [
                    {
                        name: 'Inquiry type',
                        description: 'Help',
                    },
                    {
                        name: 'Is legal inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is wpengine inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is ai data sharing question',
                        description: 'False',
                    },
                    {
                        name: 'Is very frustrated with wordpress com',
                        description: 'False',
                    },
                    {
                        name: 'Language',
                        description: 'En',
                    },
                    {
                        name: 'Product',
                        description: 'WordPress.com',
                    },
                    {
                        name: 'Category',
                        description: 'Website optimization and features',
                    },
                ],
            },
        },
        {
            role: 'user',
            text: 'omg thank you SO much! you basically gave me a whole game plan. i actually feel like i can do this now lol',
        },
        {
            role: 'agent',
            text: 'You\'re so welcome! I\'m thrilled I could help you create a clear plan for your consulting website. You\'ve got all the pieces you need:\n\n✅ **Contact form** - Professional communication\n✅ **Calendly booking** - Streamlined scheduling\n✅ **Upgrade path** - Room to grow when needed\n✅ **Additional features** - To enhance your professional presence\n\n**Remember:**\n• Start simple with the contact form and free Calendly\n• Test everything before going live\n• You can always add features as your business grows\n• Don\'t hesitate to reach out if you run into any setup questions\n\n**Quick tip:** Once you get the contact form and Calendly working, focus on creating great content for your About and Services pages. That\'s what will really convert visitors into clients!\n\nBest of luck with your consulting business! Your professional website setup is going to make a great impression on potential clients. 🚀',
            meta: {
                thinkingTime: 2222,
                sources: [
                    {
                        name: 'Customer success',
                        description: 'Best practices for helping clients succeed with their websites',
                    },
                ],
                classifiers: [
                    {
                        name: 'Inquiry type',
                        description: 'Help',
                    },
                    {
                        name: 'Is legal inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is wpengine inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is ai data sharing question',
                        description: 'False',
                    },
                    {
                        name: 'Is very frustrated with wordpress com',
                        description: 'False',
                    },
                    {
                        name: 'Language',
                        description: 'En',
                    },
                    {
                        name: 'Product',
                        description: 'WordPress.com',
                    },
                    {
                        name: 'Category',
                        description: 'Customer success and support',
                    },
                ],
            },
        },
    ],
    26: [
        {
            role: 'user',
            text: 'I have a custom domain and want email like info@mydomain.com. How do I set this up?',
        },
        {
            role: 'agent',
            text: "Great question! Professional email with your custom domain is definitely possible. Here are your options:\n\n**Email Forwarding (included with domain):**\nIf you purchased your domain through WordPress.com, you get 3 free email forwards. Go to Domains → your domain → Email and set up forwards like:\n• info@yourdomain.com → your-gmail@gmail.com\n• hello@yourdomain.com → your-personal-email@example.com\n\n**Professional Email Services:**\nFor full email hosting (not just forwarding), you'll need a third-party service:\n• **G Suite/Google Workspace** - Professional Gmail with your domain\n• **Microsoft 365** - Outlook with your domain\n• **Titan Email** - Available through some domain providers\n\n**Setting up G Suite:**\nYou can integrate G Suite with WordPress.com by updating your domain's MX records in your DNS settings.\n\nWould you like me to walk you through setting up email forwarding, or are you interested in full email hosting with G Suite?",
            meta: {
                thinkingTime: 3789,
                sources: [
                    {
                        name: 'Email forwarding',
                        description:
                            'How to set up email forwarding with your domain',
                    },
                    {
                        name: 'Professional email setup',
                        description: 'Integrating third-party email services',
                    },
                ],
                classifiers: [
                    {
                        name: 'Inquiry type',
                        description: 'Help',
                    },
                    {
                        name: 'Is legal inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is wpengine inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is ai data sharing question',
                        description: 'False',
                    },
                    {
                        name: 'Is very frustrated with wordpress com',
                        description: 'False',
                    },
                    {
                        name: 'Language',
                        description: 'En',
                    },
                    {
                        name: 'Product',
                        description: 'WordPress.com',
                    },
                    {
                        name: 'Category',
                        description: 'Domains',
                    },
                ],
            },
        },
    ],
    27: [
        {
            role: 'user',
            text: 'I want to move my old WordPress blog to WordPress.com. How do I transfer all my posts and pages?',
        },
        {
            role: 'agent',
            text: 'I\'ll help you migrate your content to WordPress.com! The process depends on where your current site is hosted:\n\n**For WordPress.org (self-hosted) sites:**\n1. Go to Tools → Import in your WordPress.com dashboard\n2. Choose "WordPress" and follow the prompts\n3. Export your content from your old site (Tools → Export)\n4. Upload the export file to WordPress.com\n\n**What transfers:**\n• Posts and pages (including content, titles, dates)\n• Comments\n• Categories and tags\n• Featured images\n\n**What may need manual setup:**\n• Theme and customizations\n• Plugins (many aren\'t available on WordPress.com)\n• Widgets and menus\n• Custom post types (Business plan required)\n\n**For other platforms:**\nWe have importers for Blogger, Medium, Tumblr, and others under Tools → Import.\n\n**Important:** Test the import process first! You can always delete the imported content and try again if needed.\n\nWhat platform is your current site on? I can provide more specific guidance!',
            meta: {
                thinkingTime: 6543,
                sources: [
                    {
                        name: 'Importing content',
                        description:
                            'How to import from WordPress and other platforms',
                    },
                    {
                        name: 'Site migration guide',
                        description:
                            'Complete guide to moving your site to WordPress.com',
                    },
                ],
                classifiers: [
                    {
                        name: 'Inquiry type',
                        description: 'Help',
                    },
                    {
                        name: 'Is legal inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is wpengine inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is ai data sharing question',
                        description: 'False',
                    },
                    {
                        name: 'Is very frustrated with wordpress com',
                        description: 'False',
                    },
                    {
                        name: 'Language',
                        description: 'En',
                    },
                    {
                        name: 'Product',
                        description: 'WordPress.com',
                    },
                    {
                        name: 'Category',
                        description: 'Site management and migration',
                    },
                ],
            },
        },
    ],
    28: [
        {
            role: 'user',
            text: "I keep getting an error that I've reached my storage limit. I can't upload any more photos to my wildlife photography blog.",
        },
        {
            role: 'agent',
            text: "I understand how frustrating that must be for a photography blog! Let me help you understand your storage options:\n\n**Current storage limits:**\n• Free plan: 3GB\n• Personal plan: 6GB\n• Premium plan: 13GB\n• Business plan: 200GB\n• Commerce plan: 200GB\n\n**To check your current usage:**\nGo to your dashboard → Settings → General and look for the storage meter.\n\n**Ways to free up space:**\n• Delete unused media files (Media → Library)\n• Optimize image sizes before uploading\n• Remove duplicate images\n• Consider using external galleries (like Flickr embeds)\n\n**For photography sites, I recommend:**\n• **Premium plan** for more storage and better media tools\n• **Business plan** if you need lots of high-res images\n• Using WordPress.com's automatic image optimization\n\nWould you like me to help you check which files are using the most space, or would you prefer to discuss upgrading your plan?",
            meta: {
                thinkingTime: 4567,
                sources: [
                    {
                        name: 'Storage limits',
                        description:
                            'Storage allowances by plan and how to manage space',
                    },
                    {
                        name: 'Managing media files',
                        description:
                            'How to optimize and organize your media library',
                    },
                ],
                classifiers: [
                    {
                        name: 'Inquiry type',
                        description: 'Help',
                    },
                    {
                        name: 'Is legal inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is wpengine inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is ai data sharing question',
                        description: 'False',
                    },
                    {
                        name: 'Is very frustrated with wordpress com',
                        description: 'False',
                    },
                    {
                        name: 'Language',
                        description: 'En',
                    },
                    {
                        name: 'Product',
                        description: 'WordPress.com',
                    },
                    {
                        name: 'Category',
                        description: 'Site management and storage',
                    },
                ],
            },
        },
    ],
    29: [
        {
            role: 'user',
            text: "Do I need to install an SSL certificate for my site? I want to make sure it's secure and shows https://",
        },
        {
            role: 'agent',
            text: "Great news! SSL certificates are automatically included and managed for all WordPress.com sites - you don't need to do anything!\n\n**What this means:**\n• Your site automatically uses HTTPS (secure connection)\n• SSL certificates are installed and renewed automatically\n• Visitors see the padlock icon in their browser\n• No additional cost or setup required\n\n**For custom domains:**\nWhen you connect a custom domain, WordPress.com automatically provides and maintains the SSL certificate for that domain too.\n\n**Additional security features:**\n• Automatic security updates\n• DDoS protection\n• Malware scanning\n• Secure login (two-factor authentication available)\n\n**To verify your SSL is working:**\nVisit your site with https:// - you should see a padlock icon in the address bar.\n\n**Forcing HTTPS:**\nIf you want to ensure all visitors use the secure version, this is handled automatically on WordPress.com.\n\nIs there a specific security concern you'd like me to address, or are you seeing any SSL-related errors?",
            meta: {
                thinkingTime: 3456,
                sources: [
                    {
                        name: 'SSL certificates',
                        description: 'Automatic SSL and HTTPS on WordPress.com',
                    },
                    {
                        name: 'Site security',
                        description: 'Security features and best practices',
                    },
                ],
                classifiers: [
                    {
                        name: 'Inquiry type',
                        description: 'Help',
                    },
                    {
                        name: 'Is legal inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is wpengine inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is ai data sharing question',
                        description: 'False',
                    },
                    {
                        name: 'Is very frustrated with wordpress com',
                        description: 'False',
                    },
                    {
                        name: 'Language',
                        description: 'En',
                    },
                    {
                        name: 'Product',
                        description: 'WordPress.com',
                    },
                    {
                        name: 'Category',
                        description: 'Security and SSL',
                    },
                ],
            },
        },
    ],
    30: [
        {
            role: 'user',
            text: 'How can I connect my Instagram and Twitter accounts to my blog? I want posts to automatically share and want social buttons on my site.',
        },
        {
            role: 'agent',
            text: 'I\'ll help you set up social media integration! WordPress.com offers several ways to connect with social platforms:\n\n**Auto-sharing posts to social media:**\n1. Go to Marketing → Connections in your dashboard\n2. Connect your Twitter, Facebook, LinkedIn, and Tumblr accounts\n3. Choose which post types to auto-share\n4. Customize sharing messages and timing\n\n**Adding social sharing buttons:**\n• Use the "Social Icons" block in posts/pages\n• Add sharing buttons via Appearance → Customize → Widgets\n• Jetpack includes additional sharing options\n\n**Instagram integration:**\n• Use the Instagram block to embed posts\n• Add your Instagram widget to sidebars\n• Link to your Instagram profile in social menus\n\n**Note:** Instagram doesn\'t support auto-sharing like Twitter/Facebook, but you can embed individual posts.\n\n**Social features by plan:**\n• All plans: Basic social sharing and embeds\n• Premium+: Advanced social media tools\n• Business+: Full Jetpack Social features\n\nWould you like me to walk you through connecting a specific social media account, or help you add sharing buttons to your site?',
            meta: {
                thinkingTime: 5678,
                sources: [
                    {
                        name: 'Social media integration',
                        description:
                            'How to connect and share to social platforms',
                    },
                    {
                        name: 'Jetpack Social features',
                        description:
                            'Advanced social media tools and auto-sharing',
                    },
                ],
                classifiers: [
                    {
                        name: 'Inquiry type',
                        description: 'Help',
                    },
                    {
                        name: 'Is legal inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is wpengine inquiry',
                        description: 'False',
                    },
                    {
                        name: 'Is ai data sharing question',
                        description: 'False',
                    },
                    {
                        name: 'Is very frustrated with wordpress com',
                        description: 'False',
                    },
                    {
                        name: 'Language',
                        description: 'En',
                    },
                    {
                        name: 'Product',
                        description: 'WordPress.com',
                    },
                    {
                        name: 'Category',
                        description: 'Social media and sharing',
                    },
                ],
            },
        },
    ],
};
