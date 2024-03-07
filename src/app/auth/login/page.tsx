"use client";
import { useState } from "react";
import Link from "next/link";
import { UserProvider, useUserContext } from "@/lib/contextapi/UserProvider";
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import {useLoading} from "@/lib/contextapi/loading";
require('dotenv').config();
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function SignInForm() {
  const { showLoadingToast, hideLoadingToast } = useLoading();
  const { toast } = useToast();
  const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { state, dispatch } = useUserContext();

    const setUser = (user:string) => {
      
      dispatch({ type: "SET_USER", payload: user });
      console.log(state);
    };


  const handleInputChange = (name:string, value:string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    showLoadingToast();
    console.log(state._id);
    try {

      console.log(state.user);
      const response = await fetch(`${apiUrl}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful. Received data:", data);
        setUser(data.user);
        console.log(state.user)
        hideLoadingToast();
        toast({
          title: "Success",
          description: "Login successful",
        })
        localStorage.setItem("token", JSON.stringify(data.token))
        localStorage.setItem("user", JSON.stringify(data.user))
        const urlSearchParams = new URLSearchParams(window.location.search);
        const formIdQuery = urlSearchParams.get("formId");
  
        // Construct the new redirect URL with the formId if it exists
        const redirectPath = formIdQuery ? `/SubmitForm?formId=${formIdQuery}` : "/Dashboard";
  
        // Redirect to the specified path
        window.location.href = redirectPath;
      
      } else {
        console.error("Login failed. Status:", response.status);
        toast({
          title: "Error",
          description: response.statusText || "Login failed",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      console.error("Error during login:", error);
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      })
    }
  };

  return (
    <div className="relative flex flex-col bg-black text-white justify-center items-center min-h-screen overflow-hidden">
        <h1 className=" text-4xl mt-5 font-bold"> Welcome To Survey Form</h1>
      <div className="w-full  m-auto h-full text-black bg-white lg:max-w-lg">
       
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
           LOG IN
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to sign up
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder=""
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button  className="w-full" onClick={handleSubmit}>
             login
            </Button>
            <p className="mt-2 text-xs text-center text-gray-700">
              need to have an account?{" "}
              <Link href="/auth/signup">
      <span className="text-blue-600 hover:underline">Sign Up</span>
    </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
