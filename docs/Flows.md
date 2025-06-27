# Odie: Personas, Use Cases, and Common User Flows

## Personas

### 1. Happiness Engineer (Customer Support Rep, NOT an engineer)

- **Role**: Monitors agent responses in customer conversations.
- **Goals**: Ensure quality and correctness of AI replies; flag and correct issues.
- **Technical Skill**: Low to moderate.

### 2. Team Lead / Manager

- **Role**: Oversees agent behavior, performance, and alignment with team goals.
- **Goals**: Deploy helpful agents, review trends, support team workflows.
- **Technical Skill**: Moderate.

### 3. Developer

- **Role**: Builds, configures, and deploys agents, tools, and experts.
- **Goals**: Implement robust, extensible systems; integrate with external APIs or internal services.
- **Technical Skill**: High.

### 4. Reviewer

- **Role**: Audits specific conversations and provides structured feedback.
- **Goals**: Maintain high quality by closing the loop between issues and improvements.
- **Technical Skill**: Low.

---

## Use Cases

- A **support lead** creates an agent to automate responses to account-related questions.
- A **developer** deploys a summarization agent that rewrites WordPress posts for newsletters.
- A **reviewer** flags a poor AI email reply and submits a corrected version for training.
- A **manager** tracks agent accuracy trends and usage across regions.
- A **support rep** browses through recent conversations to review flagged responses.

---

## Common User Flow

Here’s a high-level description of how users interact with Odie to accomplish their goals:

### 1. Discover or Access an Agent

Users begin in the **Agent List** view, where they can browse, search, and sort agents. They may be looking to review an existing agent or start from scratch.

- **Support leads** might click “Create New Agent” to define a new AI workflow.
- **Reviewers or managers** might dive into a specific live agent for auditing.

### 2. Configure or Review an Agent

Inside the **Agent Detail**, users land on the **Workbench** screen:

- They can update instructions, assign Experts and Tools, or preview responses.
- Developers and leads tweak behavior and test interactions live.
- Permissions and access rules can be adjusted here.

### 3. Monitor Performance or Audit Activity

Next, users may navigate to:

- **Insights**, to evaluate performance metrics, trends, and user satisfaction.
- **Activity**, to review a chronological list of chats/emails and jump into specific transcripts.

### 4. Conduct Review and Submit Feedback

When viewing an individual conversation:

- **Reviewers** evaluate the exchange for accuracy and helpfulness.
- They submit structured feedback, flag issues, and offer corrections.

This feedback is stored and used to improve the agent over time.

### 5. Iterate via Versioning or A/B Testing

If changes are needed:

- Users can visit the **Versions** section to compare or roll back configurations.
- Developers or managers may use built-in A/B testing to experiment with different instructions or behaviors in production.

### 6. Manage Dependencies

For more advanced workflows:

- **Experts** and **Tools** are configured or reviewed in their respective sections.
- Users can trace which Agents rely on a specific Tool or Expert to ensure safe changes.

---

## Summary

Odie supports a collaborative flow where different personas contribute to the lifecycle of an AI Agent:

- **Support reps** and **reviewers** feed back data from the field.
- **Team leads** make data-driven adjustments to agent instructions and scope.
- **Developers** maintain and expand the technical underpinnings.

All roles loop through a shared surface, with version control and analytics providing the confidence to ship, test, and improve continuously.
