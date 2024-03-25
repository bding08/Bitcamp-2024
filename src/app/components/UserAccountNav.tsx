"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const UserAccountNav = () => {
  const router = useRouter();

  const onClick = () => {
    signOut({
      redirect: true,
      callbackUrl: "/",
    });
    router.refresh();
  };

  return (
    <Button onClick={onClick} variant="destructive">
      Sign Out
    </Button>
  );
};

export default UserAccountNav;
