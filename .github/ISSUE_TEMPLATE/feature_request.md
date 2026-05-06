---
name: "🚀 Feature Request"
description: Suggest a new feature for Mirema Hotel
labels: ["feature", "needs-triage"]
body:
  - type: textarea
    id: summary
    attributes:
      label: "Summary"
      description: "Brief summary of the feature."
      placeholder: "e.g. Add user authentication flow"
    validations:
      required: true

  - type: textarea
    id: motivation
    attributes:
      label: "Motivation"
      description: "Why is this needed? Problem it solves."
      placeholder: "Users need to..."
    validations:
      required: true

  - type: textarea
    id: description
    attributes:
      label: "Detailed Description"
      description: "How should it work? API/UI changes."
      placeholder: "Describe the feature in detail..."
    validations:
      required: true

  - type: textarea
    id: alternatives
    attributes:
      label: "Alternatives Considered"
      description: "Other solutions tried?"
      placeholder: "e.g. Current workaround"

  - type: textarea
    id: implementation
    attributes:
      label: "Suggested Implementation"
      description: "High-level approach, affected files."
      placeholder: "Could extend X component..."

  - type: textarea
    id: ui-mockup
    attributes:
      label: "UI Mockups/Screenshots"
      description: "Visual designs if applicable."
      placeholder: "Attach images or Figma links"

  - type: dropdown
    id: component
    attributes:
      label: "Target Component"
      options:
        - Frontend (UI/P ages)
        - Backend (API)
        - Integrations (Wix/DB)
        - Docs/DevOps
        - Cross-cutting
    validations:
      required: true

  - type: dropdown
    id: priority
    attributes:
      label: "Priority"
      options:
        - Nice to have
        - Should have
        - Must have
    validations:
      required: true

  - type: textarea
    id: additional
    attributes:
      label: "Additional Context"
      description: "Related issues, refs."

  - type: checkboxes
    id: terms
    attributes:
      label: "Code of Conduct"
      description: "By submitting, you agree to our [Code of Conduct](https://github.com/solom-mirema/Mirema-Hotel-/.github/CODE_OF_CONDUCT.md)"
      options:
        - label: "I agree"
          required: true
