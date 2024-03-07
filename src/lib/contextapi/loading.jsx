// contexts/LoadingContext.js
"use client"
import { toast } from '@/components/ui/use-toast';
import React, { createContext, useContext, useState } from 'react';
import { useToast } from "@/components/ui/use-toast"
const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const showLoadingToast = () => {
    setIsLoading(true);
    toast({
        title: "Loading",
      })
    // Add logic to display toast (you can use a toast library or implement your own)
  };

  const hideLoadingToast = () => {
    setIsLoading(false);
    
    // Add logic to hide the toast
  };

  return (
    <LoadingContext.Provider value={{ isLoading, showLoadingToast, hideLoadingToast }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  return useContext(LoadingContext);
};
