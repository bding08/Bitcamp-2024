"use client";

import { Users } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { toast } from "./ui/use-toast";

interface InterestPageFooterProp {
  email: string | null | undefined;
  interests: string[];
}

const InterestPageFooter: FC<InterestPageFooterProp> = (
  prop: InterestPageFooterProp
) => {
  //   const session = await getServerSession(authOptions);
  const router = useRouter();

  const handleClick = async () => {
    const response = await fetch("/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: prop.email,
        interests: prop.interests,
      }),
    });

    if (response.ok) {
      router.refresh();
      router.push("/user-recommendations");
    } else {
      toast({
        title: "Error Updating Interests",
        description: "Something went wrong!",
        variant: "destructive",
      });
    }
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
