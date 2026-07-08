# Auth acceptance scenarios (manual)

1. **Register** new email → 201; duplicate email → 409/400.
2. **Login** alice → access token works on `GET` protected route.
3. **Refresh** → new access; old refresh invalid after rotation (if rotation enabled).
4. **Logout** → refresh rejected afterwards.
5. Alice creates comment on `post_01`; Bob tries `DELETE` that comment → **403**.
6. Admin deletes Alice’s comment → **204/200**.
7. Invalid JWT → **401**.
8. Login with wrong password 10+ times → rate limited (429) if implemented.

Passwords for seed users are in `auth.users.json` (dev only).
