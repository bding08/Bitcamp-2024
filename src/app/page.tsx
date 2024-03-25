"use client";

import { Button, buttonVariants } from "./components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const onClick = () => {
    router.push("/user-home-page");
    router.refresh();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-4xl">Public Home Page</h1>

      <Button className=" flex content-center	justify-center" onClick={onClick}>
        Go to my Home Page
      </Button>
    </div>
  );
}
