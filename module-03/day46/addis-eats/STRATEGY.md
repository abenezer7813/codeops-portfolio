# Rendering Strategy

## Overview

This document describes the rendering and caching strategies used by the Mesob Habesha House application.

| Route | Rendering Strategy | Reason |
|---|---|---|
| `/` | Static Rendering | The homepage contains mostly shared content that can be generated at build time and served quickly. |
| `/menu` | Static Rendering with Revalidation | The menu is mostly public content, so it can be cached and periodically refreshed using a justified revalidation window. |
| `/menu/[slug]` | Static Site Generation (SSG) | `generateStaticParams()` generates a page for each known dish at build time, improving initial response time. |
| `/checkout` | Dynamic Rendering | Checkout reads request-specific cookies using `await cookies()` to access the user's session, so the page must use request-specific data. |
