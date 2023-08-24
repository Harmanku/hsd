"use client";

import { createContext, useContext, useState } from "react";

const userAndSystemContext = createContext();

function Providers({ children }) {
  const [user, setUser] = useState(null);
  const [system, setSystem] = useState(null);
  const [partnerStories, setPartnerStories] = useState(null);

  return (
    <userAndSystemContext.Provider
      value={{
        user,
        system,
        partnerStories,
        setUser,
        setSystem,
        setPartnerStories,
        
      }}
    >
      {children}
    </userAndSystemContext.Provider>
  );
}

export default Providers;

export function useUserContext() {
  return useContext(userAndSystemContext);
}
