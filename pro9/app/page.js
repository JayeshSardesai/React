
import Image from "next/image";
import Navbar from "@/components/Navbar";
// import { useState } from "react";
export default function Home() {
  // const [count, setCount] = useState(0)
  return (
    <div>
      <Navbar />
      I am a component
      {/* {count}
      <button onClick={() => setCount(count + 1)}>Add</button> */}
    </div>
  );
}
