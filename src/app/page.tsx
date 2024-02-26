"use client"
import { useEffect } from "react";
require('dotenv').config();
// pages/myPage.tsx
const MyPage = () => {
    // Redirect to "/Dashboard" on the client side
    useEffect(() => {
      window.location.href = '/Dashboard';
    }, []);
  
    // Your component JSX goes here
    return (
      <div>
     Hi
      </div>
    );
  };
  
  export default MyPage;
  