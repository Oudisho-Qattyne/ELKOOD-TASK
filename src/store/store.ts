import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { dummyReservations } from './constants';


export type BloodType =
    | 'A+' | 'A-'
    | 'B+' | 'B-'
    | 'AB+' | 'AB-'
    | 'O+' | 'O-'
    | 'unknown';

export type ReservationStatus =
    | 'upcoming'
    | 'waiting'
    | 'in-treatment'
    | 'completed'
    | 'cancelled';

export type ReservationType =
    | 'pre-booked'
    | 'walk-in'
    | 'emergency';

export type SortReservationsBy =
    | 'reservation-type'
    | 'blood-type'
    | 'reservation-status'
    | 'reservation-date'
    | 'name'
    | null;


export interface Reservation {
    id: string;
    name: string;
    phone: string;
    bloodType: BloodType;
    reservationType: ReservationType;
    reservationStatus: ReservationStatus;
    reservationDate: string;
    entryTime: Date | null;
    treatmentStart: Date | null;
    treatmentEnd: Date | null;
    createdAt: Date | null;

}

interface FilterReservations {
    reservationType?: ReservationType;
    bloodType?: BloodType;
    reservationStatus?: ReservationStatus;
    reservationDate?: string;

}

interface GetReservationsProps {
    filter?: FilterReservations;
    sort?: SortReservationsBy,
    search?: string
}

interface ReservationStore {
    reservations: Reservation[];
    getReservations: (props: GetReservationsProps) => Reservation[]
    updateReservation: (id: string, updatedFields: Partial<Reservation>) => void;
}

export const useReservationStore = create(
    persist<ReservationStore>(
        (set, get) => ({
            reservations: dummyReservations,
            getReservations: ({ filter, sort, search }) => {
                console.log(filter , sort , search);
                
                const { reservations } = get();
                let filtered = [...reservations];

                if (search && search.trim() !== '') {
                    const lowerSearch = search.toLowerCase();
                    filtered = filtered.filter(r =>
                        r.name.toLowerCase().includes(lowerSearch) ||
                        (r.phone && r.phone.includes(lowerSearch))
                    );
                }
                if (filter) {
                    if (filter.reservationType) {
                        filtered = filtered.filter(r => r.reservationType === filter.reservationType);
                    }
                    if (filter.bloodType) {
                        filtered = filtered.filter(r => r.bloodType === filter.bloodType);
                    }
                    if (filter.reservationStatus) {
                        filtered = filtered.filter(r => r.reservationStatus === filter.reservationStatus);
                    }
                    if (filter.reservationDate) {
                        filtered = filtered.filter(r => r.reservationDate === filter.reservationDate);
                    }
                }

                if (sort) {
                    filtered.sort((a, b) => {
                        switch (sort) {
                            case 'reservation-type':
                                return a.reservationType.localeCompare(b.reservationType);
                            case 'blood-type':
                                return a.bloodType.localeCompare(b.bloodType);
                            case 'reservation-status':
                                return a.reservationStatus.localeCompare(b.reservationStatus);
                            case 'reservation-date':
                                return a.reservationDate.localeCompare(b.reservationDate);
                            case 'name':
                                return a.name.localeCompare(b.reservationDate);
                            default:
                                return 0;
                        }
                    });
                }

                return filtered;
            },
            updateReservation: (id, updatedFields) => {
                set((state) => {
                    const reservation = state.reservations.find(r => r.id === id);
                    if (!reservation) return state;

                    const oldStatus = reservation.reservationStatus;
                    const newStatus = updatedFields.reservationStatus;

                    let fieldsToUpdate = { ...updatedFields };

                    if (newStatus && newStatus !== oldStatus) {
                        const now = new Date();
                        if (newStatus === 'upcoming') {
                            fieldsToUpdate.entryTime = null;
                            fieldsToUpdate.treatmentStart = null;
                            fieldsToUpdate.treatmentEnd = null;
                        }
                        else if (newStatus === 'waiting') {

                            fieldsToUpdate.entryTime = now;
                            fieldsToUpdate.treatmentStart = null;
                            fieldsToUpdate.treatmentEnd = null;
                        } else if (newStatus === 'in-treatment') {

                            fieldsToUpdate.treatmentStart = now;
                            fieldsToUpdate.treatmentEnd = null;

                        } else if (newStatus === 'completed') {

                            fieldsToUpdate.treatmentEnd = now;
                        }
                    }
                    return {
                        reservations: state.reservations.map((res) =>
                            res.id === id ? { ...res, ...fieldsToUpdate } : res
                        )
                    };
                });
            },
        }),
        {
            name: 'reservations-storage',
        }
    )
);