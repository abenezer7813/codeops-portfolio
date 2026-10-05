| Component             | Runs on | Why                                   |
|-----------------------|---------|---------------------------------------|
| app/layout.js         | Server  | Passes children into Providers        |
| app/providers.jsx     | Client  | Context requires state                |
| app/menu/layout.js    | Server  | Static list, renders Categories       |
| app/menu/Categories   | Client  | useSearchParams for the active link   |
| app/menu/page.js      | Server  | No interactivity of its own           |
| app/menu/DishList     | Server  | Awaits getDishes, pure markup         |
| app/menu/FilterShell  | Client  | Holds open/closed state               |
| MenuCard              | Server  | Markup from data                      |
| AddToCartButton       | Client  | onClick, writes to cart               |

First Load JS for /menu: before ___ kB, after ___ kB. Difference: ___