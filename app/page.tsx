'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  let router = useRouter();

  useEffect(() => {
    
    router.push('/logIn');
  
    
  }, [])
  

  
  return (
    <main>
      
    </main>
  );
}
