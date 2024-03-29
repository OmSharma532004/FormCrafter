"use client"
import { UserProvider, useUserContext } from "@/lib/contextapi/UserProvider";
import React, { useEffect, useState } from "react"
import { MdDelete } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Navbar from "@/components/ui/Navbar"
import { useToast } from "@/components/ui/use-toast"

require('dotenv').config();
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
import Link from "next/link";
  

  const Home2=()=>{
    // Assuming you are using Node.js


// Your API URL
const { toast } = useToast();
const [dialogInput, setDialogInput] = useState(false);
const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
interface UserForm {
  _id: string;
  title: string;
  // other properties...
}
interface selected {

  title: string;
  // other properties...
}
    const [noOfInputs,setNoOfInputs]=useState("0");
    const [addInput,setAdd]=useState(false);
    const { state, dispatch } = useUserContext();
    const user=state?.user;
    useEffect(()=>{
      console.log(state);

    },[])
    const [isFormDetailsDialogOpen, setFormDetailsDialogOpen] = useState(false);
    const [userForms, setUserForms] = useState<UserForm[]>([]);
    const [selectedForm, setSelectedForm] = useState<selected>();
    const [formId, setFormId] = useState("");
  
 
  
    const fetchUserForms = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/form/userForms?userId=${String(user?._id)}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          setUserForms(data.forms);
          console.log(userForms);
        } else {
          console.error("Failed to fetch user forms. Status:", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch user forms:", error);
      }
    };
    
    const [response2, setResponse] = useState<{ response: { Usera: string, answer: Record<string, string> } }[]>([]);
    const [inputs2, setInputs] = useState<{ inputs: { field: string, type: string, options?: string[] }[] }[]>([]);

    // Trigger the fetchUserForms function when the component mounts or when the user state changes
    useEffect(() => {
      if (user) {
        fetchUserForms();
      }
    }, [user]);
    const handleFormClick = (formId:string) => {
      // Fetch and display form details when a form is clicked
      fetchFormDetails(formId);
         console.log("id of the form is" ,formId);
    };
   
const fetchFormDetails = async (formId: string) => {
  try {
    const response = await fetch(`${apiUrl}/api/v1/form/FormDetail?formId=${formId}`);

    if (response.ok) {
      setInputs([]);
      setResponse([]);
      const data = await response.json();
      console.log(data);
      setSelectedForm(data.form);
      console.log(selectedForm);
      setFormId(data.form._id); 
      console.log("id of the form is" ,formId);
      setFormDetailsDialogOpen(true);

      // Fetch and display input details for each input
      data.form.input.forEach((inputId:string) => {
        fetchInputDetails(inputId);
      });

      // Fetch and display response details for each response
      data.form.response.forEach((responseId:string) => {
        fetchResponseDetails(responseId);
      });
    } else {
      console.error("Failed to fetch responses. Status:", response.status);
    }
  } catch (error) {
    console.error("Failed to fetch responses:", error);
  }
};

    const fetchInputDetails = async (inputId:string) => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/form/getINputDetails?inputId=${inputId}`);
    
        if (response.ok) {
          const data = await response.json();
         console.log(data);
         setInputs((prevData) => [...prevData, data]);
        console.log(inputs2);
        } else {
          console.error("Failed to fetch input. Status:", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch input:", error);
      }
    };

    const fetchResponseDetails = async (responseId:string) => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/form/getResponseDetails?responseId=${responseId}`);
    
        if (response.ok) {
          const data = await response.json();
         console.log(data);
         setResponse((prevData) => [...prevData, data]);
        console.log(response2);
        
        } else {
          console.error("Failed to fetch input. Status:", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch input:", error);
      }
    };
    
    
    
    
    const setUser = (user:string) => {
      dispatch({ type: "SET_USER", payload: user });
    };
    interface InputData {
      field: string;
      type: string;
      options?: Array<string>;
    }

    const [addedInputs, setAddedInputs] = useState<InputData[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    user:state?.user?._id,
  });
  const [inputData, setInput] = useState<{
    formId: string;
    field: string;
    type: string;
    options: string[]; // Specify that options is an array of strings
    userId?: string;
  }>({
    formId: "",
    field: "",
    type: "text",
    options: [], // Initialize options as an empty array of strings
    userId: state?.user?._id,
  });
  
  const handleInputChange2 = (name: string, value: string | number) => {
    setInput((prevData) => {
      if (name.startsWith("options")) {
        const optionIndex = Number(name.replace("options", ""));
        const updatedOptions = [...prevData.options];
        updatedOptions[optionIndex] = String(value); // Ensure value is a string
  
        return {
          ...prevData,
          options: updatedOptions,
        };
      }
  
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

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


  const handleSubmit2 = async () => {
   
    console.log(inputData);
    try {

      const response = await fetch(`${apiUrl}/api/v1/form/addInput`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Input added Successfully", data);
        setAddedInputs((prevInputs) => [...prevInputs, { field: inputData.field, type: inputData.type }]);

      } else {
        console.error("failed. Status:", response.status);
      }
     

    } catch (error) {
      console.error("Failed", error);
    }
  };
  const handleDelete = async (formId:string) => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/form/deleteForm?formId=${formId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Form Deleted Successfully", data);
        fetchUserForms();
      } else {
        console.error("failed. Status:", response.status);
      }
    } catch (error) {
      console.error("Failed", error);
    }
  }

  const handleInputChange = (name:string, value:string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log(formData);
    try {

      const response = await fetch(`${apiUrl}/api/v1/form/createForm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Form Created Successfully", data);
        setInput((prevInputData) => {
          const updatedInputData = { ...prevInputData, formId: data.form._id };
          setAdd(true);
          toast({
            title: "Success",
            description: "Form Created Successfully",
          });
          return updatedInputData;
        });
      } else {
        console.error("failed. Status:", response.status);
        toast({ 
          title: "Error",
          description: response.statusText || "Error Creating Form",
          variant: "destructive",
        });
      }

    } catch (error:any) {
      console.error("Failed", error);
      toast
      ({
        title: "Error",
        description: error.message || "Error Creating Form",
        variant: "destructive",
      });
    }
  };


return(
    <div className=" w-screen flex flex-col items-center justify-center h-screen home">
      <h1 className=" bg-white text-black p-4 rounded-xl text-3xl">FormCrafter</h1>
      <div className="w-[80%] h-[80%] overflow-scroll  bg-black text-white">
     <nav className="  mx-auto">
     <Navbar user={state.user} handleLogout={handleLogout}/>
     </nav>
     <div className="flex flex-col   h-[100%] items-center justify-center  w-[100%] ">
   {state.user?._id?( <div className="z-10 mx-auto flex flex-col   h-[100%] items-center justify-around  w-[100%] gap-2">
     <Dialog >
  <DialogTrigger><div className=" bg-white text-black p-4 rounded-lg">Add Form</div></DialogTrigger>
  <DialogContent>
    <DialogHeader>
     <div className=" flex flex-col items-center gap-3 justify-center ">
     <DialogTitle className="text-3xl">Form</DialogTitle>
      <DialogDescription>
     
       {
      addInput?(<>
       
      <div className="text-xl flex flex-col gap-4">
        <h1 className=" text-black">{formData.title}</h1>
        
      <Dialog open={dialogInput}>
  <DialogTrigger><div onClick={()=>{
    setDialogInput(true)
  }} className="bg-black text-white p-4 rounded-lg" >Add Input</div></DialogTrigger>
  {addedInputs.length > 0 && (
        <div className=" bg-black text-white">
          <h1>Added Inputs:</h1>
          <ul className="flex flex-col justify-center items-center gap-4">
            {addedInputs.map((input, index) => (
              <li key={index}>{`${input.field} - ${input.type}`}</li>
            ))}
          </ul>
        </div>
      )}
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Input</DialogTitle>
      <DialogDescription>
     <div className=" flex flex-col items-center justify-center">
      <label>Enter the Label You Want to add</label>
      <input onChange={(e)=>{
        handleInputChange2("field",e.target.value);
      }}  name="field" className=" border-2" type="text"></input>
      <label>Enter the type of response you want</label>
      <select  onChange={(e) => {
  handleInputChange2("type", e.target.value);
}}>
  
  <option value="text">Text</option>
  <option value="radio">radio</option> 
   <option value="checkbox">checkbox</option>

  
</select>

{
  inputData.type=="radio"?(<>
  <label>Enter the no of radio buttons you want</label>
  <input onChange={(e)=>{
setNoOfInputs(e.target.value);
  }} name="options" className=" border-2" type="number"></input>
  {Array.from({ length: Number(noOfInputs) }).map((_, index) => (
    <div key={index}>
      <label>Enter the label</label>
      <input
        onChange={(e) => {
          handleInputChange2(`options${index}`, e.target.value);
        }}
        name={`options${index}`}
        className="border-2"
        type="text"
      ></input>
     
    </div>
  ))}

  
  </>):(<></>)

}

<button className="bg-black text-white p-4 rounded-lg"  onClick={()=>{
  handleSubmit2();
  setDialogInput(false);
 
}}>
  
  Add Input Section
</button>

     
     </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>


      </div>
      </>):(<>  <div className=" flex flex-col text-xl min-w-[100%] flex-wrap gap-3 items-center">
        <label className="text-black"> Enter the Title of the form</label>
        <input
            id="title"
            onChange={(e) => handleInputChange("title", e.target.value)}
        className="text-black border-4 " type="text"></input>
        <button onClick={()=>{
          handleSubmit();
       
        }} className="bg-black text-white rounded-xl p-4" >Done</button>

       </div></>)
       }

       
     
      </DialogDescription>
     </div>
    </DialogHeader>
  </DialogContent>
</Dialog>
<h2 className="text-xl ">Your Forms:</h2>
<div className="flex flex-row w-[70%] flex-wrap justify-center gap-4 items-center text-white">
        
          {userForms.map((form) => (
            <div  key={form._id} className=" flex gap-4 flex-col items-center justify-center">
              <div
             
              className="cursor-pointer hover:bg-black flex-col hover:text-white transition-all duration-200 bg-white text-black w-[100px] h-[100px] flex items-center justify-center hover:underline"
            
              
            >
              <p   onClick={() => handleFormClick(form._id)}>{form.title}</p>
             
      
            </div>
            <div onClick={ ()=>{
                handleDelete(form._id);
                
              }}> <MdDelete style={{fontSize:"2rem"}} /> </div>
            </div>
            
          ))}
        </div>
   <div className="bg-white text-black ">     {selectedForm ?(
        <div className=" overflow-scroll" onDoubleClick={()=>{
          setFormDetailsDialogOpen(false);
        }}>
           <Dialog  open={isFormDetailsDialogOpen} >
  <DialogContent className=" overflow-scroll h-[100%]">
    <DialogHeader>
     
    </DialogHeader>
    {/* Display all details of the form here */}
    <div className=" flex flex-col items-center justify-center bg-white text-black p-4 rounded-lg">
  <h2 className="text-xl text-black">Form Details:</h2>
  <p>Title: {selectedForm ? selectedForm.title : "N/A"}</p>
  <h3>Form:</h3>
  <div className="bg-black flex flex-col flex-wrap overflow-scroll justify-center items-center text-white p-4">
  {inputs2.map((form, formIndex) => (
  <div key={formIndex}>
  
    <form>
      {form.inputs.map((inputData, index) => (
        <div className=" flex gap-4 items-center justify-center  mt-3" key={index}>
          <label>{inputData.field}</label>
          {inputData.type === 'text' && (
            <input className="text-black" type="text" />
          )}
          {inputData.type === 'radio' && (
        <>
        {
          inputData.options && inputData.options.length > 0 && (
            <div>
              {inputData.options.map((option) => (
                <label key={option}>
                  <input className="text-black" type="radio" />
                  {option}
                </label>
              ))}
            </div>
          )
        }
        </>
            
          )}
          {inputData.type === 'checkbox' && (
            <input className="text-black" type="checkbox" />
          )}
          {/* Add more input types as needed */}
        </div>
      ))}
    </form>
  </div>
))}
  </div>



<div className=" flex flex-col items-center justify-center">
<h3 className=" text-black text-xl">Responses:</h3>
<div>
{response2.map((responseData, index) => (
  <div className="flex flex-col    items-center justify-center" key={index}>
   <div className="">
   <p className=" bg-black  text-white p-4">User: {responseData.response.Usera};</p>
    {responseData.response.answer && (
      <div>
        <h3>Answer:</h3>
        {Object.entries(responseData.response.answer).map(([key, value]) => (
          <div key={key}>
            <p>{key}: {value}</p>
          </div>
        ))}
      </div>
    )}
   </div>
  </div>
))}
</div>
</div>



  {/* Add more form details as needed */}
</div>
<Dialog> 
  <DialogTrigger>
    <div className="bg-black text-white p-4 rounded-lg">Share</div>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Share</DialogTitle>
    </DialogHeader>
    <DialogDescription className=" flex flex-col items-center justify-center gap-4">
      <p>Copy the link to share the form with others.</p>
      
      <p className=" ">To fill the form -: <Link className="text-blue-500" href={{ pathname: `/SubmitForm`,
    query: {
      formId: formId,
    },}}>Click Here</Link></p>
    <p><b className=" text-blue-500">`https://survey-form2-seven.vercel.app/SubmitForm?formId=${formId}`</b>  <button>
      <button onClick={() => {
        navigator.clipboard.writeText(`https://survey-form2-seven.vercel.app/SubmitForm?formId=${formId}`);
      }}>Copy URL</button>
      </button></p>
    </DialogDescription>
  </DialogContent>
</Dialog>

<h1 className=" text-black text-lg">Double click to close</h1>
  </DialogContent></Dialog>
          </div>
        ):(<></>)}</div>
     

     </div>):(<><div className=" flex gap-4 flex-col items-center justify-center">
      <p>Login First to Visit Dashboard and create Forms</p>
     <button className=" p-4 rounded-xl bg-white text-black "> <Link href="/auth/login">Login</Link></button>
      </div></>)}
    


     </div>
    </div>
    </div>
)

}

export default Home2;

