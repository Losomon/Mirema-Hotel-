---
name: "🐛 Bug Report"
description: File a bug report for Mirema Hotel
labels: ["bug", "needs-triage"]
body:
  - type: textarea
    id: description
    attributes:
      label: "Description"
      description: "Describe the bug clearly and concisely."
      placeholder: "A clear and concise description of what the bug is."
    validations:
      required: true

  - type: textarea
    id: expected
    attributes:
      label: "Expected Behavior"
      description: "What should happen?"
      placeholder: "A clear description of what you expected to happen."
    validations:
      required: true

  - type: textarea
    id: actual
    attributes:
      label: "Actual Behavior"
      description: "What actually happens?"
      placeholder: "Describe what actually happens."
    validations:
      required: true

  - type: textarea
    id: steps
    attributes:
      label: "Steps to Reproduce"
      description: "How can we reproduce this?"
      placeholder: "1. Go to..."
      render: bash
    validations:
      required: true

  - type: textarea
    id: screenshots
    attributes:
      label: "Screenshots/Videos"
      description: "If applicable, add screenshots or recordings."
      placeholder: "Drag & drop or paste links."

  - type: dropdown
    id: component
    attributes:
      label: "Affected Component"
      description: "What part of the project?"
      options:
        - Frontend
        - Backend
        - Integrations (Wix)
        - Docs
        - Other
    validations:
      required: true

  - type: dropdown
    id: severity
    attributes:
      label: "Severity"
      options:
        - Low
        - Medium
        - High
        - Blocker
    validations:
      required: true

  - type: textarea
    id: environment
    attributes:
      label: "Environment"
      description: "OS, Browser/Node version, etc."
      placeholder: "e.g. Chrome 120, Node 20, Windows 11"
    validations:
      required: true

  - type: textarea
    id: additional
    attributes:
      label: "Additional Context"
      description: "Anything else?"

  - type: checkboxes
    id: terms
    attributes:
      label: "Code of Conduct"
      description: "By submitting this issue, you agree to follow our [Code of Conduct](https://github.com/solom-mirema/Mirema-Hotel-/.github/CODE_OF_CONDUCT.md)"
      options:
        - label: "I agree"
          required: true
