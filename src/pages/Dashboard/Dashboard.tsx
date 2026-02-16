import { DndContext } from '@dnd-kit/core';
import KanbanColumn from '../../components/Kanban/KanbanColumn';
import { ReservationStatuses } from '../../store/constants';
import { useReservationStore, type ReservationStatus } from '../../store/store';
import { useEffect, useState } from 'react';
import Input from '../../components/input';
import { FaPlus } from 'react-icons/fa';

export default function Dashboard() {
    const filterDate = new Date();
    const filterYear = filterDate.getFullYear();
    const filterMonth = String(filterDate.getMonth() + 1).padStart(2, '0');
    const filterDay = String(filterDate.getDate()).padStart(2, '0');
    const filterDateStr = `${filterYear}-${filterMonth}-${filterDay}`;
    const [date, setDate] = useState<string>(filterDateStr)

    const updateReservation = useReservationStore(state => state.updateReservation);

    useEffect(() => {
        localStorage.removeItem('reservations-storage')
    }, [])

    return (
        <div className='relative w-full'>
            <div className='relative w-full p-5 flex flex-row flex-wrap-reverse justify-between items-center gap-3 '>
                <div className='relative w-2xs'>
                    <Input id='date' type='date' onChange={setDate} value={date} />
                </div>
                <div className='relative w-2xs p-3 flex justify-center items-center gap-2 bg-blue-800 rounded-full hover:bg-blue-900 hover:scale-105 duration-300 cursor-pointer '>
                    <FaPlus className='relative animate-pulse ' />
                    <p className='relative select-none '>Add New Reservation</p>
                </div>
            </div>
            <DndContext onDragEnd={handleDragEnd}  >
                <div className='relative w-full p-5 flex-wrap grid grid-cols-{3} gap-3'  >
                    {ReservationStatuses.filter(column => column.render).map((column) => (
                        <KanbanColumn color={column.color} title={column.item as ReservationStatus} date={date} />
                    ))}
                </div>
            </DndContext>
        </div>
    );

    function handleDragEnd(event: any) {
        const { active, over } = event;

        if (over && active) {
            updateReservation(active.id, {
                reservationStatus: over.id
            });
        }
    }
};