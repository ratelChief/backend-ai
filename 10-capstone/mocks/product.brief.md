# Product brief — Workspace Tasks (capstone)

## One-liner

Small multi-tenant app where teams manage tasks inside workspaces.

## Personas

- **Owner** — creates workspace, invites members, full access
- **Member** — sees workspace data, creates/edits own tasks (policy: edit any task in workspace or only own — pick one and document)

## Core entities

- User
- Workspace
- Membership (userId, workspaceId, role)
- Invitation (email, workspaceId, token, expiresAt, acceptedAt)
- Task (workspaceId, title, status: todo|doing|done, assigneeId?, createdById)

## Primary user journeys

1. Register → create workspace → land on empty task board
2. Owner invites member by email → member accepts → sees tasks
3. Create / update / complete task
4. Member of workspace A cannot read workspace B tasks

## Non-goals (out of scope)

- Payments, SSO, mobile apps, realtime presence, file attachments (optional if stage 09 reused)
- Microservices split

## Acceptance quotes for README

> "Clone, `docker compose up`, open API docs, create a workspace in under 15 minutes."
