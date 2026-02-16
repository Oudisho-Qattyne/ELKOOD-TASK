import { useState, useEffect, useRef } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import type { InputProps } from "./types";
import { useValidation } from "./validation";
import  { BaseInput } from "./BaseInput";

const Select = ({ value, title, onChange, data, icon, validation, type, disabled, showTitle }: InputProps) => {
    const [openSelect, setOpenSelect] = useState(false);
    const { error } = useValidation(value, validation, type);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpenSelect(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={containerRef} className={`relative rounded-lg `}>
            {
                showTitle ?
                    <BaseInput error={error} title={title} >
                        <button
                            disabled={disabled}
                            className={`relative w-full flex flex-row justify-between items-center gap-2 p-2 ${!disabled && 'cursor-pointer'} ${!disabled && 'dark:hover:bg-custom-gray-hover hover:bg-leight'} transform duration-300 rounded-lg`}
                            onClick={() => setOpenSelect(prev => !prev)}
                            style={error ? { borderWidth: 1, borderColor: 'red' } : {}}
                        >
                            {icon && icon()}
                            <p className="relative text text-sm select-none capitalize">
                                {value ? value : title}
                            </p>
                            {
                                !disabled &&
                                <IoIosArrowDropdownCircle className="relative text-dark dark:text-white transform duration-300" style={{ rotate: openSelect ? "180deg" : "0deg" }} />
                            }
                        </button>
                    </BaseInput>
                    :
                    <button
                        disabled={disabled}
                        className={`relative w-full flex flex-row justify-between items-center gap-2 p-2 ${!disabled && 'cursor-pointer'} ${!disabled && 'dark:hover:bg-custom-gray-hover hover:bg-leight'} transform duration-300  rounded-lg`}
                        onClick={() => setOpenSelect(prev => !prev)}
                        style={error ? { borderWidth: 1, borderColor: 'red' } : {}}
                    >
                        {icon && icon()}
                        <p className="relative text text-sm select-none capitalize">
                            {value ? value : title}
                        </p>
                        {
                            !disabled &&
                            <IoIosArrowDropdownCircle className="relative text-dark dark:text-white transform duration-300" style={{ rotate: openSelect ? "180deg" : "0deg" }} />
                        }
                    </button>
            }
           
            {openSelect && (
                <div className="absolute top-10 divide-y divide-custom-gray-border w-60 max-h-60 z-105 rounded-lg border border-custom-gray-border &::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-y-auto">
                    {data &&
                        data.map(item => (
                            <div
                                key={item.id}
                                className="relative w-full p-3 dark:bg-custom-gray bg-leight-foreground cursor-pointer dark:hover:bg-custom-gray-hover hover:bg-leight duration-150"
                                onClick={() => {
                                    onChange(item.value);
                                    setOpenSelect(false);
                                }}
                            >
                                <p className="capitalize">{item.item.replace('*-', '@').replace('-', ' ').replace('@', '-')}</p>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default Select;