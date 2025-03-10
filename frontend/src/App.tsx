import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { getUserFromToken } from "./services/authServices";
import { useAuth } from "./contexts/UserContext";
import { toast, ToastContainer } from 'react-toastify';
import AppLayout from "./components/AppLayout";
import Login from "./components/Login";


const App: React.FC = () => {
  const { user, updateUser } = useAuth();

  useEffect(() => {
    const userFetched = getUserFromToken()
    updateUser(userFetched)
    
    toast.success(`Welcome dear ${userFetched?.username}`)
  },[])

    return (
      <div className="app-container">
        <ToastContainer aria-label={undefined}/>
        <Router>
          <Routes>
            { !user ? (
              <Route path='/login' element={<Login />} />
            ) : (
              <Route path='/*' element={<AppLayout />} />
            )}

            <Route path='/' element={<Navigate to={user ? "/home" : "/login"} />} />
          </Routes>
      </Router> 
      </div>
    );
}

export default App;


