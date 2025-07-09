export const agentVersions = {
    1: [ // WP.com Support Chat
        {
            version: '2.1.3',
            releaseDate: '2024-06-10T14:30:00Z',
            author: 'Andy Peatling',
            authorIcon: 'avatar-apeatling.png',
            changeDescription: 'Improved escalation logic and added better context awareness for repeat customers',
            changes: [
                'Enhanced user profile analysis for better personalization',
                'Reduced escalation rate by 8.2%',
                'Added support for complex billing inquiries',
                'Improved response time by 12 seconds'
            ],
            isCurrent: true
        },
        {
            version: '2.1.2',
            releaseDate: '2024-05-28T11:20:00Z',
            author: 'Team HAL',
            authorIcon: 'icon-teamhal.png',
            changeDescription: 'Bug fixes and performance improvements',
            changes: [
                'Fixed issue with article recommendations',
                'Improved chat history parsing',
                'Better handling of multiple concurrent conversations'
            ],
            isCurrent: false
        },
        {
            version: '2.1.1',
            releaseDate: '2024-05-20T16:45:00Z',
            author: 'Shaun Andrews',
            authorIcon: 'avatar-shaunandrews.png',
            changeDescription: 'Added new support tools and improved Wapuu persona',
            changes: [
                'Integrated new support article search',
                'Enhanced Wapuu personality responses',
                'Added support for plugin-related questions',
                'Improved first-contact resolution rate'
            ],
            isCurrent: false
        },
        {
            version: '2.1.0',
            releaseDate: '2024-05-15T09:00:00Z',
            author: 'Andy Peatling',
            authorIcon: 'avatar-apeatling.png',
            changeDescription: 'Major update with new workflow engine and improved tools',
            changes: [
                'Migrated to new workflow engine',
                'Added real-time chat capabilities',
                'Improved troubleshooting tools',
                'Enhanced customer service protocols'
            ],
            isCurrent: false
        },
        {
            version: '2.0.8',
            releaseDate: '2024-04-30T13:15:00Z',
            author: 'Team HAL',
            authorIcon: 'icon-teamhal.png',
            changeDescription: 'Stability improvements and bug fixes',
            changes: [
                'Fixed memory leak in chat processing',
                'Improved error handling',
                'Better support for edge cases'
            ],
            isCurrent: false
        }
    ],
    2: [ // Tumblr Email Triage
        {
            version: '1.8.9',
            releaseDate: '2024-06-09T16:45:00Z',
            author: 'Shaun Andrews',
            authorIcon: 'avatar-shaunandrews.png',
            changeDescription: 'Enhanced email categorization and improved response templates',
            changes: [
                'Better spam detection',
                'Improved category classification accuracy',
                'Updated response templates',
                'Enhanced Zendesk integration'
            ],
            isCurrent: true
        },
        {
            version: '1.8.8',
            releaseDate: '2024-05-25T10:30:00Z',
            author: 'Team HAL',
            authorIcon: 'icon-teamhal.png',
            changeDescription: 'Performance optimizations and bug fixes',
            changes: [
                'Reduced email processing time by 25%',
                'Fixed edge case in email parsing',
                'Improved TumblrBot persona consistency'
            ],
            isCurrent: false
        },
        {
            version: '1.8.7',
            releaseDate: '2024-05-10T14:20:00Z',
            author: 'Andy Peatling',
            authorIcon: 'avatar-apeatling.png',
            changeDescription: 'Added support for multimedia attachments and improved triage accuracy',
            changes: [
                'Support for image attachments in emails',
                'Better handling of complex support requests',
                'Improved escalation criteria',
                'Enhanced support article recommendations'
            ],
            isCurrent: false
        },
        {
            version: '1.8.6',
            releaseDate: '2024-04-20T11:00:00Z',
            author: 'Team HAL',
            authorIcon: 'icon-teamhal.png',
            changeDescription: 'Initial deployment of email triage system',
            changes: [
                'First implementation of automated email triage',
                'Integration with help@tumblr.com',
                'Basic categorization and routing',
                'TumblrBot persona implementation'
            ],
            isCurrent: false
        }
    ],
    4: [ // Big Sky
        {
            version: '1.4.7',
            releaseDate: '2024-06-10T15:15:00Z',
            author: 'Andy Peatling',
            authorIcon: 'avatar-apeatling.png',
            changeDescription: 'Enhanced HTML block parsing and improved design generation',
            changes: [
                'Better handling of complex HTML structures',
                'Improved block element recognition',
                'Enhanced CSS generation for responsive designs',
                'Better error handling for malformed HTML'
            ],
            isCurrent: true
        },
        {
            version: '1.4.6',
            releaseDate: '2024-05-30T12:45:00Z',
            author: 'Shaun Andrews',
            authorIcon: 'avatar-shaunandrews.png',
            changeDescription: 'Added support for new WordPress.com block types',
            changes: [
                'Support for gallery blocks',
                'Enhanced media block handling',
                'Improved layout generation',
                'Better accessibility compliance'
            ],
            isCurrent: false
        },
        {
            version: '1.4.5',
            releaseDate: '2024-05-15T09:30:00Z',
            author: 'Team HAL',
            authorIcon: 'icon-teamhal.png',
            changeDescription: 'Performance improvements and bug fixes',
            changes: [
                'Faster HTML parsing',
                'Reduced memory usage',
                'Fixed edge cases in block generation'
            ],
            isCurrent: false
        },
        {
            version: '1.4.4',
            releaseDate: '2024-04-28T16:00:00Z',
            author: 'Andy Peatling',
            authorIcon: 'avatar-apeatling.png',
            changeDescription: 'Enhanced design capabilities and improved user experience',
            changes: [
                'Better color scheme generation',
                'Improved typography handling',
                'Enhanced layout flexibility',
                'Better mobile responsiveness'
            ],
            isCurrent: false
        },
        {
            version: '1.4.3',
            releaseDate: '2024-03-10T14:00:00Z',
            author: 'Shaun Andrews',
            authorIcon: 'avatar-shaunandrews.png',
            changeDescription: 'Initial release of Big Sky design agent',
            changes: [
                'Basic HTML parsing capabilities',
                'WordPress.com block integration',
                'Initial design generation algorithms',
                'Foundation for future enhancements'
            ],
            isCurrent: false
        }
    ]
}; 