# Assignment 7 - Small Online Shop

This is a small online shop made with React and Vite. The products come from the DummyJSON API. The visitor can filter the products (the filter can be shared by link), open a detail page for each product, add products to a cart, and log in with a fake account to see the cart. The cart and the theme (light/dark) are remembered after a reload.

## How to run

```
npm install
npm run dev
```

Demo account: username is my student email, password is `demo123456`.

## File organization

```
/assignment7
 ├─ src/
 │   ├─ api/
 │   │   ├─ productsApi.js
 │   │   └─ authApi.js
 │   ├─ hooks/
 │   │   ├─ useFetch.js
 │   │   └─ useLocalStorage.js
 │   ├─ context/
 │   │   └─ AuthContext.jsx
 │   ├─ store/
 │   │   └─ cartStore.js
 │   ├─ components/
 │   │   ├─ Layout.jsx
 │   │   ├─ NavBar.jsx
 │   │   ├─ ProductCard.jsx
 │   │   └─ ProtectedRoute.jsx
 │   ├─ pages/
 │   │   ├─ Home.jsx
 │   │   ├─ ProductList.jsx
 │   │   ├─ ProductDetail.jsx
 │   │   ├─ Cart.jsx
 │   │   ├─ Login.jsx
 │   │   └─ NotFound.jsx
 │   ├─ App.jsx
 │   └─ main.jsx
 |      index.css
 ├─ index.html
 └─ package.json
```