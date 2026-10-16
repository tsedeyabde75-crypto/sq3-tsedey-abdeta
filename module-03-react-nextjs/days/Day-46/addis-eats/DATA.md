# Data Fetching Strategy

| Data Entity | Fetch Location | Key / Route | Refresh Rule | Reasoning |
| :--- | :--- | :--- | :--- | :--- |
| **Menu & Dishes** | Server | `/menu` | Static / Revalidated | Public data must be SEO-indexable and cacheable for performance. |
| **Order History** | Server | `/orders` | Dynamic per request | Private user data requiring strict session binding and secure server-side fetching. |
| **Order Status** | Server first, then Client | Kitchen / Orders | Polled interval | Initial render comes from the server to eliminate loading spinners, followed by live status updates. |
| **Menu Search** | Client | Component State | Debounced on typing | User-driven interactive queries that update instantly without full page reloads. |
| **Cart State** | Client | LocalStorage | Browser persistence | Temporary session state that stays entirely within the user's browser. |