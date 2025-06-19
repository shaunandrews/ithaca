# Odie Product Overview

## What is Odie?

Odie is a platform for building, managing, and improving AI-powered Agents. Designed to support a broad range of users across Automattic, Odie makes it easier to deploy and maintain intelligent systems with confidence. It offers a unified interface, consistent design language, and built-in tools for iteration and oversight.

## Who is Odie for?

Odie is being developed to support multiple roles across Automattic, with the potential to become a publicly available product in the future. Primary users include:

- Customer support reps – reviewing and improving AI-generated replies  
- Team leads and managers – overseeing agent behavior and performance  
- Developers – designing, testing, and deploying new agents and tools  
- Reviewers – auditing conversations, flagging issues, and closing the feedback loop  

Users range from non-technical contributors to highly technical developers, each with different needs and levels of access. Some will review AI output, others will configure agents, and some will build the systems and integrations that power Odie.

## Example Use Cases

- A support lead creates an agent to answer billing questions or help users reset their passwords.  
- A developer builds and deploys an agent that summarizes WordPress blog posts.  
- A reviewer inspects an agent’s email conversation with a customer, flags a poor response, and provides a correction.

## Core Features and Components

### Agents  
Agents are the core unit in Odie. They follow a defined set of instructions and can access tools and Experts to complete tasks. Agents can be customer-facing (chatbots, email responders) or used internally. Each Agent can be previewed and tested live during development.

### Experts  
Experts are smaller, self-contained agents focused on a narrow task. They are designed to be reused across Agents. For example, an Expert might handle currency conversions, explain refunds, or process date formats.

### Tools  
Tools are integrations that allow Agents and Experts to take action or retrieve data. These may be external services (like Zendesk or GitHub), internal Automattic systems, or utility functions that support decision-making or formatting.

### Activity and Review  
Users can review an Agent’s history of interactions — both chat and email — and provide structured feedback on performance. This includes tools for judging response quality, flagging issues, and suggesting corrections. Review is a core workflow and a key part of continuous improvement.

### Insights and Dashboards  
Dashboards provide visibility into how Agents are performing. Users can see trends over time, breakdowns by topic or sentiment, and usage metrics for individual Tools and Experts.

### Versioning and Experimentation  
Odie tracks every version of an Agent or Expert. Users can view change history, compare versions, and roll back when needed. Built-in support for A/B testing allows teams to compare performance between versions in live environments.