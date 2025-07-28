import {  type InputHTMLAttributes, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {

}

function Input(props: InputProps) {

  return (
    
    <div>
      <input
        className="border-0 h-9 rounded-md w-full outline-none px-2 mb-3 bg-amber-50"
        {...props}
      >
      </input>
    </div>
  
  )
}

export default Input