---
name: Expo Web card controls
description: Expo Web renders Pressable controls as buttons, so card actions cannot contain secondary Pressable controls.
---

When a React Native card needs both a primary tap action and a secondary action such as info, render the two controls as sibling pressables inside a non-pressable card container.

**Why:** Expo Web maps `Pressable` to an HTML button, and nested buttons trigger hydration errors even when native touch behavior appears to work.

**How to apply:** Give the primary pressable the card content and chevron, and place the secondary pressable beside it. Do not rely on `stopPropagation` to make nested controls valid on web.