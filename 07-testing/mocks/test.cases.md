# Required test cases

## Unit

- [ ] `PostsService.create` wraps post+tags in a transaction (mock asserts `$transaction` / manager called)
- [ ] `AuthService.validateUser` rejects bad password
- [ ] Mapper/helper: soft-deleted posts excluded from feed query options

## E2E

- [ ] Happy path: register → login → create post → `GET /posts` contains it
- [ ] Refresh returns new access token
- [ ] User B cannot delete User A comment/post → 403
- [ ] Admin can delete User A resource
- [ ] Unauthenticated `POST /posts` → 401
- [ ] Invalid body on create → 400 with validation error shape

## Optional

- [ ] OpenAPI `/docs-json` or `/docs` available in test app
- [ ] Feed cache miss/hit does not break listing (if stage 06 merged)
