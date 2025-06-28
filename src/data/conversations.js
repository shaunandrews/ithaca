export const conversations = [
    {
        id: 1,
        agentId: 1,
        datetime: '2025-06-28T14:12:00Z',
        event: 'Troubleshooting login issue',
        customer: 'koalababy3@gmail.com',
        summary:
            'Reviewed support history and provided a fix for a recurring login issue. Sent a link to the support article.',
        quote: "...still having trouble logging in",
        sentiment: 5, // frown
        tags: [
            'login',
            'troubleshooting',
            'support-history',
            'password-reset',
            'cookies',
        ],
    },
    {
        id: 2,
        agentId: 1,
        datetime: '2025-06-28T14:05:00Z',
        event: 'Header Navigation Not Clickable After Edit',
        customer: 'shaun@shaunandrews.com',
        summary:
            'Customer edited their site header and navigation links became unclickable. Troubleshooting steps like checking for overlapping or invisible blocks did not help. The customer asked about undoing changes but learned that full site restores require a Business plan. The agent explained that header template revisions are available and offered further instructions if needed.',
        quote: "...can't click any of the pages",
        sentiment: 5, // frown
        tags: [
            'header',
            'navigation',
            'template-editing',
            'revisions',
            'gutenberg',
            'troubleshooting',
            'site-editor',
        ],
    },
    {
        id: 3,
        agentId: 1,
        datetime: '2025-06-28T12:30:00Z',
        event: 'Charged twice',
        customer: 'cain@automattic.com',
        summary:
            'Customer appears to have accidentally created two sites. Requested confirmation about new site before refunding and cancelling the subscription.',
        quote: "...charged twice...need a refund",
        sentiment: 6, // angry
        tags: [
            'billing',
            'refund',
            'duplicate-charge',
            'account-management',
            'subscription',
        ],
    },
    {
        id: 4,
        agentId: 2,
        datetime: '2025-06-28T10:00:00Z',
        event: 'New email received',
        customer: 'shaun@shaunandrews.com',
        summary:
            'Triaged a user email about password reset. Sent automated response with instructions and flagged for follow-up.',
        quote: "...help me reset my password",
        sentiment: 3, // meh
        tags: ['password-reset', 'tumblr', 'account-access', 'email-triage'],
    },
    {
        id: 5,
        agentId: 2,
        datetime: '2025-06-27T16:20:00Z',
        event: 'Reference lookup',
        customer: 'tumblruser@example.com',
        summary:
            'Provided a support article link for a user asking about Tumblr blog customization.',
        quote: "How do I customize...?",
        sentiment: 2, // smile
        tags: ['theme-customization', 'tumblr', 'design', 'support-articles'],
    },
    {
        id: 6,
        agentId: 2,
        datetime: '2025-06-27T11:05:00Z',
        event: 'Escalation',
        customer: 'techsupport@tumblr.com',
        summary:
            'Escalated a technical issue to a human agent after automated troubleshooting failed.',
        quote: "Something went wrong...",
        sentiment: 4, // annoyed
        tags: [
            'escalation',
            'account-issue',
            'tumblr',
            'technical-support',
            'human-handoff',
        ],
    },
    {
        id: 10,
        agentId: 4,
        datetime: '2025-06-28T08:00:00Z',
        event: 'Creating a new site',
        customer: 'developer@wordpress.org',
        summary:
            'A new customer wants a site for their coffee shop. They have an Instagram account and want a site that matches the look and feel of their account.',
        quote: "...find the cover block...",
        sentiment: 3, // meh
        tags: [
            'html-parsing',
            'code-analysis',
            'cover-block',
            'development',
            'wordpress-blocks',
        ],
    },
    {
        id: 11,
        agentId: 4,
        datetime: '2025-06-27T12:10:00Z',
        event: 'Block customization',
        customer: 'designer@example.com',
        summary:
            'Client requested custom styling for their portfolio gallery. Needed to modify the grid layout and add hover effects to match their brand colors.',
        quote: "Find the gallery block",
        sentiment: 3, // meh
        tags: [
            'html-parsing',
            'gallery-block',
            'code-analysis',
            'development',
            'portfolio',
        ],
    },
    {
        id: 12,
        agentId: 4,
        datetime: '2025-06-26T10:45:00Z',
        event: 'Layout optimization',
        customer: 'frontend@startup.com',
        summary:
            'Startup needed responsive design improvements for their landing page. Optimized mobile layout and fixed spacing issues across different screen sizes.',
        quote: "...messy HTML...",
        sentiment: 3, // meh
        tags: [
            'html-parsing',
            'heading',
            'code-analysis',
            'development',
            'responsive-design',
        ],
    },
    {
        id: 16,
        agentId: 6,
        datetime: '2025-06-26T09:00:00Z',
        event: 'Slack message',
        customer: 'new.employee@automattic.com',
        summary:
            'Helped a user find the DRI for a new project by searching P2 sites.',
        quote: "Who is the DRI...?",
        sentiment: 3, // meh
        tags: [
            'project-management',
            'p2',
            'dri',
            'information-retrieval',
            'slack',
        ],
    },
    {
        id: 17,
        agentId: 6,
        datetime: '2025-06-25T16:30:00Z',
        event: 'Insight search',
        customer: 'product.manager@automattic.com',
        summary:
            'Provided a summary of recent discussions about a product launch from multiple P2s.',
        quote: "...about the product launch?",
        sentiment: 3, // meh
        tags: [
            'product-launch',
            'p2',
            'summarization',
            'information-retrieval',
            'insights',
        ],
    },
    {
        id: 18,
        agentId: 6,
        datetime: '2025-06-25T14:45:00Z',
        event: 'Resource location',
        customer: 'hr.team@automattic.com',
        summary:
            'Directed a user to the correct P2 for onboarding documentation.',
        quote: "Where can I find...docs?",
        sentiment: 3, // meh
        tags: [
            'onboarding',
            'documentation',
            'p2',
            'information-retrieval',
            'hr',
        ],
    },
    {
        id: 19,
        agentId: 1,
        datetime: '2025-06-24T10:30:00Z',
        event: 'Domain connection issues',
        customer: 'webmaster@example.com',
        summary:
            'Customer having trouble connecting their custom domain to WordPress.com. Walked through DNS settings and provided nameserver configuration steps.',
        quote: "...domain...not working...",
        sentiment: 4, // annoyed
        tags: [
            'domain-connection',
            'dns',
            'nameservers',
            'technical-setup',
            'godaddy',
        ],
    },
    {
        id: 20,
        agentId: 1,
        datetime: '2025-06-24T14:15:00Z',
        event: 'Comment moderation help',
        customer: 'blogger@lifestyle.com',
        summary:
            'Customer needed help setting up comment moderation and dealing with spam comments. Explained moderation settings and recommended Akismet.',
        quote: "...keep getting spam comments...",
        sentiment: 4, // annoyed
        tags: [
            'comments',
            'moderation',
            'spam',
            'akismet',
            'settings',
            'blog-management',
        ],
    },
    {
        id: 21,
        agentId: 1,
        datetime: '2025-06-23T16:45:00Z',
        event: 'Publishing problems',
        customer: 'author@writingblog.com',
        summary:
            'Customer unable to publish posts, getting error messages. Identified browser cache issue and provided troubleshooting steps.',
        quote: "...can't publish...nothing happens",
        sentiment: 5, // frown
        tags: [
            'publishing',
            'editor-issues',
            'troubleshooting',
            'browser-cache',
            'connectivity',
        ],
    },
    {
        id: 22,
        agentId: 1,
        datetime: '2025-06-23T13:20:00Z',
        event: 'Theme customization',
        customer: 'creative@artportfolio.com',
        summary:
            'Customer wanted to customize their theme colors and fonts. Explained the difference between theme customization and site editing, provided guidance on both.',
        quote: "...don't know where to start",
        sentiment: 3, // meh
        tags: [
            'theme-customization',
            'colors',
            'fonts',
            'design',
            'global-styles',
            'customization',
        ],
    },
    {
        id: 23,
        agentId: 1,
        datetime: '2025-06-22T11:30:00Z',
        event: 'SEO and site visibility',
        customer: 'business@localbakery.com',
        summary:
            "Small business owner asking about SEO and why their site isn't showing up in Google searches. Provided SEO basics and site visibility settings.",
        quote: "...can't find it on Google...",
        sentiment: 4, // annoyed
        tags: [
            'seo',
            'google-search',
            'site-visibility',
            'search-console',
            'local-business',
            'indexing',
        ],
    },
    {
        id: 24,
        agentId: 1,
        datetime: '2025-06-22T15:00:00Z',
        event: 'Mobile responsiveness',
        customer: 'photographer@portraits.com',
        summary:
            'Customer concerned about how their photography site looks on mobile devices. Explained responsive design and provided mobile optimization tips.',
        quote: "...terrible on mobile phones",
        sentiment: 4, // annoyed
        tags: [
            'mobile',
            'responsive-design',
            'photography',
            'optimization',
            'mobile-preview',
        ],
    },
    {
        id: 25,
        agentId: 1,
        datetime: '2025-06-21T12:45:00Z',
        event: 'Plugin installation inquiry',
        customer: 'ecommerce@smallshop.com',
        summary:
            'Customer wanted to install specific plugins for their online store. Explained plugin limitations on different plans and suggested alternatives.',
        quote: "How do I install plugins?",
        sentiment: 3, // meh
        tags: [
            'plugins',
            'contact-forms',
            'booking-system',
            'plan-limitations',
            'ecommerce',
        ],
    },
    {
        id: 26,
        agentId: 1,
        datetime: '2025-06-21T09:15:00Z',
        event: 'Email forwarding setup',
        customer: 'professional@consultingfirm.com',
        summary:
            'Customer wanted to set up professional email with their domain. Explained email forwarding options and G Suite integration.',
        quote: "How do I set this up?",
        sentiment: 3, // meh
        tags: [
            'email',
            'domain',
            'forwarding',
            'g-suite',
            'professional-email',
            'mx-records',
        ],
    },
    {
        id: 27,
        agentId: 1,
        datetime: '2025-06-20T14:30:00Z',
        event: 'Site migration help',
        customer: 'migrating@olddomain.com',
        summary:
            "Customer wanted to import content from another WordPress site. Guided through the import process and explained what transfers and what doesn't.",
        quote: "How do I transfer...posts?",
        sentiment: 3, // meh
        tags: [
            'migration',
            'import',
            'content-transfer',
            'wordpress-org',
            'site-migration',
        ],
    },
    {
        id: 28,
        agentId: 1,
        datetime: '2025-06-20T16:20:00Z',
        event: 'Storage limit reached',
        customer: 'photographer@wildlife.com',
        summary:
            "Customer hit their storage limit and couldn't upload more photos. Explained storage limits by plan and provided optimization tips.",
        quote: "...reached my storage limit...",
        sentiment: 5, // frown
        tags: [
            'storage',
            'limits',
            'photography',
            'media-optimization',
            'plan-upgrade',
            'image-optimization',
        ],
    },
    {
        id: 29,
        agentId: 1,
        datetime: '2025-06-19T10:00:00Z',
        event: 'SSL certificate questions',
        customer: 'security@techstartup.com',
        summary:
            'Customer asking about HTTPS and SSL certificates for their site. Explained that SSL is automatic on WordPress.com and provided security best practices.',
        quote: "...want to make sure it's secure",
        sentiment: 2, // smile
        tags: [
            'ssl',
            'https',
            'security',
            'certificates',
            'encryption',
            'automatic-ssl',
        ],
    },
    {
        id: 30,
        agentId: 1,
        datetime: '2025-06-19T13:45:00Z',
        event: 'Social media integration',
        customer: 'marketing@brandagency.com',
        summary:
            'Customer wanted to connect their social media accounts and add sharing buttons. Provided guidance on social integrations and Jetpack Social features.',
        quote: "How can I connect...accounts?",
        sentiment: 3, // meh
        tags: [
            'social-media',
            'auto-sharing',
            'instagram',
            'twitter',
            'jetpack-social',
            'social-buttons',
        ],
    },
    {
        id: 31,
        agentId: 7,
        datetime: '2025-06-28T16:30:00Z',
        event: 'Blog content strategy session',
        customer: 'foodie@example.com',
        summary:
            'Helped a food blogger plan a series of seasonal recipe posts for summer. Created content calendar with SEO-optimized titles and scheduling recommendations.',
        quote: "...need ideas for summer content...",
        sentiment: 2, // smile
        tags: [
            'content-planning',
            'food-blog',
            'seasonal-content',
            'seo-optimization',
            'content-calendar',
        ],
    },
    {
        id: 32,
        agentId: 7,
        datetime: '2025-06-28T11:45:00Z',
        event: 'Writing assistance for travel blog',
        customer: 'wanderlust@travels.com',
        summary:
            'Provided writing guidance and structure improvements for a travel blog post about sustainable tourism. Suggested engaging headlines and call-to-action improvements.',
        quote: "How can I make this more engaging?",
        sentiment: 3, // meh
        tags: [
            'writing-assistance',
            'travel-blog',
            'sustainable-tourism',
            'engagement',
            'post-structure',
        ],
    },
    {
        id: 33,
        agentId: 7,
        datetime: '2025-06-27T14:20:00Z',
        event: 'SEO optimization consultation',
        customer: 'tech.blogger@startup.com',
        summary:
            'Reviewed a tech blog post and provided specific SEO recommendations including keyword optimization, meta descriptions, and internal linking strategies.',
        quote: "...not getting much traffic...",
        sentiment: 4, // annoyed
        tags: [
            'seo-optimization',
            'tech-blog',
            'keyword-research',
            'traffic-growth',
            'meta-descriptions',
        ],
    },
    {
        id: 34,
        agentId: 8,
        datetime: '2025-06-28T09:15:00Z',
        event: 'Forum spam moderation',
        customer: 'spammer@fake.com',
        summary:
            'Detected and removed multiple spam posts advertising unrelated services. User account flagged for review and temporary posting restrictions applied.',
        quote: "BUY CHEAP FOLLOWERS NOW!!!",
        sentiment: 6, // angry
        tags: [
            'spam-detection',
            'moderation',
            'account-restrictions',
            'community-guidelines',
            'automated-removal',
        ],
    },
    {
        id: 35,
        agentId: 8,
        datetime: '2025-06-28T12:00:00Z',
        event: 'FAQ response about custom domains',
        customer: 'newbie@wordpress.user',
        summary:
            'Answered common question about connecting custom domains to WordPress.com sites. Provided link to official documentation and step-by-step guidance.',
        quote: "How do I connect my domain?",
        sentiment: 3, // meh
        tags: [
            'faq-response',
            'custom-domains',
            'documentation',
            'beginner-help',
            'domain-connection',
        ],
    },
    {
        id: 36,
        agentId: 8,
        datetime: '2025-06-27T19:30:00Z',
        event: 'Duplicate topic redirect',
        customer: 'confused@user.com',
        summary:
            'User posted question about theme customization that had been addressed multiple times. Politely redirected to existing comprehensive discussion thread.',
        quote: "Why can't I change my theme colors?",
        sentiment: 3, // meh
        tags: [
            'duplicate-topic',
            'theme-customization',
            'forum-navigation',
            'existing-solutions',
            'community-management',
        ],
    },
    {
        id: 37,
        agentId: 9,
        datetime: '2025-06-28T15:45:00Z',
        event: 'Jetpack backup restoration',
        customer: 'businessowner@shop.com',
        summary:
            'Guided customer through restoring their WooCommerce site from a Jetpack backup after a plugin conflict caused issues. Explained backup scheduling options.',
        quote: "...site is completely broken...",
        sentiment: 5, // frown
        tags: [
            'backup-restoration',
            'woocommerce',
            'plugin-conflict',
            'site-recovery',
            'jetpack-backup',
        ],
    },
    {
        id: 38,
        agentId: 9,
        datetime: '2025-06-28T08:30:00Z',
        event: 'Jetpack security setup',
        customer: 'security.conscious@blogger.com',
        summary:
            'Helped configure Jetpack security features including brute force protection, malware scanning, and two-factor authentication. Explained security monitoring dashboard.',
        quote: "Want to secure my blog better",
        sentiment: 2, // smile
        tags: [
            'security-setup',
            'brute-force-protection',
            'malware-scanning',
            'two-factor-auth',
            'security-monitoring',
        ],
    },
    {
        id: 39,
        agentId: 9,
        datetime: '2025-06-27T13:10:00Z',
        event: 'Site performance optimization',
        customer: 'photographer@portfolio.com',
        summary:
            'Optimized image loading performance using Jetpack Site Accelerator and lazy loading features. Explained how these features improve page speed for photography sites.',
        quote: "...images loading very slowly...",
        sentiment: 4, // annoyed
        tags: [
            'performance-optimization',
            'site-accelerator',
            'lazy-loading',
            'image-optimization',
            'page-speed',
        ],
    },
    {
        id: 40,
        agentId: 1,
        datetime: '2025-06-18T09:30:00Z',
        event: 'Site backup and export',
        customer: 'business@localbakery.com',
        summary: 'Customer wanted to backup their site before making major changes. Explained WordPress.com export options and Jetpack backup features available by plan level.',
        quote: "How do I backup my entire site?",
        sentiment: 3, // meh
        tags: [
            'backup',
            'export',
            'site-management',
            'jetpack',
            'data-protection',
            'plan-features',
        ],
    },
    {
        id: 41,
        agentId: 1,
        datetime: '2025-06-18T15:45:00Z',
        event: 'Multiple user access setup',
        customer: 'team@designstudio.com',
        summary: 'Design agency needed to add multiple team members to manage their client site. Walked through user roles, permissions, and collaboration features available on different plans.',
        quote: "How can my team collaborate on this site?",
        sentiment: 2, // smile
        tags: [
            'user-management',
            'collaboration',
            'team-access',
            'user-roles',
            'permissions',
            'business-features',
        ],
    },
    {
        id: 42,
        agentId: 1,
        datetime: '2025-06-17T11:20:00Z',
        event: 'Site speed optimization',
        customer: 'ecommerce@onlinestore.com',
        summary: 'E-commerce site owner concerned about slow loading times affecting sales. Provided optimization tips including image compression, caching, and plan upgrade recommendations for better performance.',
        quote: "My site is too slow and customers are leaving",
        sentiment: 5, // frown
        tags: [
            'site-speed',
            'performance',
            'optimization',
            'ecommerce',
            'image-compression',
            'caching',
            'plan-upgrade',
        ],
    },
    {
        id: 43,
        agentId: 1,
        datetime: '2025-06-17T14:10:00Z',
        event: 'Custom CSS and styling help',
        customer: 'creative@artgallery.com',
        summary: 'Art gallery wanted to customize their site appearance beyond theme options. Explained CSS customization features, plan requirements, and provided basic styling guidance.',
        quote: "I want to change the font and add custom styles",
        sentiment: 3, // meh
        tags: [
            'custom-css',
            'styling',
            'theme-customization',
            'premium-features',
            'design',
            'fonts',
        ],
    },
    {
        id: 44,
        agentId: 1,
        datetime: '2025-06-16T10:15:00Z',
        event: 'E-commerce setup guidance',
        customer: 'startup@newbusiness.com',
        summary: 'New business owner wanted to sell products online. Explained WooCommerce integration, payment processing, plan requirements, and provided setup guidance for their online store.',
        quote: "How do I start selling products on my site?",
        sentiment: 2, // smile
        tags: [
            'ecommerce',
            'woocommerce',
            'online-store',
            'payment-processing',
            'business-plan',
            'product-sales',
        ],
    },
    {
        id: 45,
        agentId: 1,
        datetime: '2025-06-16T16:50:00Z',
        event: 'Site migration from competitor',
        customer: 'migrating@fromwix.com',
        summary: 'Customer wanted to move their existing website from Wix to WordPress.com. Explained migration options, content import limitations, and provided step-by-step guidance for the transition.',
        quote: "I want to move my Wix site to WordPress.com",
        sentiment: 3, // meh
        tags: [
            'migration',
            'wix-import',
            'platform-switch',
            'content-transfer',
            'site-transition',
            'import-limitations',
        ],
    },
];
