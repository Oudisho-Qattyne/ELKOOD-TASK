import { DndContext } from '@dnd-kit/core';
import KanbanColumn from '../../components/Kanban/KanbanColumn';
import { ReservationStatuses } from '../../store/constants';
import { useReservationStore, type ReservationStatus } from '../../store/store';
import { useEffect } from 'react';

export default function Dashboard() {
    const updateReservation = useReservationStore(state => state.updateReservation);
    useEffect(() => {
    } , [])
    localStorage.removeItem('reservations-storage')
    return (
        <DndContext onDragEnd={handleDragEnd}  >
            <div className='relative w-full p-5 flex-wrap grid grid-cols-{3} gap-3'  >
                {ReservationStatuses.filter(column => column.render).map((column) => (
                    <KanbanColumn color={column.color} title={column.item as ReservationStatus} />
                ))}
            </div>
        </DndContext>
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