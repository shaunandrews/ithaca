# Todo

## General
- [x] Toolbar component

## Conversation
- [x] Make converstaion overview list sticky
- [x] Update converstation summary
    - Reconsider click action, find another place for convo details
- [x] Consider permanent sidebar, with tabs like on Workbench
- [x] What to do with conversation bottom bar?
- [x] All activity button is broken after "memory" update
- [ ] Instead of fixed "sources" and "classifiers," consider these as expert and tool calls, and adapt the UI accordingly
- [ ] Implement a Review mode, which walks the user through the converasation one message at a time, allowing them to rate tool usages/outcomes

## Workbench
- [ ] Adding a new block
    - [ ] Update the block types, and selection interface. Only show expert, tool, and flow blocks.
    - [ ] Need to allow for picking from existing experts and tools. Need a quick picker, and maybe a way to open a larger library/modal/sidebar.
- [ ] Editing a block
    - [ ] How to pick input variable(s)
    - [ ] Customize prompts and ouputs
    - [x] Editing expert instructions
- [ ] Adding a new rule
    - [x] Need a better UI for picking conditions, inputs, and values.
    - [ ] Autocomplete for variables
    - [ ] Disable/Explain invalid variables and conditionals (greater than doesn't make sense for a string)
- [ ] Editing rules
    - [ ] Details sidebar UI needs improvement
    - [ ] Sidebar list of blocks within the rules
- [ ] Previewing a workflow
    - [ ] Need to simulate the workflow "running" with a log in the sidebar.
    - [ ] Blocks in the flow needs to visually simulate running states: in-progress, running, pending, finished, error
- [ ] Drag-n-drop

## Versions
- [ ] Needs a basic design for listing lots of versions

## Insights
- [ ] Add sentiment and quotes
- [ ] Needs more simulated data to build something helpful

## Activity
- [ ] Better design for Stack view
- [ ] Improve search experience
- [ ] Better UI for sorting and filtering
- [ ] Consider moving sentiment to start of list item row

## Tools
- [ ] A much better home screen design with more tools
- [ ] Create a better data object, and use it for the workbench and Experts screens

## Organization