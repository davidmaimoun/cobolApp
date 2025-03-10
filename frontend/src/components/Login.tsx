import React, { useEffect, useState } from "react";
import { getUserFromToken, login, storeToken } from "../services/authServices";
import { useAuth } from "../contexts/UserContext";
import MyButton from "./all/Button";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate()
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

  }, [])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await login(data)
      storeToken(response)
      const userFetched = getUserFromToken()
   
      updateUser(userFetched)
      navigate('/')
      
    } catch (error) {
      console.log('[Loggin] : error in loggin : ' + error)
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <MyButton type="submit" label={"Login"} />     
      </form>
    </div>
  );
};

export default Login;
