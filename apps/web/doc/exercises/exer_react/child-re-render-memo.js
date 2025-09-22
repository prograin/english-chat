import React, { useState } from "react";

// بدون memo → هر بار Parent رندر شود، Child هم دوباره رندر می‌شود
function Child() {
  console.log("Child rendered");
  return <p>I'm a child</p>;
}

// با memo → فقط وقتی props تغییر کند رندر می‌شود
const MemoChild = React.memo(() => {
  console.log("MemoChild rendered");
  return <p>I'm a memoized child</p>;
});

function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Increment: {count}</button>

      {/* {Everytime it is re rendered} */}
      <Child />

      {/* {it is not re rendered} */}
      <MemoChild />
    </div>
  );
}

export default Parent;
