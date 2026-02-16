import { useDroppable } from "@dnd-kit/core";
import { useReservationStore, type Reservation, type ReservationStatus } from "../../store/store";
import { useEffect, useState } from "react";
import KanbanResvation from "./KanbanResevation";
import { BsArrowsFullscreen } from "react-icons/bs";
import { BloodTypes, ReservationSortFieldsKanban, ReservationTypes } from "../../store/constants";
import { FaSortAmountDown } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import { CiBookmarkCheck } from "react-icons/ci";
import Input from "../input";


interface KanbanColumnProps {
    title: ReservationStatus;
    color: string;
    date: string;
    Icon: any
}

// interface Item {
//     id:string,
//     item:any,
//     value:any
// }

export default function KanbanColumn({ title, color = '#3d444d', date, Icon }: KanbanColumnProps) {
    const [search, setSearch] = useState<string>("")
    const [sort, setSort] = useState<string>()
    const [bloodType, setBloodType] = useState<string>()
    const [reservationType, setReservationType] = useState<string>()
    const [localeservation, setLocalReservation] = useState<Reservation[]>([])
    const getReservations = useReservationStore(state => state.getReservations);
    const reservations = useReservationStore(state => state.reservations);
    const { isOver, setNodeRef } = useDroppable({
        id: title,
    });
    const style = {
        borderWidth: isOver ? 4 : 2
    };

    const filterData = [
        {
            id: '1',
            title: "Blood Type",
            value: bloodType,
            onChange: setBloodType,
            data: BloodTypes,
            icon: MdBloodtype
        },
        {
            id: '2',
            title: "Reservation Type",
            value: reservationType,
            onChange: setReservationType,
            data: ReservationTypes,
            icon: CiBookmarkCheck
        }
    ]


    useEffect(() => {
        setLocalReservation(getReservations({
            filter: {
                reservationStatus: title,
                bloodType: bloodType,
                reservationType: reservationType,
                reservationDate: date
            },
            sort: sort,
            search: search
        }))
    }, [reservations, search, sort, bloodType, reservationType, date])


    return (
        <div ref={setNodeRef} className="relative w-full border-2 border-custom-gray-border rounded-lg" style={{ borderColor: color, ...style }}>
            {
                isOver &&
                <div className="absolute w-full h-full flex flex-col justify-center items-center z-100">
                    <div className="absolute w-full h-full bg-custom-gray opacity-70 backdrop-blur-3xl" />
                    <BsArrowsFullscreen className="relative text-5xl font-black text-white" />
                    <p className="relative text-2xl font-bold text-white">
                        Drop Here
                    </p>
                </div>
            }
            <div className="relative w-full bg-leight dark:bg-custom-gray rounded-lg rounded-b-none border-b-2" style={{ borderColor: color }}>

                <div className="relative w-full flex flex-col justify-center p-2 gap-3">
                    <div className="relative w-full flex justify-center items-center gap-3">
                       <Icon className="relative font-bold text-xl" style={{color:color}}/>
                        <p className="relative text-center capitalize font-bold text-xl" style={{ color: color }}>{title.replace('-', ' ')}</p>
                    </div>
                    <div className="relative w-full flex flex-col  gap-3 ">
                        <input onChange={e => setSearch(e.target.value)} className='relative w-full p-2 border border-custom-gray-hover rounded-lg' type="search" placeholder="search" />
                        <div className="relative w-full flex flex-row flex-wrap gap-3">
                            <Input id="select" type="select" icon={FaSortAmountDown} value={sort} onChange={setSort} data={ReservationSortFieldsKanban} title="sort" />
                            {filterData.map(f => <Input type="select" {...f} />)}
                        </div>

                    </div>

                </div>
            </div>
            <div className="relatve w-full  flex flex-col gap-3 p-2" >
                {
                    localeservation.map(reservation => <KanbanResvation {...reservation} />)
                }
            </div>

        </div>
    )
} 