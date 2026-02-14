import { useReservationStore, type Reservation } from "../../store/store";
import { useEffect, useState } from "react";
import { BloodTypes, ReservationSortFields, ReservationStatuses, ReservationTypes } from "../../store/constants";
import { MdBloodtype } from "react-icons/md";
import { CiBookmarkCheck } from "react-icons/ci";
import { GrStatusInfo } from "react-icons/gr";
import Select from "../../components/input/Select";
import { FaSortAmountDown } from "react-icons/fa";
import ReservationComponent from "./ReservationComponent";


interface Item {
    id: string,
    item: any,
    value: any
}


export default function Reservations() {
    const [search, setSearch] = useState<string>("")
    const [sort, setSort] = useState<Item>()
    const [bloodType, setBloodType] = useState<Item>()
    const [reservationStatus, setReservationStatus] = useState<Item>()
    const [reservationType, setReservationType] = useState<Item>()
    const [localeservation, setLocalReservation] = useState<Reservation[]>([])
    const getReservations = useReservationStore(state => state.getReservations);
    const reservations = useReservationStore(state => state.reservations);

    const filterData = [
        {
            placeholder: "Blood Type",
            value: bloodType,
            onChange: setBloodType,
            data: BloodTypes,
            icon: MdBloodtype
        },
        {
            placeholder: "Reservation Type",
            value: reservationType,
            onChange: setReservationType,
            data: ReservationTypes,
            icon: CiBookmarkCheck
        }, {
            placeholder: "Reservation Status",
            value: reservationStatus,
            onChange: setReservationStatus,
            data: ReservationStatuses,
            icon: GrStatusInfo
        },
    ]


    useEffect(() => {
        setLocalReservation(getReservations({
            filter: {
                bloodType: bloodType?.value,
                reservationStatus: reservationStatus?.value,
                reservationType: reservationType?.value
            },
            sort: sort?.item,
            search: search
        }))
    }, [reservations, search, sort, bloodType, reservationStatus, reservationType])


    return (
        <div className="relative w-full">
            <div className="relative w-full p-5 lg:px-40 md:px-5">

                <div className="relative w-full flex flex-col  gap-3 ">
                    <input onChange={e => setSearch(e.target.value)} className='relative w-full p-2 border border-custom-gray-hover rounded-lg' type="search" placeholder="search" />
                    <div className="relative w-full flex flex-row flex-wrap gap-3">
                        <Select icon={FaSortAmountDown} value={sort} onChange={setSort} data={ReservationSortFields} placeholder="sort" />
                        {filterData.map(f => <Select {...f} />)}
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
        </div>
    )
}