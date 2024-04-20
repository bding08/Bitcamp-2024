"use client";

import { Button, buttonVariants } from "./components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="space-y-4">
      <h1 className="text-4xl">Public Home Page</h1>
    </div>
  );
}
