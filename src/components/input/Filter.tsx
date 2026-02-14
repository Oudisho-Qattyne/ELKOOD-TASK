import { useState } from "react"
import { IoIosArrowDropdownCircle } from "react-icons/io";
import Select from "./Select";

interface Data {
    value?: any
    placeholder: string
    onChange: (value: any) => void
    data: any[]
}
interface FilterProps {
    placeholder: string
    data: Data[]
}

const Filter = ({ placeholder, data }: FilterProps) => {
    const [openSelectFilter, setOpenSelectFilter] = useState(false)
    return (
        <div className="relative flex justify-center items-center  rounded-lg  dark:hover:bg-custom-gray-hover hover:bg-leight-foreground cursor-pointer transform duration-300" >
            <div className="relative w-full flex flex-row justify-between items-center gap-2 p-2"
             onClick={() => setOpenSelectFilter(prev => !prev)}>
                <p className="relative text text-sm select-none capitalize"  >
                    {
                        placeholder
                    }
                </p>
                <IoIosArrowDropdownCircle className="relative flex-1 text-dark dark:text-white transform duration-300" style={{rotate: openSelectFilter ? "180deg" : "0deg"}} />
            </div>
            {
                openSelectFilter &&
                <div className="absolute bg-white dark:bg-custom-gray flex flex-row  top-12 divide-y divide-custom-gray-border w-80 max-h-60  z-105 rounded-lg border border-custom-gray-border ">
                    {
                        data.map(item => 
                            <Select {...item}/>
                        )
                    }
                </div>
            }
        </div>
    )
}

export default Filter