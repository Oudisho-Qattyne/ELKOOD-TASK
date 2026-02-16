import { useDraggable } from "@dnd-kit/core";
import { useReservationStore, type Reservation, type ReservationStatus } from "../../store/store";
import { ReservationStatuses, ReservationTypes } from "../../store/constants";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaCheckCircle } from "react-icons/fa";
import TimeAgo from "../TimeAgo";
import { MdOutlineCancel } from "react-icons/md";
import { MdDragIndicator } from "react-icons/md";
import { Link } from "react-router";


export default function KanbanResvation(reservation: Reservation) {
    const updateReservation = useReservationStore(state => state.updateReservation);
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: reservation.id,
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(1.05)`,
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        transition: 'transform 0.3s linear, box-shadow 0.5s ease',
        zIndex: 1000
    } : undefined;
    const reservationType = ReservationTypes.find(r => r.item == reservation.reservationType)
    const reservationStatus = ReservationStatuses.find(r => r.item == reservation.reservationStatus)


    return (
        <div className='relative flex flex-row justify-start items-center border border-custom-gray-border rounded-lg p-1 gap-2 bg-leight dark:bg-custom-gray' style={{ ...style }}>
            <div className="relative cursor-pointer" ref={setNodeRef}  {...listeners} {...attributes} >
                <MdDragIndicator fontSize='25px' />
            </div>
            {reservationType &&
                <div className="relative w-10 aspect-square flex justify-center items-center rounded-full border " style={{ borderColor: reservationType.color }}>
                    {

                        reservationType.Icon({ color: reservationType.color, fontSize: '20px' })
                    }
                </div>
            }
            <div className="relative  flex flex-1 justify-between items-center gap-1">
                <div className="relative flex flex-col gap-1">
                    <Link to={`reservations/${reservation.id}`}>
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
                <div className="relative flex justify-center items-center gap-1">
                    {
                        reservationStatus?.previous &&
                        <FaArrowAltCircleLeft onClick={() => {
                            updateReservation(reservation.id, { reservationStatus: reservationStatus.previous as ReservationStatus })
                        }} fontSize='20px' className="relative hover:scale-110 duration-300 cursor-pointer" />
                    }
                    {
                        reservationStatus?.next && reservationStatus.next == 'completed' ?
                            <FaCheckCircle onClick={() => {
                                updateReservation(reservation.id, { reservationStatus: reservationStatus.next as ReservationStatus })
                            }} fontSize='20px' className="relative hover:scale-110 duration-300 cursor-pointer" />

                            :

                            <FaArrowAltCircleRight onClick={() => {
                                updateReservation(reservation.id, { reservationStatus: reservationStatus?.next as ReservationStatus })
                            }} fontSize='20px' className="relative hover:scale-110 duration-300 cursor-pointer" />
                    }
                    {
                        !reservationStatus?.previous &&
                        <div onClick={() => {
                            updateReservation(reservation.id, { reservationStatus: "cancelled" })
                        }} className="relative ">
                            <MdOutlineCancel color="red" fontSize='23px' className="relative hover:scale-110 duration-300 cursor-pointer" />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}