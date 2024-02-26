import React, { useState, useEffect } from "react";
interface FormComponentProps {
    formId: string; // Assuming formId is a string, update it according to your data type
  }
  
  const FormComponent: React.FC<FormComponentProps> = ({ formId }) => {
  const [formInputs, setFormInputs] = useState([]);
  const [userResponses, setUserResponses] = useState({});

  useEffect(() => {
    // Fetch form details (inputs) based on formId
    const fetchFormDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/form/getFormDetails/${formId}`);
        if (response.ok) {
          const formData = await response.json();
          setFormInputs(formData.inputs);
        } else {
          console.error("Failed to fetch form details");
        }
      } catch (error) {
        console.error("Error fetching form details:", error);
      }
    };

    fetchFormDetails();
  }, [formId]);

  const handleInputChange = (field:string, value:string) => {
    setUserResponses((prevResponses) => ({
      ...prevResponses,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/form/addResponse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formId,
          answer: userResponses,
        }),
      });

      if (response.ok) {
        console.log("Response submitted successfully");
        // Optionally, you can reset the form or navigate to another page upon successful submission
      } else {
        console.error("Failed to submit response. Status:", response.status);
      }
    } catch (error) {
      console.error("Error submitting response:", error);
    }
  };

  return (
    <div>
      <h2>Form Inputs</h2>
      <form>
        {formInputs.map((input) => (
          <div key={input.field}>
            <label>{input.field}</label>
            {input.type === "text" && (
              <input
                type="text"
                onChange={(e) => handleInputChange(input.field, e.target.value)}
              />
            )}
            {/* Add more input types as needed */}
          </div>
        ))}
        <button type="button" onClick={handleSubmit}>
          Submit Response
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
