"use client"
import React, { useState, useEffect } from "react";
import { UserProvider, useUserContext } from "@/lib/contextapi/UserProvider";
import Navbar from "@/components/ui/Navbar";
import Link from "next/link";
import { Sub } from "@radix-ui/react-dropdown-menu";
require('dotenv').config();


const SubmitForm = () => {
    
    const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
    const [formDetails, setFormDetails] = useState<{ title: string, input: any[], _id: string } | null>(null);
    const [userResponses, setUserResponses] = useState<Record<string, any>>({});

    const { state, dispatch } = useUserContext();
    const user = state.user;

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
        <div className="bg-black relative text-white min-h-screen min-w-screen flex flex-col justify-center items-center">
            <nav className="w-[80%]  mx-auto">
                <Link className=" absolute top-0" href={"/Dashboard"}>
                    Home
                </Link>
            </nav>
            {formDetails && (
        <div>
          <h2>{formDetails.title}</h2>
          <form className=" flex flex-col justify-center items-center gap-4 p-4">
            {formDetails.input && formDetails.input.map((input: { _id: string, field: string, type: string, options?: string[] }) => (
              <div key={input._id}>
                <label>{input.field}</label>
                {input.type === "text" && (
                  <input
                  className="text-black"
                    type="text"
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
                {input.type === "checkbox" && input.options && input.options.length > 0 && (
                  /* Render checkbox options based on your data structure */
                  <div>
                     {input.options.map((option: string) => (  // Add type annotation for 'option'
      <label key={option}>
        <input
          type="checkbox"
          name={input.field}
          value={option}
          checked={userResponses[input.field]?.includes(option) || false}
          onChange={(e) => {
            const isChecked = e.target.checked;
            setUserResponses((prevResponses) => ({
              ...prevResponses,
              [input.field]: isChecked
                ? [...(prevResponses[input.field] || []), option]
                : (prevResponses[input.field] || []).filter((val: string) => val !== option), // Add type annotation for 'val'
            }));
          }}
        />
        {option}
      </label>
    ))}
                  </div>
                )}
              </div>
            ))}
          </form>
          <button onClick={handleSubmit}>Submit Responses</button>
        </div>
      )}
        </div>
    );
};

export default SubmitForm;
