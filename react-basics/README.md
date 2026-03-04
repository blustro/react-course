# My First React Project: Core Fundamentals

This project serves as a practical exploration of React's core principles. It documents my transition from imperative DOM manipulation to a declarative, component-based architecture.

---

## 🚀 Core Concepts Covered

### 1. JSX (JavaScript XML)

JSX allows us to write HTML-like structures directly inside JavaScript. It’s a syntax extension that React transforms into actual DOM elements.

### 2. Component Creation

The building blocks of React. I focused on **Functional Components**, which are JavaScript functions that return JSX.

### 3. Props & Destructuring

Props are how we pass data from a parent to a child. I used **Destructuring** to keep the code clean and readable.

Example:
const User = ({ name }) => <h1>{name}</h1>;

### 4. The Guard Operator (&&)

Used for **Conditional Rendering**. If the condition on the left is true, the element on the right is rendered.

- Example: {isLoggedIn && <Dashboard />}

### 5. Lifting State Up

When two sibling components need to share the same data, we move the state to their nearest common parent and pass it back down via props.

---

## 🎣 React Hooks

Hooks allow us to manage state and lifecycle features in functional components.

| Hook          | Purpose                                                                |
| :------------ | :--------------------------------------------------------------------- |
| **useState**  | Manages local state (e.g., counters, inputs).                          |
| **useEffect** | Handles side effects (e.g., API calls, subscriptions).                 |
| **useRef**    | References DOM elements or stores mutable values without re-rendering. |
