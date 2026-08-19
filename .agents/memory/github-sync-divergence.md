---
name: GitHub sync divergence
description: Safe handling when the project’s GitHub main branch advances outside the current checkout.
---

When the GitHub sync rejects a push because remote `main` has newer commits, fetch and merge the remote branch rather than force-pushing.

**Why:** The project’s sync intentionally avoids force pushes so updates made directly on GitHub—such as deployment configuration or workflow changes—are never silently overwritten.

**How to apply:** Use the connected GitHub integration to create a short-lived deploy key only when needed to fetch the remote branch, merge and validate both histories locally, then retry the existing sync command. Remove the deploy key immediately after the fetch or push.