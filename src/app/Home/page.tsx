"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
  import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
  

const Home=()=>{
  const [formData, setFormData] = useState({
    title: "",
  });

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log(formData);
    try {

      const response = await fetch("http://localhost:4000/api/v1/form/createForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful. Received data:", data);
      } else {
        console.error("Login failed. Status:", response.status);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };


return(
    <div className="w-screen h-screen bg-black text-white">
     <nav className="w-[80%]  mx-auto">
        <ul className="flex flex-row flex-wrap items-center justify-between">
            <li>SurveyForm</li>
            <li>Home</li>
            <li>Profile</li>
        </ul>
     </nav>
     <div className="flex flex-col  flex-wrap h-[100%] items-center justify-around  w-[90%] mx-auto">
    <div className="z-10">
     <Dialog>
  <DialogTrigger>Add form</DialogTrigger>
  <DialogContent>
    <DialogHeader>
     <div className=" flex flex-col items-center gap-3 justify-center ">
     <DialogTitle className="text-3xl">Form</DialogTitle>
      <DialogDescription>
       <div className=" flex flex-col text-xl min-w-[100%] flex-wrap gap-3 items-center">
        <label className="text-black"> Enter the Title of the form</label>
        <input
            id="title"
            onClick={(e) => handleInputChange("title", e.target.value)}
        className="text-black border-4 " type="text"></input>
        <button onClick={handleSubmit} className="bg-black text-white rounded-xl p-4" >Done</button>
       </div>
       
     
      </DialogDescription>
     </div>
    </DialogHeader>
  </DialogContent>
</Dialog>
     </div>
     {/* <div>
     <Drawer>
  <DrawerTrigger>Open</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Are you absolutely sure?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>

     </div> */}


     </div>
    </div>
)

}

export default Home;