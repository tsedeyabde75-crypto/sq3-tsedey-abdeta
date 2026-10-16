# Authentication & Security Architecture

## Route & Action Protection Layers

| Route / Action | Protection Layers | What Each Layer Proves |
| :--- | :--- | :--- |
| `/menu` | None | Public access; indexable and cacheable. |
| `/orders` | 1. Middleware (`src/middleware.js`)<br>2. Page Check (`src/app/orders/page.js`)<br>3. Scoped Query (`userEmail` filtering) | Proves the user has a valid active session cookie, passes page-level validation, and is restricted solely to their own order history. |
| `/checkout` | 1. Middleware<br>2. Page Check | Proves the user is authenticated before accessing checkout flows. |
| `/kitchen` | 1. Page Check<br>2. Action Role Check | Proves the user has staff-level authorization to view and update order statuses. |

## Security Attack Verification

1. **Signed-Out Action Call**
   - *Test:* Called `cancelOrder("ord_812")` while unauthenticated.
   - *Result:* Refused safely via session validation checks, preventing server crashes or unauthorized mutations.

2. **Cross-User Data Access (Wrong Account)**
   - *Test:* Attempted to access another user's order ID.
   - *Result:* Blocked by Layer 3 data scoping (`user_email = $1`), ensuring users can only read records belonging to their own session identity.

3. **Crafted Redirection Link**
   - *Test:* Navigated to `/signin?next=https://example.com`.
   - *Result:* Sanitized and forced landing back within the application domain rather than an external malicious site.