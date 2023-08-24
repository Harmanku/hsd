"use client";


import { useUserContext } from "../app/Providers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function RouteGuard() {
    const userSystem:any = useUserContext();
  
    const router = useRouter();
    useEffect(() => {
    
    
    if (!userSystem?.user || !userSystem?.system) {        
        router.push('/logIn');        
    }

    return () => {      
    };
  }, []);

  return <></>;
}
