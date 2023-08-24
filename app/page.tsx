'use client'
import { useRouter } from "next/navigation";

export default function Home() {

  let router = useRouter();
  router.push('/logIn');
  
  return (
    <main>
      
    </main>
  );
}
