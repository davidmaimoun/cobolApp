import React from 'react'

interface MetricsCardProps {
    label: string
    value: string|number
    color: string
    signe: string
}

const MetricsCard:React.FC<MetricsCardProps> = ({ label, signe, value, color='dodgerblue'}) => {
  return (
    <div className='metrics-card'>
        <h3>{label}</h3>
        <h2 style={{'color':color}}><span>{signe}</span> {value}</h2>
    </div>
  )
}

export default MetricsCard