import { tools } from './tools.js';

export const agents = [
    {
        id: 1,
        title: 'WP.com Support Chat',
        description: 'Answering customer questions in realtime',
        owner: 'Team HAL',
        ownerIcon: 'icon-teamhal.png',
        tags: [
            'wordpress.com',
            'chat',
            'support',
            'customer-service',
            'wapuu',
            'realtime',
            'troubleshooting',
        ],
        tools: [
            { ...tools.find((t) => t.id === 4), subtitle: 'WordPress.com' },
            { ...tools.find((t) => t.id === 3), subtitle: 'Wappu' },
            { ...tools.find((t) => t.id === 6) },
            { ...tools.find((t) => t.id === 5) },
            {
                ...tools.find((t) => t.id === 7),
                subtitle: 'support.wordpress.com',
            },
        ],
        stats: {
            totalConversations: 1247,
            qualityScore: 4.6,
            flagRate: 2.3,
            correctionPercentage: 8.7,
            avgResponseTime: 45, // seconds
            escalationRate: 12.4,
            agentVersion: '2.1.3',
            satisfactionRating: 4.5,
            resolutionRate: 87.2,
            firstContactResolution: 72.8,
            uptime: 99.2,
            commonFeedbackThemes: [
                'Helpful and friendly',
                'Quick response time',
                'Sometimes needs human escalation',
                'Good at finding relevant articles',
            ],
            performanceTrend: 'improving',
            lastUpdated: '2024-06-10T14:30:00Z',
        },
        instructions: `
        You are a helpful support agent for WordPress.com. Use [tool title="Persona" value="Wappuu"] for all responses.
        Review the [tool title="User Profile"] and [tool title="Support History"] to learn about the user and their past support interactions. Prioritize recent interactions and use this context in response if needed.
        Review the [tool title="Chat"] to see the user's previous messages and use this context in your response.
        If the user is asking about a specific issue, use the [tool title="Reference" value="support.wordpress.com"] tool to find the most relevant support article.
        If you don't have the information to answer the user's question, say you don't know and escalate to a human agent.
        Be friendly, concise, and professional in all responses.
    `,
        conversationIds: [
            1, 2, 3, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 40, 41, 42, 43, 44, 45,
        ],
        trigger: 'chat-message',
        previewEvents: [
            {
                question:
                    "Hi, I'm Wappuu, an AI helper for WordPress.com. How can I help you today?",
            },
            {
                loading: 'Reviewing your question...',
                done: 'Found a relevant support article',
                delay: 1200,
            },
            {
                loading: 'Reviewing your profile and support history...',
                done: 'Reviewed profile and recent support history.',
                delay: 1000,
            },
            {
                loading: 'Reviewing chat history...',
                done: 'No relevant chat history found.',
                delay: 1000,
            },
            {
                loading: 'Wappuu is composing response...',
                done: 'Response ready.',
                delay: 1000,
            },
            {
                question:
                    'Oh no! That\'s no good. But I can help you with that. \n\nI\'ve found a few articles that might help you. \n\n[tool title="Reference" value="support.wordpress.com"]\n\nBasically, you need to find the "reset password" link and check your email for a new message.\n\nHopefully this helps. Are you able to reset you password?',
            },
        ],
    },
    {
        id: 2,
        title: 'Tumblr Email Triage',
        description: 'First-line email triage for help@tumblr.com',
        owner: 'Team HAL',
        ownerIcon: 'icon-teamhal.png',
        tags: [
            'tumblr',
            'email',
            'triage',
            'support',
            'zendesk',
            'first-line',
            'automation',
        ],
        tools: [
            { ...tools.find((t) => t.id === 11) },
            { ...tools.find((t) => t.id === 8), subtitle: 'help@tumblr.com' },
            { ...tools.find((t) => t.id === 3), subtitle: 'TumblrBot' },
            { ...tools.find((t) => t.id === 6) },
            { ...tools.find((t) => t.id === 5) },
            {
                ...tools.find((t) => t.id === 7),
                subtitle: 'support.tumblr.com',
            },
        ],
        stats: {
            totalConversations: 892,
            qualityScore: 4.2,
            flagRate: 3.1,
            correctionPercentage: 11.2,
            avgResponseTime: 180, // seconds (3 minutes)
            escalationRate: 18.7,
            agentVersion: '1.8.9',
            satisfactionRating: 4.1,
            resolutionRate: 79.3,
            firstContactResolution: 65.4,
            uptime: 98.7,
            commonFeedbackThemes: [
                'Good at categorizing issues',
                'Sometimes too robotic',
                'Needs better context understanding',
                'Fast triage processing',
            ],
            performanceTrend: 'stable',
            lastUpdated: '2024-06-09T16:45:00Z',
        },
        instructions: `
    You are a helpful support agent for Tumblr.com. Use [tool title="Persona" value="TumblrBot"] for all responses.
    Review the [tool title="Email" value="help@tumblr.com"] to see the user's email and use this context in your response.
    If the user is asking about a specific issue, use the [tool title="Reference" value="support.tumblr.com"] tool to find the most relevant support article.
    If you don't have the information to answer the user's question, say you don't know and escalate to a human agent.
    Be friendly, concise, and professional in all responses.
    `,
        conversationIds: [4, 5, 6],
        trigger: 'email-message',
        previewEvents: [
            {
                loading: 'Connecting to email...',
                done: 'Connected to email',
                delay: 1000,
            },
        ],
    },

    {
        id: 4,
        title: 'Big Sky',
        description: 'Designing beautiful sites for WordPress.com',
        owner: 'Team HAL',
        ownerIcon: 'icon-teamhal.png',
        tags: [
            'wordpress.com',
            'design',
            'html',
            'blocks',
            'parsing',
            'sites',
            'frontend',
            'development',
        ],
        tools: [
            { ...tools.find((t) => t.id === 10), subtitle: 'HTML' },
            { ...tools.find((t) => t.id === 10), subtitle: 'Requested block' },
        ],
        stats: {
            totalConversations: 423,
            qualityScore: 4.4,
            flagRate: 4.7,
            correctionPercentage: 14.8,
            avgResponseTime: 12, // seconds
            escalationRate: 5.2,
            agentVersion: '1.4.7',
            satisfactionRating: 4.3,
            resolutionRate: 91.5,
            firstContactResolution: 88.9,
            uptime: 99.1,
            commonFeedbackThemes: [
                'Great at parsing HTML',
                'Handles malformed code well',
                'Could be better with edge cases',
                'Fast and accurate results',
            ],
            performanceTrend: 'improving',
            lastUpdated: '2024-06-10T15:15:00Z',
        },
        instructions: `
    You are a helpful designer for WordPress.com. Use [tool title="Input" value="HTML"] to parse the HTML and [tool title="Input" value="Requested block"] to search for the block that matches the requested name.
    If found, return the block's HTML. If not found, reply with a helpful error message.
    Be robust to malformed HTML and ambiguous block names.
    Be friendly, concise, and professional in all responses.
    `,
        conversationIds: [10, 11, 12],
        trigger: 'on-demand',
        previewEvents: [
            { loading: 'Parsing HTML...', done: 'Block found', delay: 1000 },
        ],
    },

    {
        id: 6,
        title: 'Agent Dave',
        description:
            'A Slack chatbot for searching, finding insights, and locating DRIs across many P2 sites.',
        owner: '@apeatling',
        ownerIcon: 'avatar-apeatling.png',
        tags: [
            'slack',
            'p2',
            'search',
            'dri',
            'chatbot',
            'insights',
            'information-retrieval',
            'workplace',
        ],
        tools: [
            { ...tools.find((t) => t.id === 1), subtitle: 'Chat' },
            { ...tools.find((t) => t.id === 12), subtitle: 'Work Sites' },
        ],
        stats: {
            totalConversations: 1834,
            qualityScore: 4.7,
            flagRate: 1.8,
            correctionPercentage: 6.2,
            avgResponseTime: 28, // seconds
            escalationRate: 7.9,
            agentVersion: '4.1.2',
            satisfactionRating: 4.6,
            resolutionRate: 92.1,
            firstContactResolution: 85.7,
            uptime: 99.6,
            commonFeedbackThemes: [
                'Excellent at finding the right person',
                'Very knowledgeable about P2 content',
                'Saves time on information searches',
                'Great contextual understanding',
            ],
            performanceTrend: 'excellent',
            lastUpdated: '2024-06-12T09:15:00Z',
        },
        instructions: `
    You are Agent Dave, a helpful Slack chatbot with access to many P2 work sites. Use [tool title="Slack"] to chat with users and [tool title="P2" value="Work Sites"] to search for information, find insights, and locate DRIs (Directly Responsible Individuals) for projects.
    When a user asks a question, search relevant P2s for answers, summaries, or the right person to contact. If you can't find the answer, suggest where the user might look or who to ask next.
    Be concise, resourceful, and friendly. Always cite the P2 or Slack source for your information.
    `,
        conversationIds: [16, 17, 18],
        trigger: 'slack-message',
        previewEvents: [
            {
                loading: 'Searching P2 sites...',
                done: 'Found DRI',
                delay: 1000,
            },
        ],
    },

    {
        id: 7,
        title: 'Blogger',
        description: 'Planning, writing, and scheduling blog posts on any topic for WordPress sites',
        owner: '@shaunandrews',
        ownerIcon: 'avatar-shaunandrews.png',
        tags: [
            'wordpress.com',
            'blogging',
            'content-creation',
            'scheduling',
            'writing-assistant',
            'content-strategy',
            'seo',
        ],
        tools: [
            { ...tools.find((t) => t.id === 4), subtitle: 'Content Planning' },
            { ...tools.find((t) => t.id === 6) },
            { ...tools.find((t) => t.id === 7), subtitle: 'WordPress.com Blog Guidelines' },
            { ...tools.find((t) => t.id === 2), subtitle: 'Post Scheduling' },
        ],
        stats: {
            totalConversations: 756,
            qualityScore: 4.5,
            flagRate: 1.2,
            correctionPercentage: 5.8,
            avgResponseTime: 35, // seconds
            escalationRate: 3.1,
            agentVersion: '3.2.1',
            satisfactionRating: 4.7,
            resolutionRate: 94.3,
            firstContactResolution: 89.2,
            uptime: 99.8,
            commonFeedbackThemes: [
                'Great content suggestions',
                'Helpful with SEO optimization',
                'Good at understanding audience',
                'Sometimes too verbose',
            ],
            performanceTrend: 'excellent',
            lastUpdated: '2024-06-11T10:30:00Z',
        },
        instructions: `
        You are a helpful content creation assistant for WordPress bloggers. Use [tool title="Chat"] to understand the user's content needs and goals.
        Review the [tool title="User Profile"] to understand their niche, audience, and previous content.
        Use [tool title="Reference" value="WordPress.com Blog Guidelines"] to ensure content follows best practices.
        Help users with:
        - Blog post ideas and content planning
        - Writing assistance and editing suggestions
        - SEO optimization tips
        - Content scheduling strategies
        - Audience engagement tactics
        
        If scheduling posts, use [tool title="Calendar" value="Post Scheduling"] to help plan publication dates.
        Be creative, encouraging, and provide actionable content advice.
        Keep suggestions practical and tailored to their specific niche and audience.
        `,
        conversationIds: [31, 32, 33],
        trigger: 'content-request',
        previewEvents: [
            {
                question: "Hi! I'm here to help you create amazing blog content. What kind of post are you thinking about writing?",
            },
            {
                loading: 'Analyzing your blog and audience...',
                done: 'Found insights about your content style',
                delay: 1500,
            },
            {
                loading: 'Generating content ideas...',
                done: 'Created 5 post ideas for your niche',
                delay: 1200,
            },
            {
                loading: 'Checking SEO best practices...',
                done: 'SEO recommendations ready',
                delay: 800,
            },
            {
                question: 'I\'ve got some great ideas for you! Based on your travel blog, here are 5 trending topics:\n\n1. "Hidden Gems in [Your Recent Destination]"\n2. "Budget Travel Hacks You Haven\'t Heard"\n3. "Sustainable Tourism: How to Travel Responsibly"\n4. "Local Food Experiences Worth the Trip"\n5. "Travel Photography Tips for Beginners"\n\nWhich topic interests you most, or would you like me to dive deeper into any of these?',
            },
        ],
    },
    
    {
        id: 8,
        title: 'WP.com Forums',
        description: 'Moderation and FAQ assistance for WordPress.com support forums',
        owner: 'Team Lighthouse',
        ownerIcon: 'icon-teamlighthouse.png',
        tags: [
            'wordpress.com',
            'forums',
            'moderation',
            'community',
            'faq',
            'support',
            'user-management',
        ],
        tools: [
            { ...tools.find((t) => t.id === 6) },
            { ...tools.find((t) => t.id === 5) },
            { ...tools.find((t) => t.id === 7), subtitle: 'support.wordpress.com' },
            { ...tools.find((t) => t.id === 9), subtitle: 'Community Team' },
        ],
        stats: {
            totalConversations: 2134,
            qualityScore: 4.3,
            flagRate: 0.8,
            correctionPercentage: 3.2,
            avgResponseTime: 15, // seconds
            escalationRate: 8.7,
            agentVersion: '2.8.4',
            satisfactionRating: 4.4,
            resolutionRate: 88.9,
            firstContactResolution: 82.1,
            uptime: 99.7,
            commonFeedbackThemes: [
                'Quick and accurate responses',
                'Good at finding duplicate topics',
                'Helpful with forum navigation',
                'Sometimes misses context',
            ],
            performanceTrend: 'stable',
            lastUpdated: '2024-06-10T18:20:00Z',
        },
        instructions: `
        You are a WordPress.com community forum moderator and FAQ assistant. Use [tool title="User Profile"] to understand user account status and history.
        Review [tool title="Support History"] to check for previous forum interactions or violations.
        Use [tool title="Reference" value="support.wordpress.com"] to find accurate answers to common questions.
        
        Your responsibilities include:
        - Answering frequently asked questions about WordPress.com
        - Moderating forum posts for spam, inappropriate content, or duplicates
        - Directing users to existing solutions or documentation
        - Escalating complex technical issues using [tool title="Linear" value="Community Team"]
        
        Be helpful, patient, and maintain community guidelines. 
        For duplicate topics, politely redirect to existing discussions.
        For policy violations, follow moderation protocols consistently.
        Always cite official documentation when providing technical answers.
        `,
        conversationIds: [34, 35, 36],
        trigger: 'forum-post',
        previewEvents: [
            {
                loading: 'Reviewing forum post...',
                done: 'Post scanned for policy compliance',
                delay: 800,
            },
            {
                loading: 'Checking for duplicate topics...',
                done: 'Found 2 similar discussions',
                delay: 1000,
            },
            {
                loading: 'Looking up official documentation...',
                done: 'Found relevant support article',
                delay: 1200,
            },
        ],
    },

    {
        id: 9,
        title: 'Jetpack Chat',
        description: 'Customer support for all Jetpack plugins and features',
        owner: 'Team HAL',
        ownerIcon: 'icon-teamhal.png',
        tags: [
            'jetpack',
            'plugins',
            'security',
            'performance',
            'backup',
            'customer-support',
            'troubleshooting',
        ],
        tools: [
            { ...tools.find((t) => t.id === 4), subtitle: 'Jetpack Support' },
            { ...tools.find((t) => t.id === 6) },
            { ...tools.find((t) => t.id === 5) },
            { ...tools.find((t) => t.id === 7), subtitle: 'jetpack.com/support' },
            { ...tools.find((t) => t.id === 9), subtitle: 'Jetpack Team' },
        ],
        stats: {
            totalConversations: 1563,
            qualityScore: 4.6,
            flagRate: 2.1,
            correctionPercentage: 7.4,
            avgResponseTime: 52, // seconds
            escalationRate: 14.2,
            agentVersion: '1.9.7',
            satisfactionRating: 4.5,
            resolutionRate: 85.7,
            firstContactResolution: 71.3,
            uptime: 99.4,
            commonFeedbackThemes: [
                'Knowledgeable about Jetpack features',
                'Good at diagnosing plugin conflicts',
                'Sometimes needs technical escalation',
                'Helpful troubleshooting steps',
            ],
            performanceTrend: 'improving',
            lastUpdated: '2024-06-11T13:45:00Z',
        },
        instructions: `
        You are a Jetpack support specialist helping customers with all Jetpack plugins and features. Use [tool title="Chat" value="Jetpack Support"] to communicate with users.
        Review [tool title="User Profile"] and [tool title="Support History"] to understand their Jetpack setup and previous issues.
        Use [tool title="Reference" value="jetpack.com/support"] to find official documentation and troubleshooting guides.
        
        You help with:
        - Jetpack plugin installation and configuration
        - Security features (malware scanning, brute force protection)
        - Performance optimization (Site Accelerator, lazy loading)
        - Backup and restore functionality
        - Social media automation and sharing
        - Analytics and search features
        - Plugin conflicts and troubleshooting
        
        If issues require development team attention, escalate using [tool title="Linear" value="Jetpack Team"].
        Always provide step-by-step instructions and verify Jetpack plan limitations.
        Be patient with non-technical users and explain features clearly.
        `,
        conversationIds: [37, 38, 39],
        trigger: 'jetpack-inquiry',
        previewEvents: [
            {
                question: "Hi! I'm here to help with any Jetpack questions or issues. What can I assist you with today?",
            },
            {
                loading: 'Checking your Jetpack connection...',
                done: 'Jetpack status verified',
                delay: 1000,
            },
            {
                loading: 'Reviewing your active features...',
                done: 'Found 8 active Jetpack features',
                delay: 1200,
            },
            {
                loading: 'Searching knowledge base...',
                done: 'Found relevant troubleshooting guide',
                delay: 900,
            },
            {
                question: 'I can see your Jetpack is connected and running well! You have security monitoring, backups, and performance features active. \n\nHow can I help you get the most out of Jetpack? Are you experiencing any issues or looking to set up additional features?',
            },
        ],
    },
];
