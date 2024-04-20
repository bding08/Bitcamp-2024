"use client";

import { Users } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { useRouter } from "next/navigation";

const InterestPageFooter = () => {
  //   const session = await getServerSession(authOptions);
  const router = useRouter();

  const handleClick = () => {
    router.push("/user-recommendations");
  };

  return (
    <div className="py-2 bg-zinc-100 border-b border-s-zinc-200 fixed w-full z-10 bottom-0">
      <div className="float-right px-10">
        <Button variant="outline" onClick={handleClick}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default InterestPageFooter;
