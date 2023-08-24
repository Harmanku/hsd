"use client";

import { useUserContext } from "@/app/providers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RouteGuard() {
    const userSystem = useUserContext();

    const router = useRouter();
    useEffect(() => {
    
    
    if (!userSystem?.user || !userSystem?.system) {        
        //router.push('/logIn');        
    }

    return () => {      
    };
  }, []);

  return <></>;
}
