import React from "react";
import MyButton from "./all/Button";

interface HomeProps {
  title?: string;
}

const Home: React.FC<HomeProps> = ({ title = "Welcome to the Home Page" }) => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>{title}</h1>
      <p>This is the Home page of your React app.</p>
      <MyButton 
        label={"Click"} 
        color="primary"
        variant="filled"
        onClick={function (): void {
            throw new Error("Function not implemented.");
            }}
        />
    </div>
  );
};

export default Home;
