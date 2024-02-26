"use client"
import React, { useState, useEffect } from "react";
import { UserProvider, useUserContext } from "@/lib/contextapi/UserProvider";
import Navbar from "@/components/ui/Navbar";
import Link from "next/link";
require('dotenv').config();
const FillForm = () => {

  const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
  const [searchQuery, setSearchQuery] = useState("");
  const [formDetails, setFormDetails] = useState(null);
  const [userResponses, setUserResponses] = useState({});
  const { state, dispatch } = useUserContext();
  const user=state.user;
  // Function to fetch form details based on search query
  const fetchFormDetails = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/form/searchForm?formName=${searchQuery}`);
      if (response.ok) {
        const data = await response.json();
       
        console.log(data);
        setFormDetails(data.form);
      } else {
        console.error("Failed to fetch form details. Status:", response.status);
        setFormDetails(null);
      }
    } catch (error) {
      console.error("Failed to fetch form details:", error);
      setFormDetails(null);
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/form/addResponse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formId: formDetails._id,
          answer: userResponses,
          userAnswerId:user,
        }),
      });

      if (response.ok) {
        console.log("Responses submitted successfully");
        // Optionally, you can reset the form or perform other actions
      } else {
        console.error("Failed to submit responses. Status:", response.status);
      }
    } catch (error) {
      console.error("Failed to submit responses:", error);
    }
  };

  // Fetch form details when searchQuery changes
  

  return (
    <div className="bg-black relative text-white min-h-screen min-w-screen flex flex-col justify-center items-center">
        <nav className="w-[80%]  mx-auto">
    <Link className=" absolute top-0" href={"/Dashboard"}>Home</Link>
     </nav>
      <input
      className="text-black"
        type="text"
        placeholder="Enter form name"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={() => fetchFormDetails()}>Search</button>
      {formDetails && (
        <div>
          <h2>{formDetails.title}</h2>
          <form className=" flex flex-col justify-center items-center gap-4 p-4">
            {formDetails.input && formDetails.input.map((input) => (
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
                    {input.options.map((option) => (
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
                                : (prevResponses[input.field] || []).filter((val) => val !== option),
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

export default FillForm;
