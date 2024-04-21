import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { Settings, SlidersHorizontal, User, Users } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";
// import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    //' py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'
    <div className="py-2 bg: bg-zinc-900  fixed w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-10">
          <Link className="text-white" href="/">
            Conntected
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <User color="white" size={32} cursor={"pointer"} />

                {/* <Button variant="outline">Settings</Button> */}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>
                  Hi, {session.user.username}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link href="/interests">Edit Interests</Link>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <UserAccountNav />
                  {/* Log out */}
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // <div className="flex justify-between items-center space-x-12">
            //   <UserAccountNav />
            //   <Link href="/interests">
            //     <SlidersHorizontal />
            //   </Link>
            // </div>
            <a href="/sign-in">
              <Button variant="outline2">Sign In</Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default navbar;
