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
    reservationDate: Date
    entryTime: Date | null;
    treatmentStart: Date | null;
    treatmentEnd: Date | null;
    createdAt: Date | null;
}

interface FilterReservations {
    reservationType?: string;
    bloodType?: string;
    reservationStatus?: string;
    reservationDate?: string
}

interface GetReservationsProps {
    filter?: FilterReservations;
    sort?: string;
    search?: string;
}

interface ReservationStore {
    reservations: Reservation[];
    getReservations: (props: GetReservationsProps) => Reservation[];
    updateReservation: (id: string, updatedFields: Partial<Reservation>) => void;
    getReservation: (id: string) => Reservation | string;
    deleteReservation: (id: string) => void;
    addReservation: (newReservation: Omit<Reservation, 'id' | 'createdAt' | 'entryTime' | 'treatmentStart' | 'treatmentEnd' | 'reservationStatus'>) => void;
}

export const useReservationStore = create(
    persist<ReservationStore>(
        (set, get) => ({
            reservations: dummyReservations,
            getReservations: ({ filter, sort, search }) => {

                const { reservations } = get();
                let filtered = [...reservations];

                // Search filter
                if (search && search.trim() !== '') {
                    const lowerSearch = search.toLowerCase();
                    filtered = filtered.filter(
                        (r) =>
                            r.name.toLowerCase().includes(lowerSearch) ||
                            (r.phone && r.phone.includes(lowerSearch))
                    );
                }

                // Apply filters
                if (filter) {
                    if (filter.reservationType) {
                        filtered = filtered.filter((r) => r.reservationType === filter.reservationType);
                    }
                    if (filter.bloodType) {
                        filtered = filtered.filter((r) => r.bloodType === filter.bloodType);
                    }
                    if (filter.reservationStatus) {
                        filtered = filtered.filter((r) => r.reservationStatus === filter.reservationStatus);
                    }
                    if (filter.reservationDate) {
                        const filterDate = new Date(filter.reservationDate)
                        filterDate.setHours(0, 0, 0, 0)

                        filtered = filtered.filter((r) => {
                            if (!r.reservationDate) return false;
                            const resDate = new Date(r.reservationDate);
                            resDate.setHours(0, 0, 0, 0);
                            return resDate.getTime() === filterDate.getTime();
                        });
                    }
                }

                // Apply sorting
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
                                // Handle null dates: place them at the end
                                if (!a.reservationDate && !b.reservationDate) return 0;
                                if (!a.reservationDate) return 1;
                                if (!b.reservationDate) return -1;
                                return a.reservationDate.getTime() - b.reservationDate.getTime();
                            case 'name':
                                return a.name.localeCompare(b.name); // Fixed: was comparing name to reservationDate
                            default:
                                return 0;
                        }
                    });
                }

                return filtered;
            },
            updateReservation: (id, updatedFields) => {
                set((state) => {
                    const reservation = state.reservations.find((r) => r.id === id);
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
                        } else if (newStatus === 'waiting') {
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
                        ),
                    };
                });
            },
            getReservation(id) {
                const { reservations } = get();
                const reservation = reservations.find(r => r.id == id)
                if (reservation) {
                    return reservation
                }
                else {
                    return 'not found'
                }
            },
            addReservation: (newReservationData) => {
                const now = new Date();
                const newReservation: Reservation = {
                    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(), // simple ID
                    createdAt: now,
                    reservationStatus: 'upcoming',
                    entryTime: null,
                    treatmentStart: null,
                    treatmentEnd: null,
                    ...newReservationData,
                    // Ensure reservationDate is a Date object if it's a string
                    reservationDate: new Date(newReservationData.reservationDate),
                    bloodType: newReservationData?.bloodType ? newReservationData.bloodType : 'unknown',
                    name: newReservationData?.name,
                    phone: newReservationData?.phone,
                };
                set((state) => ({
                    reservations: [...state.reservations, newReservation],
                }));
            },
            deleteReservation: (id) => {
                set((state) => {
                    const reservation = state.reservations.find((r) => r.id === id);
                    if (!reservation) return state;
                    return {
                        reservations: state.reservations.filter((res) =>
                            res.id !== id 
                        ),
                    };
                })
            }
        }),
        {
            name: 'reservations-storage',
        }
    )
);