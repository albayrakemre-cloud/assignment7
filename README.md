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


## Reasoning questions

**1. State choices.**
- The signed-in user is in Context with `useReducer`, because many far components need it but it changes rarely.
- The cart is in a Zustand store, because it changes often and many components read it.
- The filter values are in the URL query string, so a filtered view can be shared by link and stays after a refresh.
- The product list is in the state of `useFetch`, because only the page that loads it needs it.
- The theme is in my `useLocalStorage` hook, because it is a small setting that must stay after a reload.

**2. Context versus store.**
The user changes only when logging in or out and only a few components read it, so Context is enough for it. The cart changes all the time, and with Context every change would re-render every component that uses the context, even if it needs only a small part. Zustand lets a component select only one value, so it re-renders only when that value changes. If I swapped them, the cart would cause many extra renders, and the user in Zustand would work but would be more than needed.

**3. Custom hooks.**
`useFetch` shares the logic between `ProductList` and `ProductDetail`: the loading/error/data states, the reducer, and the AbortController that cancels the request when the inputs change or the component unmounts. It deliberately does not share the data, because each component that calls the hook gets its own separate state.

**4. Route parameters.**
The `id` from `useParams()` is always a string, for example `"3"`, even if it looks like a number. In `ProductDetail.jsx` I use it as a string in the fetch URL, but for the "next product" and "previous product" links I convert it with `Number(id)`. This matters because `"3" + 1` would give `"31"` and not `4`.

**5. Protected routes.**
`ProtectedRoute` only hides the page inside the browser. The user has all the JavaScript code and can change the state in the dev tools or call the API directly, so it is a user-experience feature and not security. To make it secure, a real server must check the user (for example with a session cookie or a token) on every request and send the protected data only to allowed users.

**6. Deep links.**
On a plain static file server only `index.html` exists for `/`. When the user reloads `/products/3`, the server looks for a file at that path, does not find it, and returns 404. It works on the Vite dev server because it has a fallback that sends `index.html` for unknown paths, and then React Router shows the right page. On a static host I would need the same rule, which is to send all paths to `index.html`.


