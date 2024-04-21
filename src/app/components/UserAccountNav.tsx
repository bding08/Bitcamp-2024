"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UserAccountNav = () => {
  const router = useRouter();

  const onClick = () => {
    signOut({
      redirect: true,
      callbackUrl: "/",
    });
    router.refresh();
  };

  return <a onClick={onClick}>Sign Out</a>;
};

export default UserAccountNav;
