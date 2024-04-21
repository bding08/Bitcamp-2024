"use client";

import { Button, buttonVariants } from "./components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-row space-y-4 align-middle ">
      <img
        src="http://localhost:3000/images/workouts.jpg"
        width={1000}
        alt="pic"
      />
      <h1 className="text-4xl align-bottom">Home Page</h1>
    </div>
  );
}
