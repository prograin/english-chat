import React, { useState, useContext, createContext } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [name, setName] = useState("ali");

  return <AuthContext.Provider value={{ name, setName }}>{children}</AuthContext.Provider>;
}

// Consumes context (name).
// Will rerender whenever name changes.
function ChildComponent() {
  const { name, setName } = useAuth();

  return (
    <div>
      <p>Hello, {name}</p>
      <button onClick={() => setName("reza")}>Change Name</button>
    </div>
  );
}

// Consumes context (name).
// Will rerender whenever name changes.
function ChildComponent_2() {
  const { name, setName } = useAuth();

  return (
    <div>
      <p>Hello, {name}</p>
    </div>
  );
}

// Does not call useAuth().
// it will NOT rerender when the context value changes.
function ChildComponent_2() {
  return (
    <div>
      <p>Hello, {name}</p>
    </div>
  );
}

// Usage
function App() {
  return (
    <AuthProvider>
      <ChildComponent_2 />
      <ChildComponent />
    </AuthProvider>
  );
}
