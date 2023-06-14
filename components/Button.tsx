'use client'
import { ButtonProps } from "@/types"
import Image from "next/image"

const Button = ({title ,btnType ,  containerStyles , handleClick , textStyles , rightIcon}:ButtonProps) => {
  return (
    <button
    disabled={false}
    type={btnType || "button"}
    className={`custom-btn ${containerStyles}`}
    onClick={handleClick}
    >
        <span className={`flex-1 ${textStyles}`}>
            {title}
        </span>
        {rightIcon && (<div className="relative w-6 h-6">
          <Image src={rightIcon} alt="rightIcon" fill className="object-contain"/>
        </div>)}
    </button>
  )
}

export default Button