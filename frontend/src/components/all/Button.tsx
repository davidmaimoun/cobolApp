import React from "react";

type ButtonColor = "primary" | "secondary" | "success" | "info" | "warning" | "danger";
type ButtonVariant = "outlined" | "filled";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  color?: ButtonColor;
  variant?: ButtonVariant;
  className?: string; 
}

const MyButton: React.FC<ButtonProps> = ({ 
  label, color="primary", variant="filled", className, ...rest
}) => {
  const buttonClass = `${getButtonClass(color, variant)}`;

  return (
    <button className={`btn ${buttonClass} ${className}`} {...rest}>
      {label}
    </button>
  );
};

const getButtonClass = (color: ButtonColor, variant: ButtonVariant) => {
    let className = ''
    if (color === "secondary") {
        className =  "secondary";
        
    }
    else if(color === "warning") {
        className =  "warning";
        
    }
    else if(color === "success") {
      className =  "success";
      
  } 
    else if(color === "danger") {
        className =  "danger";
    }  
    else  {
        className = "primary";
        
    }
    if (variant === "outlined") {
        className +=  ` btn-outlined btn-outlined-${color}`;  
    }
    else {
        className +=  ` btn-filled btn-filled-${color}`;
    }
    return className
    
};

export default MyButton;
