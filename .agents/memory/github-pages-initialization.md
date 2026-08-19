---
name: GitHub Pages initialization
description: One-time repository setup required before the GitHub Pages workflow can deploy.
---

Create the repository’s Pages site with build type `workflow` before relying on the Pages deployment workflow.

**Why:** The workflow token could not create the initial Pages site and failed with “Resource not accessible by integration” before the build step. An authenticated repository administrator had to create it once through the GitHub Pages API.

**How to apply:** If Pages configuration fails before build and the Pages API returns 404, create the site once using repository-admin authorization. After that, rerun the existing workflow; normal pushes can deploy without repeating the setup.