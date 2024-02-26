"use client"
import React, { useContext, useEffect } from "react";
import Navbar from "@/components/ui/Navbar";
import { useUserContext } from "@/lib/contextapi/UserProvider";

const ProfilePage = () => {
  const { state: { user } } = useUserContext();

  useEffect(() => {
    // You can add additional logic if needed
  }, [user]);

  return (
    <div className="w-screen h-screen bg-black text-white">
   
   <div className="flex flex-col gap-4 items-center justify-center text-white">
  {user ? (
    <>
      <h2 className="text-xl">Welcome, {user.firstName} {user.lastName}!</h2>
      <p>Email: {user.email}</p>
      
    </>
  ) : (
    <p>Loading user data...</p>
  )}
</div>

    </div>
  );
};

export default ProfilePage;
