import React from 'react'
import '@ds.e/scss/dist/Button.css'
interface ButtonProps {
    title: string;
    onClick: () => void;
    children: React.ReactNode;
}

const Button : React.FC<ButtonProps> = ({title, onClick,children}) => {
  return (
    <>
    <button className='btn btn-primary' title={title} onClick={onClick}> {children} </button>
    </>
  )
}

export default Button;