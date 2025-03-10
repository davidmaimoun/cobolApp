import React, { useEffect } from 'react'
import { removeToken } from '../services/authServices'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/UserContext'

const Logout:React.FC = () => {
    const navigate = useNavigate()
    const { updateUser } = useAuth()
    useEffect(() => {
        try {
            removeToken()
            updateUser(null)
            navigate('/login')
        }
        catch (error){
            console.log("[Logout] : Cannot Logout", error)
        }
    },[])

    return (
      <div>
        Logged out!
      </div>
    )
  
}

export default Logout;
