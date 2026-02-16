import { useState } from "react"
import { IoIosArrowDropdownCircle } from "react-icons/io";
import type { InputProps } from "./types";
import { useValidation } from "./validation";



const Select = ({ value, title, onChange, data, icon, validation, type , disabled}: InputProps) => {
    const [openSelect, setOpenSelect] = useState(false)
    const { error, setDirty } = useValidation(value, validation, type);
    
    const handleBlur = () => setDirty();

    return (

            <div  className={`relative   rounded-lg ${!disabled && 'dark:hover:bg-custom-gray-hover hover:bg-leight '}  transform duration-300`} >
                <button disabled={disabled} onBlur={handleBlur} className={`relative w-full flex flex-row justify-between items-center gap-2 p-2 ${!disabled && 'cursor-pointer'}`}
                    onClick={() => setOpenSelect(prev => !prev)} style={error ? {borderWidth:1 , borderColor:'red'} : {}}>
                    {icon && icon()}
                    <p className="relative text text-sm select-none capitalize"  >
                        {
                            value ? value : title
                        }
                    </p>
                    <IoIosArrowDropdownCircle className="relative  text-dark dark:text-white transform duration-300" style={{ rotate: openSelect ? "180deg" : "0deg" }} />
                </button>
                {
                    openSelect &&
                    <div className="absolute top-12 divide-y divide-custom-gray-border w-60 max-h-60  z-105 rounded-lg border border-custom-gray-border &::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-y-auto">
                        {data &&
                            data.map(item =>
                                <div key={item.id} className="relative w-full p-3 dark:bg-custom-gray bg-leight-foreground cursor-pointer dark:hover:bg-custom-gray-hover hover:bg-leight duration-150" onClick={() => {
                                    onChange(item.value)
                                    setOpenSelect(false)
                                }}>
                                    <p className="capitalize">{item.item.replace('*-', '@').replace('-', ' ').replace('@', '-')}</p>
                                </div>
                            )
                        }
                    </div>
                }
            </div>
    )
}

export default Select