import React from "react"
import HashLoader from "react-spinners/HashLoader";

interface LoaderProps {
    color?:string
    loading:boolean
    size?:number
}

const MyLoader:React.FC<LoaderProps> = ({color='#090949', loading, size=150}) => {
    return (
        <HashLoader
        color={color}
        loading={loading}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
        />
)}

export default MyLoader