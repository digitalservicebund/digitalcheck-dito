import { useEffect } from "react";

export default function TestError() {
  useEffect(() => {
    throw new Error("test error");
  });

  return <p>Test error</p>;
}
