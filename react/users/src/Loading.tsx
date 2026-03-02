import { useEffect, useState } from "react";

const Loading = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return <div className="loading-container"><h2>Loading{".".repeat(count)}</h2></div>;
};

export default Loading;