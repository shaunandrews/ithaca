# Odie Application Sitemap

## 1. Agents
- Agent List (Browse, Search, Sort)
  - Create New Agent
  - Agent Detail
    - Workbench (Overview, Configuration, Preview)
    - Versions (History, Compare, Rollback)
    - Insights (Performance, Usage, Trends)
    - Activity
      - Conversation Detail
        - Review (Feedback, Flagging, Corrections)

## 2. Experts
- Expert List (Browse, Search, Sort)
  - Create New Expert
  - Expert Detail
    - Overview / Configuration
    - Versions (History, Compare, Rollback)
    - Linked Agents

## 3. Tools
- Tool List (Browse, Search, Categories)
  - Tool Detail
    - Integration Details
    - Usage Stats
    - Linked Agents and Experts

---

## Section Descriptions

### Agents
A centralized list displaying all active and draft agents. Users can easily search, sort, or filter agents by attributes such as name, status, performance metrics, or recent activity. Each agent in the list displays its name, current status (e.g., live, testing, draft), key metrics, and notable alerts or flags for quick reference. Clicking an agent navigates to its detailed view.

#### Create New Agent
A structured workflow guiding users through the creation of a new Agent. Users specify essential details including the agent's name, purpose, initial instructions, required integrations (Experts and Tools), and user permissions. A preview feature allows users to simulate the agent's behavior before finalizing creation.

#### Agent Detail
- **Workbench (Overview, Configuration, Preview):**  
  A comprehensive view combining key information about the agent, including its purpose, assigned team members, and operational status. Users configure the agent's instructions, specify integrations with Experts and Tools, define permissions and accessibility, and preview live interactions in a simulated environment.

- **Versions (History, Compare, Rollback):**  
  A chronological listing of all changes made to the agent. Users can select any two versions to visually compare instructions and configuration settings side-by-side. Users have the ability to revert to a previous version at any time.

- **Insights (Performance, Usage, Trends):**  
  Provides detailed performance analytics, such as accuracy ratings, user satisfaction scores, interaction frequency, common user issues, and response effectiveness. Users can examine trends over selected periods to inform improvements and make data-driven adjustments to the agent.

- **Activity:**  
  Displays a chronological list of recent interactions (chats and emails) handled by the agent. Users can search, filter, and sort interactions by attributes such as timestamp, channel, user identifier, or content snippet.

  - **Conversation Detail:**  
    An in-depth view of a selected interaction, presenting the complete transcript of exchanges between the agent and users. It highlights any automated or flagged responses requiring attention.

    - **Review (Feedback, Flagging, Corrections):**  
      Within Conversation Detail, reviewers can directly evaluate interactions by submitting structured feedback, scoring responses for quality, flagging problematic replies, and suggesting corrected or improved responses. All submitted feedback is logged and contributes to continuous agent improvement.

---

### Experts
A specialized collection of self-contained, narrowly focused mini-agents (Experts). Users can efficiently search or sort Experts by function, usage frequency, or related topics. Each Expert entry highlights its main function, associated tools, and frequency of use.

#### Create New Expert
A structured workflow guiding users through the creation of a new Expert. Users specify essential details including the Expert's name, specific function or domain expertise, focused instructions, required tool integrations, and operational parameters. A preview feature allows users to test the Expert's specialized capabilities before finalizing creation.

#### Expert Detail
- **Overview / Configuration:**  
  Detailed information about the Expert's specific function and operational configuration. Users can update or refine the Expert's instructions, manage integration settings, and clearly understand the scope and purpose of the Expert within broader workflows.

- **Versions (History, Compare, Rollback):**  
  Offers full transparency into changes made over time, including who made each modification and when. Users can visually compare past versions, note configuration changes, and roll back as necessary, ensuring reliability and continuity.

- **Linked Agents:**  
  Lists all agents actively utilizing this Expert. This provides context and ensures clarity on the impact of any configuration changes or version updates on dependent agents.

---

### Tools
A comprehensive library of integrations, external services, internal Automattic resources, and utility functions. Tools facilitate data retrieval, action execution, and decision-making support for Agents and Experts. Users can browse tools by category, search directly by name, or filter based on integration type or status.

#### Tool Detail
- **Integration Details:**  
  Complete documentation and configuration requirements for integrating and utilizing the tool. Includes technical parameters, API credentials setup, relevant documentation links, and troubleshooting tips.

- **Usage Stats:**  
  Insights into how frequently and successfully the tool is used. Metrics include invocation counts, success and failure rates, recent errors, and potential issues or outages, helping maintain operational effectiveness.

- **Linked Agents and Experts:**  
  Lists all agents and experts currently relying on the tool. This clarifies dependencies and assists in proactive management, especially in situations requiring maintenance, updates, or retirement of tools.
