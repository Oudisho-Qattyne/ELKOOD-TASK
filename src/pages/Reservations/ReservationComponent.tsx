import { type Reservation } from "../../store/store";
import { ReservationStatuses, ReservationTypes } from "../../store/constants";

import TimeAgo from "../../components/TimeAgo";
import { Link } from "react-router";


export default function ReservationComponent(reservation: Reservation) {




    const reservationType = ReservationTypes.find(r => r.item == reservation.reservationType)
    const reservationStatus = ReservationStatuses.find(r => r.item == reservation.reservationStatus)


    return (
        <div className="relative w-full flex flex-row justify-start items-center p-3 gap-3 dark:hover:bg-custom-gray-hover hover:bg-leight duration-150 " >
            {reservationType &&
                <div className="relative w-10 h-10 aspect-square flex  justify-center items-center rounded-full border " style={{ borderColor: reservationType.color }}>
                    {

                        reservationType.Icon({ color: reservationType.color, fontSize: '20px' })
                    }
                </div>
            }
            <div className="relative  flex flex-1 justify-start items-center gap-1">
                <div className="relative w-10/12  flex flex-col gap-1">
                    <Link to={`${reservation.id}`}>
                        <p className="relative text-xl hover:text-primary hover:underline duration-300 select-none cursor-pointer">
                            {
                                reservation.name
                            }
                        </p>
                    </Link>

                    <p className="relative text-secondary">
                        <TimeAgo date={reservation.reservationDate} />
                    </p>
                </div>
                <div className="relative flex flex-row items-center gap-2">

                    {reservationStatus?.Icon({ color: reservationStatus.color })}
                    <p className="relative   duration-300 select-none capitalize " style={{ color: reservationStatus?.color }}>
                        {
                            reservation.reservationStatus.replace("-", " ")
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}