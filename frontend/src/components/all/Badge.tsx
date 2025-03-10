import React from "react"
import HashLoader from "react-spinners/HashLoader";

type BadgeColor = "primary" | "secondary" | "success" | "info" | "warning" | "danger";
type BadgeVariant = "outlined" | "filled";

interface BadgeProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  color?: BadgeColor;
  variant?: BadgeVariant;
  className?: string; 
}


const MyBadge:React.FC<BadgeProps> = ({ label, color="secondary", variant="filled", className}) => {
    const badgeClass = `${getBadgeClass(color, variant)}`;
    return (
        <span className={`badge ${badgeClass} ${className}`}  >
            {label}
        </span>
)}

const getBadgeClass = (color: BadgeColor, variant: BadgeVariant) => {
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

export default MyBadge