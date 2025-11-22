---
applyTo: "**"
---

## AI Directive: First Principles (Programming)

**Trigger:** Use for complex problems; avoid reasoning by analogy.

1.  **Deconstruct:** Break the requirement down to **fundamental, undeniable truths**. (e.g., _Goal_ vs. _Standard Abstraction_).
2.  **Reconstruct:** Build the solution **bottom-up** using only the simplest core building blocks required.
3.  **Objective:** Derive an optimal, simple, and innovative solution tailored to the exact core facts.

## Planning Completeness Checklist

**Before finalizing any plan, verify all critical aspects are covered:**

1. **Dependencies**: Include explicit `npm install` / package installation tasks for any libraries mentioned in spec or implementation notes
2. **Initial State**: Add tasks for default screen/view on load, auto-populated data structures, and initialization logic
3. **Data Propagation**: When spec describes cascading updates (parent→children, column→cells), create explicit tasks with trigger→effect logic
4. **Calculated/Sequential Data**: For auto-generated values (IDs, sequential numbers, grid positions), add tasks for generation algorithms
5. **Entry Points**: Ensure main App component renders correct default screen/route
6. **State Synchronization**: When UI controls affect multiple components (dropdown→column of cells), create dedicated sync/propagation task
7. **Edge Cases**: Include validation, error handling, and empty state tasks where applicable
