import { type Reservation } from "../../store/store";
import { ReservationStatuses, ReservationTypes } from "../../store/constants";

import TimeAgo from "../../components/TimeAgo";


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
            <div className="relative  flex flex-1 justify-between items-center gap-1">
                <div className="relative flex flex-col gap-1">

                    <p className="relative text-xl hover:text-primary hover:underline duration-300 select-none cursor-pointer">
                        {
                            reservation.name
                        }
                    </p>
                <div className="relative flex flex-row items-center gap-2">

                    {reservationStatus?.Icon({ color: reservationStatus.color })}
                    <p className="relative hover:underline duration-300 select-none capitalize ">
                        {
                            reservation.reservationStatus.replace("-", " ")
                        }
                    </p>
                </div>
                    <p className="relative text-secondary">
                        <TimeAgo date={reservation.reservationDate} />
                    </p>
                </div>
            </div>
        </div>
    )
}