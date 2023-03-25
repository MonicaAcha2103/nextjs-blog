---
title: 'All you need to know about React 18'
date: '2020-04-10'
---

ReactJS is the highly used open-source JavaScript Library which makes building dynamic websites easier. This blog post mainly focuses on the latest changes in React's newest version.  A prior knowledge of React and its fundamentals is necessary to understand it to the fullest. 

## Updates on Client Side

Things to update to support the new version. 
Updating from React 17 to 18 doesn't involve any breaking changes. 

- Install package

`npm install react@18 react-dom@18`

- ReactDOM.render is no longer supported in React 18. Use the new createRoot API instead.

~~`reactDOM.render(<App />,document.getElementById(‘root’));`~~

```javascript
import ReactDOM from 'react-dom/client';
import App from './App';
     
const root = 
ReactDOM.createRoot(document.getElementById('root');
root.render(</App>);
```

- 
 Changes in Render callback

The render callback is removed from the new root API. But 
we can pass it as a property to the root component.
`root.render(</App callback={() => console.log("rendered")}>);`


---

## Updates on Server Side
There are some updates on **react-dom/server** API's to support suspense and streaming the server side page
~~`renderToString(React.Node)  `~~
`renderToPipeableStream(React.Node, options)`

---


# Improvements

### 1. Automatic Batching support for async calls
 **What is batching?**
 Multiple setState calls gets combined together and then re-render only once. 

**Why is it needed?**
Fewer re-renders for better performance.

Before this update, the automatic batching was applied to all state updates in React event handlers. But after the update, it supports async functions as well.
For the below snippet, the re-render would happen thrice. But with the update, it groups and re-render only once.
```javascript
 fetch('/someapi').then() => {
   setIsFetching(false);
   setError(null);
   setFormStatus('success')
 });
```

**Can we opt out of automatic batching?**
YES. Usually, batching is safe, but some code may depend on reading something from the DOM immediately after a state change. For those use cases, you can use ReactDOM.flushSync() to opt out of batching.

```javascript
import { flushSync } from ‘react-dom’;

flushSync(() => {
 // wraps state updates
});
```

### 2. Support for Suspense in Server Side Rendering (SSR)

**What is SSR?**
A technique were you render the HTML output of your React component and send the HTML from the server. So that the user has some UI to look at while the Javascript bundles are loading and before it becomes interactive. 

**What is Suspense?**
Suspense is a concept to show a placeholder/ fallback component until the component is ready.  
```javascript
<Suspense fallback={<Loader/>} >
  <Component />
</Suspense >
```
Before v18, Suspense was introduced into react in 16.6v (2018) limiting only to client-side .On server side, it would render all or nothing to the user, impacting the performance.
After v18, It provides support to render the website faster and improves the initial load time. 

### 3. Concurrency

**What is Concurrency ?**
Simply means interrupting an ongoing task.
We can tell React which updates are less urgent and can be delayed.
Urgent state updates can be prioritised over less priority updates.

Previously state updates order in which they were triggered.
With v18, we can change the priority using new API's called **Concurrent Features**-
**1. useTransition()**
Used in functional components. 
If there are 2 consecutive state updates, it may block the rendering of the UI, if the any of the update is expensive . So we can lower the priority of the state updates by wrapping them in useTransition

```javascript
const [isPending, startTransition] = useTransition();

setInputValue(value); 
startTransition(() => {
//less priority
 setResult(results);
});
...
return (isPending && <Spinner />);
```

**2. useDeferredValue() -**

Tell React to show older value, until the new value is ready similar to startTransition but cannot be used in cases where you don’t have full control over state update. Maybe the state update is happening in other 3rd party library and you just have the updated value.

`const deferredVal = useDeferredValue(stateValue)
`

---

## New APIS for library developers 
(As application developer, we might not need these)

1. useSyncExternalStore - is a new hook that allows external stores to support concurrent reads.
2. useInsertionEffect - is a new hook that allows CSS-in-JS libraries.
3. useId - is a new hook that generates unique ids for components. Useful for design systems
 
---
## Conclusion


These new features makes the websites faster, giving a good user experience and optimises the performance mainly in SSR. 
Things to look forward to in the upcoming versions - 

- Suspense supporting data fetching where manually rendering the fallback component is taken care by React itself.
- Server components (alpha stage) to use React components on server side. 
