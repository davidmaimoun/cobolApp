import React from 'react'

type TitleVariant = "header" | "subheader";

interface TitleProps {
    label:string
    variant?:TitleVariant 
    color?:string
}
const MyTitle:React.FC<TitleProps> = ({label, variant='header', color}) => {
    return getTitle(label, variant, color)
  
}

const getTitle = (label:string, variant: TitleVariant, color?:string) => {
    switch(variant){
        case 'subheader':  
            return <h2 style={{color: color}}>{label}</h2>
        default:
            return <h1 style={{color: color}}>{label}</h1>
    }

}

export default MyTitle
