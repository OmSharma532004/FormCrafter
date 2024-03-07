"use client"
import React, { useState, useEffect } from "react";
import { UserProvider, useUserContext } from "@/lib/contextapi/UserProvider";
import Navbar from "@/components/ui/Navbar";
import Link from "next/link";
import { Sub } from "@radix-ui/react-dropdown-menu";
import SignInForm from "../auth/login/page";
import { toast } from "@/components/ui/use-toast";
require('dotenv').config();
import { useRouter } from 'next/router';

const SubmitForm = () => {

  
  const setUser = (user:string) => {
    dispatch({ type: "SET_USER", payload: user });
  };
    const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
    const [formDetails, setFormDetails] = useState<{ title: string, input: any[], _id: string } | null>(null);
    const [userResponses, setUserResponses] = useState<Record<string, any>>({});

    const { state, dispatch } = useUserContext();
    const user = state.user;

    const handleLogin = () => {
      // Redirect the user to the login page and store the current URL as a query parameter
      const redirectUrl = `/auth/login?redirect=${encodeURIComponent(window.location.pathname)}&formId=${encodeURIComponent(formDetails?._id || '')}`;
      window.location.href = redirectUrl;    };
    const handleLogout = async () => {
      try {
        console.log(apiUrl);
        // Make a request to your server to invalidate the token and perform logout
        const response = await fetch(`${apiUrl}/api/v1/auth/logout`, {
          method: "POST", // or "GET" depending on your server implementation
          headers: {
            "Content-Type": "application/json",
            // Include any necessary authentication headers (e.g., token)
            // ...
          },
          // Body can be empty for some logout implementations
          // body: JSON.stringify({}),
        });
  
        if (response.ok) {
          // Optionally, clear any user-related data from the frontend state
          console.log("Logout successful...");
          setUser("");
          localStorage.removeItem("token"); // Replace "yourTokenKey" with the actual key used to store the token
          localStorage.removeItem("user"); // Replace "yourTokenKey" with the actual key used to store the token
  
  
          // Redirect or perform any additional actions after successful logout
          // For example, you might redirect the user to the login page
          window.location.href = "/auth/login";
        } else {
          const errorData = await response.json();
          console.error("Error logging out:", errorData.message);
        }
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };
    useEffect(() => {
        const fetchFormDetails = async () => {
            try {
                // Extract the formId from the query parameters
                const urlParams = new URLSearchParams(window.location.search);
                const formId = urlParams.get("formId");
        
                if (formId) {
                    const response = await fetch(`${apiUrl}/api/v1/form/formById?formId=${formId}`);
                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                        setFormDetails(data.form);
                    } else {
                        console.error("Failed to fetch form details. Status:", response.status);
                        setFormDetails(null);
                    }
                } else {
                    console.error("FormId not found in the URL");
                    setFormDetails(null);
                }
            } catch (error) {
                console.error("Failed to fetch form details:", error);
                setFormDetails(null);
            }
        };
        

        fetchFormDetails();
    }, []);

    const handleSubmit = async () => {
        try {
            if (formDetails) {
                const response = await fetch(`${apiUrl}/api/v1/form/addResponse`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        formId: formDetails._id,
                        answer: userResponses,
                        userAnswerId: user,
                    }),
                });

                if (response.ok) {
                    console.log("Responses submitted successfully");
                    toast({
                      title: "Response Submitted",
                      description: "Response Submitted Successfully",
                 
                    })
                    setUserResponses({})
                    // Optionally, you can reset the form or perform other actions
                } else {
                    console.error("Failed to submit responses. Status:", response.status);
                }
            }
        } catch (error) {
            console.error("Failed to submit responses:", error);
        }
    };

    return (
        <div className="home relative text-white min-h-screen min-w-screen flex flex-col justify-center items-center">
            <nav className="w-[100%] absolute top-0  mx-auto">
            <Navbar user={state.user} handleLogout={handleLogout}/>
            </nav>
            {
              user?(<>
               {formDetails && (
        <div className=" p-4 rounded-lg bg-white flex items-center justify-center  flex-col  text-black">
          <h2 className=" font-bold">Name:-  {formDetails.title}</h2>
          <form className=" flex  flex-col justify-center items-center gap-4 p-4">
            {formDetails.input && formDetails.input.map((input: { _id: string, field: string, type: string, options?: string[] }) => (
              <div className=" flex flex-row items-center justify-center gap-4" key={input._id}>
                <label>{input.field}</label>
                {input.type === "text" && (
                  <input
                  className="text-black border-2 border-black"
                    type="text"
                    required={true}
                    value={userResponses[input.field] || ""}
                    onChange={(e) =>
                      setUserResponses((prevResponses) => ({
                        ...prevResponses,
                        [input.field]: e.target.value,
                      }))
                    }
                  />
                )}
                {input.type === "radio" && input.options && input.options.length > 0 && (
                  /* Render radio button options based on your data structure */
                  <div>
                    {input.options.map((option) => (
                      <label key={option}>
                        <input
                        className="text-black"
                          type="radio"
                          required={true}
                          name={input.field}
                          value={option}
                          checked={userResponses[input.field] === option}
                          onChange={(e) =>
                            setUserResponses((prevResponses) => ({
                              ...prevResponses,
                              [input.field]: e.target.value,
                            }))
                          }
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                )}
                {input.type === "checkbox" &&  (
                  /* Render checkbox options based on your data structure */
                <>
              
                <input   type="checkbox"  onChange={(e)=>{
                  if(e.target.checked){
                    setUserResponses((prevResponses) => ({
                      ...prevResponses,
                      [input.field]: "yes",
                    }))
                  }
                  else{
                    setUserResponses((prevResponses) => ({
                      ...prevResponses,
                      [input.field]: "no",
                    }))
                  }

                }} ></input>
                
                </>
                )}
              </div>
            ))}
          </form>
          <button type="submit" className=" bg-black text-white  p-4 rounded-lg"  onClick={()=>{
            handleSubmit()
          
          }}>Submit Responses</button>
        </div>
      )}
              </>):(<>
              <div className=" bg-white p-4 flex-col items-center justify-center flex">
              <h1 className=" text-3xl bg-white text-black">You need to Login before submitting this Form</h1>
              <button className=" bg-black text-white rounded-xl text-xl p-4" onClick={handleLogin}>Login</button>
              
              </div>
              </>)
            }
           
        </div>
    );
};

export default SubmitForm;
