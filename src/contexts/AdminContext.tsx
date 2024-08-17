'use client'

import { createContext, ReactNode, useContext, useState } from "react";

interface AdminProps {
  fullName: string;
  id: string;
}

const AdminContext = createContext<any>(undefined);

export const AdminContextProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<AdminProps>({fullName: '', id: ''});

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};


export const useAdminContext = () => useContext(AdminContext)