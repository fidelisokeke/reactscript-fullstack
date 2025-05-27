import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function PublicLayout({children}: { children: React.ReactNode }) {
    const navigate = useNavigate();


    useEffect (() =>{
        if (localStorage.getItem("sb-gbvljznwvdbtersvzpem-auth-token")) {
            navigate("/");
        }
    }, []);
  return (
    <div>
      {children}
    </div>
  )
}

export default PublicLayout
