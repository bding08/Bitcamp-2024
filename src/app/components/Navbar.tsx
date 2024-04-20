import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { SlidersHorizontal, Users } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";

const navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    //' py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'
    <div className="py-2 bg-zinc-100 border-b border-s-zinc-200 fixed w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-10">
          <Link href="/">
            <Users />
          </Link>
          <Link href="/user-recommendations">
            <Button variant="outline2">Recommended Activities</Button>
          </Link>
          <Link href="/active-groups-page">
            <Button variant="outline2">User Groups</Button>
          </Link>
        </div>
        <div>
          {session?.user ? (
            <div className="flex justify-between items-center space-x-12">
              <UserAccountNav />
              <Link href="/interests">
                <SlidersHorizontal />
              </Link>
            </div>
          ) : (
            <Link className={buttonVariants()} href="/sign-in">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default navbar;
