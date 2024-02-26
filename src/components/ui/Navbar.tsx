import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define the type for the user object
interface User {
  firstName: string;
  // Add other properties as needed
}

// Define the type for the handleLogout function
type HandleLogout = () => void;

interface NavbarProps {
  user?: User; // The user can be optional if it may not be present
  handleLogout: HandleLogout;
}

const Navbar: React.FC<NavbarProps> = ({ user, handleLogout }) => {
  return (
    <nav className="w-[80%]  mx-auto">
      <ul className="flex flex-row flex-wrap items-center justify-between">
        <Link href={"/Dashboard"}>Home</Link>
        <Link href={"/FillForm"}>Search Forms</Link>
        {user ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{user.firstName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={"/Profile"}>Profile</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Link href={"/auth/login"}>Login</Link>
            <Link href={"/auth/signup"}>Signup</Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
