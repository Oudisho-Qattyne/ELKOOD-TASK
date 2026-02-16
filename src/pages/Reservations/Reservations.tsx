import { useReservationStore, type Reservation } from "../../store/store";
import { useEffect, useState } from "react";
import { BloodTypes, ReservationSortFields, ReservationStatuses, ReservationTypes } from "../../store/constants";
import { MdBloodtype } from "react-icons/md";
import { CiBookmarkCheck } from "react-icons/ci";
import { GrStatusInfo } from "react-icons/gr";
import { FaPlus, FaSortAmountDown } from "react-icons/fa";
import ReservationComponent from "./ReservationComponent";
import Input from "../../components/input";
import type { InputType } from "../../components/input/types";
import Button from "../../components/button";
import { Outlet, useNavigate, useParams } from 'react-router';
interface Item {
    id: string,
    item: any,
    value: any
}

export default function Reservations() {
    const navigate = useNavigate()
    const [search, setSearch] = useState<string>("")
    const [date, setDate] = useState<string>()
    const [sort, setSort] = useState<Item>()
    const [bloodType, setBloodType] = useState<Item>()
    const [reservationStatus, setReservationStatus] = useState<Item>()
    const [reservationType, setReservationType] = useState<Item>()
    const [localeservation, setLocalReservation] = useState<Reservation[]>([])
    const getReservations = useReservationStore(state => state.getReservations);
    const reservations = useReservationStore(state => state.reservations);

    const filterData = [
        {
            id:'1',
            title: "Sort",
            value: sort,
            onChange: setSort,
            data: ReservationSortFields,
            icon: FaSortAmountDown,
            type: 'select' as InputType
        },
        {
            id:'2',
            title: "Blood Type",
            value: bloodType,
            onChange: setBloodType,
            data: BloodTypes,
            icon: MdBloodtype,
            type: 'select' as InputType
        },
        {
            id:'3',
            title: "Reservation Type",
            value: reservationType,
            onChange: setReservationType,
            data: ReservationTypes,
            icon: CiBookmarkCheck,
            type: 'select' as InputType
        },
        {
            id:'4',
            title: "Reservation Status",
            value: reservationStatus,
            onChange: setReservationStatus,
            data: ReservationStatuses,
            icon: GrStatusInfo,
            type: 'select' as InputType
        },

    ]


    useEffect(() => {
        setLocalReservation(getReservations({
            filter: {
                bloodType: bloodType?.value,
                reservationStatus: reservationStatus?.value,
                reservationType: reservationType?.value,
                reservationDate: date
            },
            sort: sort?.item,
            search: search
        }))
    }, [reservations, search, sort, bloodType, reservationStatus, reservationType, date])

const {id} = useParams()
    return (
        <div className="relative w-full">
            {
                !id ?
                    <div className="relative w-full p-5 lg:px-40 md:px-5">

                        <div className="relative w-full flex flex-col  gap-3 py-2">
                            <Input id='search' onChange={setSearch} value={search} type="search" placeholder="search" />
                            <Input id='date' onChange={setDate} value={date} type="date" />
                            <div className="relative w-full flex flex-row gap-3">
                                <div className="relative w-full flex flex-row flex-wrap gap-3">
                                    {filterData.map(f => <Input  {...f} />)}
                                </div>
                                <Button onClick={() =>navigate('/add-reservation') } title="Add Reservation" className="w-72 h-10 bg-blue-900 hover:bg-blue-700  py-3" icon={<FaPlus className='relative animate-pulse text-white' />}/>
                               

                            </div>
                        </div>
                        <div className="realative w-full divide-y divide-custom-gray-border ">
                            {
                                localeservation.map((reservation: Reservation) =>
                                    <ReservationComponent {...reservation} />
                                )
                            }
                        </div>
                    </div>
                    :
                    <Outlet />

            }
        </div>
    )
}