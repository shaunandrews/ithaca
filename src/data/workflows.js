import { experts } from './experts.js';

export const sampleAgentWorkflow = {
    id: 'sample-agent-workflow',
    name: 'Customer Support Agent',
    description: 'Handles customer messages through various processing steps',
    steps: [
        {
            uid: 'receive-message',
            stepNumber: 1,
            title: 'Receive message',
            type: 'trigger',
            inputs: [],
            outputs: ['message']
        },
        {
            uid: 'gather-context',
            stepNumber: 2,
            title: getExpertById(1)?.title || 'Gather context',
            type: 'expert',
            expertId: 1,
            inputs: getExpertById(1)?.inputs || ['message.author.id'],
            outputs: getExpertById(1)?.outputs || [
                'context.customer_profile',
                'context.purchase_history',
                'context.support_history',
                'context.customer_sites'
            ]
        },
        {
            uid: 'interpret-meaning',
            stepNumber: 3,
            title: getExpertById(2)?.title || 'Interpret meaning',
            type: 'expert',
            expertId: 2,
            inputs: getExpertById(2)?.inputs || ['message'],
            outputs: getExpertById(2)?.outputs || ['context.needs', 'context.intent']
        },
        {
            uid: 'assign-tags',
            stepNumber: 4,
            title: getExpertById(3)?.title || 'Assign tags',
            type: 'expert',
            expertId: 3,
            inputs: getExpertById(3)?.inputs || ['message'],
            outputs: getExpertById(3)?.outputs || ['context.tags']
        },
        {
            uid: 'analyze-sentiment',
            stepNumber: 5,
            title: getExpertById(4)?.title || 'Analyze sentiment',
            type: 'expert',
            expertId: 4,
            inputs: getExpertById(4)?.inputs || ['message'],
            outputs: getExpertById(4)?.outputs || ['context.sentiment']
        },
        {
            uid: 'if-else',
            stepNumber: 6,
            title: 'If/Else',
            type: 'control-flow',
            controlType: 'conditional',
            inputs: ['context.tags', 'context.sentiment'],
            outputs: [],
            branches: [
                {
                    condition: {
                        type: 'equals',
                        variable: 'tag',
                        value: 'billing'
                    },
                    steps: [
                        {
                            uid: 'compose-escalation-billing',
                            title: getExpertById(5)?.title || 'Compose escalation',
                            type: 'expert',
                            expertId: 5,
                            inputs: getExpertById(5)?.inputs || ['message', 'context'],
                            outputs: getExpertById(5)?.outputs || ['conversation_escalation_summary']
                        },
                        {
                            uid: 'send-email-billing',
                            title: 'Send email',
                            type: 'tool',
                            inputs: ['email_address', 'email_subject', 'email_body'],
                            outputs: []
                        }
                    ]
                },
                {
                    condition: {
                        type: 'equals',
                        variable: 'tag',
                        value: 'legal'
                    },
                    steps: [
                        {
                            uid: 'create-zendesk-legal',
                            title: 'Create Zendesk ticket',
                            type: 'tool',
                            inputs: [],
                            outputs: []
                        },
                        {
                            uid: 'send-response-legal',
                            title: 'Send response',
                            type: 'tool',
                            inputs: [],
                            outputs: []
                        },
                        {
                            uid: 'end-flow-legal',
                            title: 'End flow',
                            type: 'exit',
                            inputs: [],
                            outputs: []
                        }
                    ]
                },
                {
                    condition: {
                        type: 'equals',
                        variable: 'context.sentiment',
                        value: 'very angry'
                    },
                    steps: [
                        {
                            uid: 'escalate-to-human',
                            title: 'Escalate to human',
                            type: 'tool',
                            inputs: [],
                            outputs: []
                        },
                        {
                            uid: 'wait-for-response',
                            title: 'Wait for response',
                            type: 'pause',
                            inputs: [],
                            outputs: []
                        }
                    ]
                }
            ]
        },
        {
            uid: 'gather-sources',
            stepNumber: 7,
            title: getExpertById(6)?.title || 'Gather sources',
            type: 'expert',
            expertId: 6,
            inputs: getExpertById(6)?.inputs || ['tags', 'context.customer_profile', 'context.purchase_history', 'context.support_history', 'context.customer_sites'],
            outputs: getExpertById(6)?.outputs || ['context.sources']
        },
        {
            uid: 'compose-response',
            stepNumber: 8,
            title: getExpertById(7)?.title || 'Compose response',
            type: 'expert',
            expertId: 7,
            inputs: getExpertById(7)?.inputs || ['message', 'context'],
            outputs: getExpertById(7)?.outputs || ['response']
        },
        {
            uid: 'send-response',
            stepNumber: 9,
            title: 'Send response',
            type: 'tool',
            inputs: ['message', 'response'],
            outputs: []
        },
        {
            uid: 'end-flow',
            stepNumber: 10,
            title: 'End flow',
            type: 'exit',
            inputs: [],
            outputs: []
        }
    ],
    variables: [
        'message',
        'tag',
        'email_address',
        'email_subject',
        'email_body'
    ],
    contextVariables: [
        'customer_profile',
        'purchase_history',
        'support_history',
        'customer_sites',
        'tags',
        'sentiment',
        'needs',
        'intent',
        'sources',
        'response',
        'conversation_escalation_summary'
    ]
}

export const tumblrEmailTriageWorkflow = {
    id: 'tumblr-email-triage-workflow',
    name: 'Tumblr Email Triage',
    description: 'First-line email triage for help@tumblr.com',
    steps: [
        {
            uid: 'receive-email',
            stepNumber: 1,
            title: 'Receive email',
            type: 'trigger',
            inputs: [],
            outputs: ['email']
        },
        {
            uid: 'parse-email',
            stepNumber: 2,
            title: 'Parse email content',
            type: 'tool',
            inputs: ['email'],
            outputs: ['email_content', 'sender_info', 'subject_line']
        },
        {
            uid: 'categorize-issue',
            stepNumber: 3,
            title: 'Categorize issue',
            type: 'expert',
            expertId: 3,
            inputs: ['email_content', 'subject_line'],
            outputs: ['category', 'priority', 'tags']
        },
        {
            uid: 'check-duplicates',
            stepNumber: 4,
            title: 'Check for duplicates',
            type: 'tool',
            inputs: ['sender_info', 'category'],
            outputs: ['duplicate_found', 'existing_ticket']
        },
        {
            uid: 'route-decision',
            stepNumber: 5,
            title: 'Routing decision',
            type: 'control-flow',
            controlType: 'conditional',
            inputs: ['category', 'priority', 'duplicate_found'],
            outputs: [],
            branches: [
                {
                    condition: {
                        type: 'equals',
                        variable: 'duplicate_found',
                        value: 'true'
                    },
                    steps: [
                        {
                            uid: 'merge-with-existing',
                            title: 'Merge with existing ticket',
                            type: 'tool',
                            inputs: ['existing_ticket', 'email_content'],
                            outputs: []
                        }
                    ]
                },
                {
                    condition: {
                        type: 'equals',
                        variable: 'category',
                        value: 'abuse'
                    },
                    steps: [
                        {
                            uid: 'escalate-to-trust-safety',
                            title: 'Escalate to Trust & Safety',
                            type: 'tool',
                            inputs: ['email_content', 'sender_info'],
                            outputs: []
                        }
                    ]
                },
                {
                    condition: {
                        type: 'equals',
                        variable: 'priority',
                        value: 'high'
                    },
                    steps: [
                        {
                            uid: 'create-urgent-ticket',
                            title: 'Create urgent ticket',
                            type: 'tool',
                            inputs: ['email_content', 'category', 'sender_info'],
                            outputs: ['ticket_id']
                        }
                    ]
                }
            ]
        },
        {
            uid: 'find-knowledge-base',
            stepNumber: 6,
            title: 'Search knowledge base',
            type: 'tool',
            inputs: ['category', 'email_content'],
            outputs: ['relevant_articles']
        },
        {
            uid: 'auto-response',
            stepNumber: 7,
            title: 'Generate auto-response',
            type: 'expert',
            expertId: 7,
            inputs: ['email_content', 'relevant_articles', 'category'],
            outputs: ['response_email']
        },
        {
            uid: 'send-response',
            stepNumber: 8,
            title: 'Send response',
            type: 'tool',
            inputs: ['response_email', 'sender_info'],
            outputs: []
        },
        {
            uid: 'create-ticket',
            stepNumber: 9,
            title: 'Create Zendesk ticket',
            type: 'tool',
            inputs: ['email_content', 'category', 'sender_info'],
            outputs: ['ticket_id']
        },
        {
            uid: 'end-flow',
            stepNumber: 10,
            title: 'End flow',
            type: 'exit',
            inputs: [],
            outputs: []
        }
    ],
    variables: [
        'email',
        'email_content',
        'sender_info',
        'subject_line',
        'category',
        'priority',
        'tags',
        'duplicate_found',
        'existing_ticket',
        'relevant_articles',
        'response_email',
        'ticket_id'
    ],
    contextVariables: []
}

export const bigSkyWorkflow = {
    id: 'big-sky-workflow',
    name: 'Big Sky HTML Block Parser',
    description: 'Designing beautiful sites for WordPress.com by parsing HTML blocks',
    steps: [
        {
            uid: 'receive-request',
            stepNumber: 1,
            title: 'Receive parse request',
            type: 'trigger',
            inputs: [],
            outputs: ['html_input', 'block_name']
        },
        {
            uid: 'validate-html',
            stepNumber: 2,
            title: 'Validate HTML structure',
            type: 'tool',
            inputs: ['html_input'],
            outputs: ['html_valid', 'validation_errors']
        },
        {
            uid: 'parse-html',
            stepNumber: 3,
            title: 'Parse HTML content',
            type: 'tool',
            inputs: ['html_input'],
            outputs: ['parsed_blocks', 'block_tree']
        },
        {
            uid: 'search-block',
            stepNumber: 4,
            title: 'Search for requested block',
            type: 'expert',
            expertId: 1,
            inputs: ['parsed_blocks', 'block_name'],
            outputs: ['block_found', 'matching_blocks']
        },
        {
            uid: 'handle-result',
            stepNumber: 5,
            title: 'Handle search result',
            type: 'control-flow',
            controlType: 'conditional',
            inputs: ['block_found', 'matching_blocks'],
            outputs: [],
            branches: [
                {
                    condition: {
                        type: 'equals',
                        variable: 'block_found',
                        value: 'true'
                    },
                    steps: [
                        {
                            uid: 'extract-block-html',
                            title: 'Extract block HTML',
                            type: 'tool',
                            inputs: ['matching_blocks'],
                            outputs: ['block_html']
                        },
                        {
                            uid: 'return-success',
                            title: 'Return success response',
                            type: 'tool',
                            inputs: ['block_html'],
                            outputs: ['response']
                        }
                    ]
                },
                {
                    condition: {
                        type: 'equals',
                        variable: 'block_found',
                        value: 'false'
                    },
                    steps: [
                        {
                            uid: 'generate-error',
                            title: 'Generate error message',
                            type: 'expert',
                            expertId: 2,
                            inputs: ['block_name', 'parsed_blocks'],
                            outputs: ['error_message']
                        },
                        {
                            uid: 'return-error',
                            title: 'Return error response',
                            type: 'tool',
                            inputs: ['error_message'],
                            outputs: ['response']
                        }
                    ]
                }
            ]
        },
        {
            uid: 'end-flow',
            stepNumber: 6,
            title: 'End flow',
            type: 'exit',
            inputs: [],
            outputs: []
        }
    ],
    variables: [
        'html_input',
        'block_name',
        'html_valid',
        'validation_errors',
        'parsed_blocks',
        'block_tree',
        'block_found',
        'matching_blocks',
        'block_html',
        'error_message',
        'response'
    ],
    contextVariables: []
}

export const agentDaveWorkflow = {
    id: 'agent-dave-workflow',
    name: 'Agent Dave P2 Search',
    description: 'A Slack chatbot for searching, finding insights, and locating DRIs across many P2 sites',
    steps: [
        {
            uid: 'receive-slack-message',
            stepNumber: 1,
            title: 'Receive Slack message',
            type: 'trigger',
            inputs: [],
            outputs: ['slack_message', 'user_info']
        },
        {
            uid: 'parse-query',
            stepNumber: 2,
            title: 'Parse user query',
            type: 'expert',
            expertId: 2,
            inputs: ['slack_message'],
            outputs: ['query_intent', 'search_terms', 'query_type']
        },
        {
            uid: 'determine-search-type',
            stepNumber: 3,
            title: 'Determine search type',
            type: 'control-flow',
            controlType: 'conditional',
            inputs: ['query_type'],
            outputs: [],
            branches: [
                {
                    condition: {
                        type: 'equals',
                        variable: 'query_type',
                        value: 'dri_search'
                    },
                    steps: [
                        {
                            uid: 'search-dri',
                            title: 'Search for DRI',
                            type: 'tool',
                            inputs: ['search_terms'],
                            outputs: ['dri_results']
                        },
                        {
                            uid: 'format-dri-response',
                            title: 'Format DRI response',
                            type: 'expert',
                            expertId: 7,
                            inputs: ['dri_results', 'query_intent'],
                            outputs: ['formatted_response']
                        }
                    ]
                },
                {
                    condition: {
                        type: 'equals',
                        variable: 'query_type',
                        value: 'content_search'
                    },
                    steps: [
                        {
                            uid: 'search-p2-content',
                            title: 'Search P2 content',
                            type: 'tool',
                            inputs: ['search_terms'],
                            outputs: ['content_results']
                        },
                        {
                            uid: 'generate-insights',
                            title: 'Generate insights',
                            type: 'expert',
                            expertId: 6,
                            inputs: ['content_results', 'query_intent'],
                            outputs: ['insights']
                        },
                        {
                            uid: 'format-content-response',
                            title: 'Format content response',
                            type: 'expert',
                            expertId: 7,
                            inputs: ['content_results', 'insights'],
                            outputs: ['formatted_response']
                        }
                    ]
                }
            ]
        },
        {
            uid: 'cite-sources',
            stepNumber: 4,
            title: 'Add source citations',
            type: 'tool',
            inputs: ['formatted_response', 'content_results'],
            outputs: ['response_with_citations']
        },
        {
            uid: 'send-slack-response',
            stepNumber: 5,
            title: 'Send Slack response',
            type: 'tool',
            inputs: ['response_with_citations', 'user_info'],
            outputs: []
        },
        {
            uid: 'end-flow',
            stepNumber: 6,
            title: 'End flow',
            type: 'exit',
            inputs: [],
            outputs: []
        }
    ],
    variables: [
        'slack_message',
        'user_info',
        'query_intent',
        'search_terms',
        'query_type',
        'dri_results',
        'content_results',
        'insights',
        'formatted_response',
        'response_with_citations'
    ],
    contextVariables: []
}

export const bloggerWorkflow = {
    id: 'blogger-workflow',
    name: 'Blogger Content Creation',
    description: 'Planning, writing, and scheduling blog posts on any topic for WordPress sites',
    steps: [
        {
            uid: 'receive-content-request',
            stepNumber: 1,
            title: 'Receive content request',
            type: 'trigger',
            inputs: [],
            outputs: ['content_request', 'user_profile']
        },
        {
            uid: 'analyze-user-profile',
            stepNumber: 2,
            title: 'Analyze user profile',
            type: 'expert',
            expertId: 1,
            inputs: ['user_profile'],
            outputs: ['user_niche', 'target_audience', 'content_style']
        },
        {
            uid: 'determine-request-type',
            stepNumber: 3,
            title: 'Determine request type',
            type: 'control-flow',
            controlType: 'conditional',
            inputs: ['content_request'],
            outputs: [],
            branches: [
                {
                    condition: {
                        type: 'equals',
                        variable: 'content_request.type',
                        value: 'idea_generation'
                    },
                    steps: [
                        {
                            uid: 'generate-post-ideas',
                            title: 'Generate post ideas',
                            type: 'expert',
                            expertId: 2,
                            inputs: ['user_niche', 'target_audience'],
                            outputs: ['post_ideas']
                        },
                        {
                            uid: 'research-trending-topics',
                            title: 'Research trending topics',
                            type: 'tool',
                            inputs: ['user_niche'],
                            outputs: ['trending_topics']
                        },
                        {
                            uid: 'combine-ideas',
                            title: 'Combine ideas with trends',
                            type: 'expert',
                            expertId: 3,
                            inputs: ['post_ideas', 'trending_topics'],
                            outputs: ['refined_ideas']
                        }
                    ]
                },
                {
                    condition: {
                        type: 'equals',
                        variable: 'content_request.type',
                        value: 'writing_assistance'
                    },
                    steps: [
                        {
                            uid: 'analyze-draft',
                            title: 'Analyze draft content',
                            type: 'expert',
                            expertId: 4,
                            inputs: ['content_request.draft'],
                            outputs: ['content_analysis']
                        },
                        {
                            uid: 'seo-optimization',
                            title: 'SEO optimization',
                            type: 'expert',
                            expertId: 5,
                            inputs: ['content_request.draft', 'user_niche'],
                            outputs: ['seo_suggestions']
                        },
                        {
                            uid: 'improve-content',
                            title: 'Improve content',
                            type: 'expert',
                            expertId: 6,
                            inputs: ['content_analysis', 'seo_suggestions'],
                            outputs: ['improved_content']
                        }
                    ]
                },
                {
                    condition: {
                        type: 'equals',
                        variable: 'content_request.type',
                        value: 'scheduling'
                    },
                    steps: [
                        {
                            uid: 'analyze-posting-schedule',
                            title: 'Analyze posting schedule',
                            type: 'tool',
                            inputs: ['user_profile'],
                            outputs: ['current_schedule']
                        },
                        {
                            uid: 'recommend-schedule',
                            title: 'Recommend schedule',
                            type: 'expert',
                            expertId: 7,
                            inputs: ['current_schedule', 'target_audience'],
                            outputs: ['schedule_recommendations']
                        }
                    ]
                }
            ]
        },
        {
            uid: 'format-response',
            stepNumber: 4,
            title: 'Format response',
            type: 'expert',
            expertId: 7,
            inputs: ['refined_ideas', 'improved_content', 'schedule_recommendations'],
            outputs: ['final_response']
        },
        {
            uid: 'send-response',
            stepNumber: 5,
            title: 'Send response',
            type: 'tool',
            inputs: ['final_response'],
            outputs: []
        },
        {
            uid: 'end-flow',
            stepNumber: 6,
            title: 'End flow',
            type: 'exit',
            inputs: [],
            outputs: []
        }
    ],
    variables: [
        'content_request',
        'user_profile',
        'user_niche',
        'target_audience',
        'content_style',
        'post_ideas',
        'trending_topics',
        'refined_ideas',
        'content_analysis',
        'seo_suggestions',
        'improved_content',
        'current_schedule',
        'schedule_recommendations',
        'final_response'
    ],
    contextVariables: []
}

export const wpForumsWorkflow = {
    id: 'wp-forums-workflow',
    name: 'WP.com Forums Moderation',
    description: 'Moderation and FAQ assistance for WordPress.com support forums',
    steps: [
        {
            uid: 'receive-forum-post',
            stepNumber: 1,
            title: 'Receive forum post',
            type: 'trigger',
            inputs: [],
            outputs: ['forum_post', 'user_info']
        },
        {
            uid: 'scan-for-violations',
            stepNumber: 2,
            title: 'Scan for policy violations',
            type: 'expert',
            expertId: 1,
            inputs: ['forum_post'],
            outputs: ['violation_found', 'violation_type', 'severity']
        },
        {
            uid: 'check-duplicates',
            stepNumber: 3,
            title: 'Check for duplicate topics',
            type: 'tool',
            inputs: ['forum_post'],
            outputs: ['duplicate_found', 'original_topic']
        },
        {
            uid: 'moderation-decision',
            stepNumber: 4,
            title: 'Moderation decision',
            type: 'control-flow',
            controlType: 'conditional',
            inputs: ['violation_found', 'duplicate_found'],
            outputs: [],
            branches: [
                {
                    condition: {
                        type: 'equals',
                        variable: 'violation_found',
                        value: 'true'
                    },
                    steps: [
                        {
                            uid: 'take-moderation-action',
                            title: 'Take moderation action',
                            type: 'tool',
                            inputs: ['violation_type', 'severity', 'user_info'],
                            outputs: ['action_taken']
                        },
                        {
                            uid: 'notify-user',
                            title: 'Notify user',
                            type: 'tool',
                            inputs: ['action_taken', 'user_info'],
                            outputs: []
                        }
                    ]
                },
                {
                    condition: {
                        type: 'equals',
                        variable: 'duplicate_found',
                        value: 'true'
                    },
                    steps: [
                        {
                            uid: 'redirect-to-original',
                            title: 'Redirect to original topic',
                            type: 'expert',
                            expertId: 7,
                            inputs: ['original_topic', 'forum_post'],
                            outputs: ['redirect_message']
                        },
                        {
                            uid: 'send-redirect',
                            title: 'Send redirect message',
                            type: 'tool',
                            inputs: ['redirect_message', 'user_info'],
                            outputs: []
                        }
                    ]
                }
            ]
        },
        {
            uid: 'analyze-question',
            stepNumber: 5,
            title: 'Analyze question',
            type: 'expert',
            expertId: 2,
            inputs: ['forum_post'],
            outputs: ['question_type', 'complexity', 'keywords']
        },
        {
            uid: 'search-knowledge-base',
            stepNumber: 6,
            title: 'Search knowledge base',
            type: 'tool',
            inputs: ['keywords', 'question_type'],
            outputs: ['relevant_articles']
        },
        {
            uid: 'generate-response',
            stepNumber: 7,
            title: 'Generate FAQ response',
            type: 'expert',
            expertId: 7,
            inputs: ['forum_post', 'relevant_articles', 'question_type'],
            outputs: ['faq_response']
        },
        {
            uid: 'escalation-check',
            stepNumber: 8,
            title: 'Check if escalation needed',
            type: 'control-flow',
            controlType: 'conditional',
            inputs: ['complexity', 'relevant_articles'],
            outputs: [],
            branches: [
                {
                    condition: {
                        type: 'equals',
                        variable: 'complexity',
                        value: 'high'
                    },
                    steps: [
                        {
                            uid: 'escalate-to-community-team',
                            title: 'Escalate to community team',
                            type: 'tool',
                            inputs: ['forum_post', 'user_info'],
                            outputs: []
                        }
                    ]
                }
            ]
        },
        {
            uid: 'post-response',
            stepNumber: 9,
            title: 'Post response',
            type: 'tool',
            inputs: ['faq_response', 'user_info'],
            outputs: []
        },
        {
            uid: 'end-flow',
            stepNumber: 10,
            title: 'End flow',
            type: 'exit',
            inputs: [],
            outputs: []
        }
    ],
    variables: [
        'forum_post',
        'user_info',
        'violation_found',
        'violation_type',
        'severity',
        'duplicate_found',
        'original_topic',
        'action_taken',
        'redirect_message',
        'question_type',
        'complexity',
        'keywords',
        'relevant_articles',
        'faq_response'
    ],
    contextVariables: []
}

export const jetpackChatWorkflow = {
    id: 'jetpack-chat-workflow',
    name: 'Jetpack Chat Support',
    description: 'Customer support for all Jetpack plugins and features',
    steps: [
        {
            uid: 'receive-jetpack-inquiry',
            stepNumber: 1,
            title: 'Receive Jetpack inquiry',
            type: 'trigger',
            inputs: [],
            outputs: ['inquiry', 'user_info']
        },
        {
            uid: 'check-jetpack-connection',
            stepNumber: 2,
            title: 'Check Jetpack connection',
            type: 'tool',
            inputs: ['user_info'],
            outputs: ['connection_status', 'active_features']
        },
        {
            uid: 'analyze-inquiry',
            stepNumber: 3,
            title: 'Analyze inquiry',
            type: 'expert',
            expertId: 2,
            inputs: ['inquiry'],
            outputs: ['issue_type', 'urgency', 'affected_features']
        },
        {
            uid: 'route-by-issue-type',
            stepNumber: 4,
            title: 'Route by issue type',
            type: 'control-flow',
            controlType: 'conditional',
            inputs: ['issue_type'],
            outputs: [],
            branches: [
                {
                    condition: {
                        type: 'equals',
                        variable: 'issue_type',
                        value: 'security'
                    },
                    steps: [
                        {
                            uid: 'diagnose-security',
                            title: 'Diagnose security issue',
                            type: 'expert',
                            expertId: 3,
                            inputs: ['inquiry', 'active_features'],
                            outputs: ['security_diagnosis']
                        },
                        {
                            uid: 'security-troubleshoot',
                            title: 'Security troubleshooting',
                            type: 'tool',
                            inputs: ['security_diagnosis'],
                            outputs: ['security_steps']
                        }
                    ]
                },
                {
                    condition: {
                        type: 'equals',
                        variable: 'issue_type',
                        value: 'performance'
                    },
                    steps: [
                        {
                            uid: 'diagnose-performance',
                            title: 'Diagnose performance issue',
                            type: 'expert',
                            expertId: 4,
                            inputs: ['inquiry', 'active_features'],
                            outputs: ['performance_diagnosis']
                        },
                        {
                            uid: 'performance-troubleshoot',
                            title: 'Performance troubleshooting',
                            type: 'tool',
                            inputs: ['performance_diagnosis'],
                            outputs: ['performance_steps']
                        }
                    ]
                },
                {
                    condition: {
                        type: 'equals',
                        variable: 'issue_type',
                        value: 'backup'
                    },
                    steps: [
                        {
                            uid: 'diagnose-backup',
                            title: 'Diagnose backup issue',
                            type: 'expert',
                            expertId: 5,
                            inputs: ['inquiry', 'active_features'],
                            outputs: ['backup_diagnosis']
                        },
                        {
                            uid: 'backup-troubleshoot',
                            title: 'Backup troubleshooting',
                            type: 'tool',
                            inputs: ['backup_diagnosis'],
                            outputs: ['backup_steps']
                        }
                    ]
                }
            ]
        },
        {
            uid: 'search-jetpack-docs',
            stepNumber: 5,
            title: 'Search Jetpack documentation',
            type: 'tool',
            inputs: ['issue_type', 'affected_features'],
            outputs: ['relevant_docs']
        },
        {
            uid: 'compile-solution',
            stepNumber: 6,
            title: 'Compile solution',
            type: 'expert',
            expertId: 7,
            inputs: ['security_steps', 'performance_steps', 'backup_steps', 'relevant_docs'],
            outputs: ['solution_steps']
        },
        {
            uid: 'escalation-check',
            stepNumber: 7,
            title: 'Check if escalation needed',
            type: 'control-flow',
            controlType: 'conditional',
            inputs: ['urgency', 'solution_steps'],
            outputs: [],
            branches: [
                {
                    condition: {
                        type: 'equals',
                        variable: 'urgency',
                        value: 'high'
                    },
                    steps: [
                        {
                            uid: 'escalate-to-jetpack-team',
                            title: 'Escalate to Jetpack team',
                            type: 'tool',
                            inputs: ['inquiry', 'user_info', 'solution_steps'],
                            outputs: []
                        }
                    ]
                }
            ]
        },
        {
            uid: 'send-solution',
            stepNumber: 8,
            title: 'Send solution',
            type: 'tool',
            inputs: ['solution_steps', 'user_info'],
            outputs: []
        },
        {
            uid: 'end-flow',
            stepNumber: 9,
            title: 'End flow',
            type: 'exit',
            inputs: [],
            outputs: []
        }
    ],
    variables: [
        'inquiry',
        'user_info',
        'connection_status',
        'active_features',
        'issue_type',
        'urgency',
        'affected_features',
        'security_diagnosis',
        'security_steps',
        'performance_diagnosis',
        'performance_steps',
        'backup_diagnosis',
        'backup_steps',
        'relevant_docs',
        'solution_steps'
    ],
    contextVariables: []
}

// Export for use in components
export const workflows = [
    sampleAgentWorkflow,
    tumblrEmailTriageWorkflow,
    bigSkyWorkflow,
    agentDaveWorkflow,
    bloggerWorkflow,
    wpForumsWorkflow,
    jetpackChatWorkflow
]

// Helper function to get a workflow by ID
export function getWorkflowById(id) {
    return workflows.find(workflow => workflow.id === id)
}

// Helper function to get an expert by ID for workflow steps
export function getExpertById(id) {
    return experts.find(expert => expert.id === id)
}

// Helper function to flatten all steps (including nested ones) for easy searching
export function getAllStepsFlat(workflow) {
    const allSteps = []
    
    function extractSteps(steps) {
        steps.forEach(step => {
            allSteps.push(step)
            if (step.type === 'control-flow' && step.branches) {
                step.branches.forEach(branch => {
                    if (branch.steps) {
                        extractSteps(branch.steps)
                    }
                })
            }
        })
    }
    
    extractSteps(workflow.steps)
    return allSteps
}

// Helper function to find a step by UID anywhere in the workflow
export function findStepByUid(workflow, uid) {
    return getAllStepsFlat(workflow).find(step => step.uid === uid)
} 