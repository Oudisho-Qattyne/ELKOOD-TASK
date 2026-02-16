import { useNavigate, useParams } from "react-router";
import { useReservationStore, type Reservation, type ReservationStatus } from "../../store/store";
import { useEffect, useState, useCallback } from "react";
import type { InputProps } from "../../components/input/types";
import { BloodTypes, ReservationStatuses, ReservationTypes } from "../../store/constants";
import Input from "../../components/input";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaCheck, FaCheckCircle, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

export default function Reservation() {
    const [edit, setEdit] = useState(false);
    const navigate = useNavigate()
    const reservations = useReservationStore(state => state.reservations);
    const updateReservation = useReservationStore(state => state.updateReservation);
    const { id } = useParams();
    const getReservation = useReservationStore(state => state.getReservation);
    const deleteReservation = useReservationStore(state => state.deleteReservation);
    const [reservation, setReservation] = useState<Reservation | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [fields, setFields] = useState<Record<string, InputProps>>({});

    const FIELD_IDS = {
        NAME: '1',
        PHONE: '2',
        BLOOD_TYPE: '3',
        RESERVATION_TYPE: '4',
        RESERVATION_STATUS: '5',
        RESERVATION_DATE: '6',
        ENTRY_TIME: '7',
        TREATMENT_START: '8',
        TREATMENT_END: '9',
        CREATED_AT: '10',
    } as const;

    type FieldId = keyof typeof FIELD_IDS;


    const baseFieldDefinitions: Omit<InputProps, 'value' | 'onChange' | 'error' | 'valid'>[] = [
        { id: FIELD_IDS.NAME, title: 'Name', type: 'text', disabled: !edit, validation: [] },
        { id: FIELD_IDS.PHONE, title: 'Phone Number', type: 'text', disabled: !edit, validation: ['phoneNumber'] },
        { id: FIELD_IDS.BLOOD_TYPE, title: 'Blood Type', type: 'select', showTitle: true, data: BloodTypes, disabled: !edit, validation: [] },
        { id: FIELD_IDS.RESERVATION_TYPE, title: 'Reservation Type', type: 'select', showTitle: true, data: ReservationTypes, disabled: !edit, validation: [] },
        { id: FIELD_IDS.RESERVATION_STATUS, title: 'Reservation Status', type: 'select', showTitle: true, data: ReservationStatuses, disabled: true, validation: [] },
        { id: FIELD_IDS.RESERVATION_DATE, title: 'Reservation Date', type: 'datetime-local', disabled: true, validation: [] },
        { id: FIELD_IDS.ENTRY_TIME, title: 'Entry Time', type: 'datetime-local', disabled: true, validation: [] },
        { id: FIELD_IDS.TREATMENT_START, title: 'Treatment Start', type: 'datetime-local', disabled: true, validation: [] },
        { id: FIELD_IDS.TREATMENT_END, title: 'Treatment End', type: 'datetime-local', disabled: true, validation: [] },
        { id: FIELD_IDS.CREATED_AT, title: 'Created At', type: 'datetime-local', disabled: true, validation: [] },
    ];


    const toDateTimeLocal = (date: Date | null | undefined) => {
        if (!date) return null;
        const d = new Date(date);
        if (isNaN(d.getTime())) return null;
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };


    useEffect(() => {
        if (!id) {
            setError('No reservation ID provided');
            setLoading(false);
            return;
        }
        const result = getReservation(id);
        if (result === 'not found') {
            setError('Reservation not found');
        } else if (typeof result !== 'string') {
            setReservation(result);
        }
        setLoading(false);
    }, [id, getReservation, reservations]);


    useEffect(() => {
        if (!reservation) return;

        const initialFields: Record<string, InputProps> = {};
        baseFieldDefinitions.forEach(def => {
            let value: any = null;
            switch (def.id) {
                case FIELD_IDS.NAME:
                    value = reservation.name || '';
                    break;
                case FIELD_IDS.PHONE:
                    value = reservation.phone || '';
                    break;
                case FIELD_IDS.BLOOD_TYPE:
                    value = reservation.bloodType || null;
                    break;
                case FIELD_IDS.RESERVATION_TYPE:
                    value = reservation.reservationType || null;
                    break;
                case FIELD_IDS.RESERVATION_STATUS:
                    value = reservation.reservationStatus || null;
                    break;
                case FIELD_IDS.RESERVATION_DATE:
                    value = toDateTimeLocal(reservation.reservationDate);
                    break;
                case FIELD_IDS.ENTRY_TIME:
                    value = toDateTimeLocal(reservation.entryTime);
                    break;
                case FIELD_IDS.TREATMENT_START:
                    value = toDateTimeLocal(reservation.treatmentStart);
                    break;
                case FIELD_IDS.TREATMENT_END:
                    value = toDateTimeLocal(reservation.treatmentEnd);
                    break;
                case FIELD_IDS.CREATED_AT:
                    value = toDateTimeLocal(reservation.createdAt);
                    break;
            }

            initialFields[def.id] = {
                ...def,
                value,
                error: '',
                onChange: (val: any) => updateField(def.id as FieldId, val),
                onError: (err: string | null) => handleFieldError(def.id as FieldId, err),
            };
        });
        setFields(initialFields);
    }, [reservation, edit]);


    const updateField = useCallback((fieldId: FieldId, newValue: any) => {
        setFields(prev => ({
            ...prev,
            [fieldId]: {
                ...prev[fieldId],
                value: newValue,
                error: '',
            },
        }));
    }, []);


    const handleFieldError = useCallback((fieldId: FieldId, error: string | null) => {
        setFields(prev => ({
            ...prev,
            [fieldId]: {
                ...prev[fieldId],
                error: error || '',
            },
        }));
    }, []);

    const handleEdit = () => {
        if (edit && reservation) {

            const editableFields = [FIELD_IDS.NAME, FIELD_IDS.PHONE, FIELD_IDS.BLOOD_TYPE, FIELD_IDS.RESERVATION_TYPE];
            const hasErrors = editableFields.some(fieldId => fields[fieldId]?.error);
            if (hasErrors) {
                alert('Please fix the errors before saving.');
                return;
            }
            updateReservation(reservation.id, {
                name: fields[FIELD_IDS.NAME]?.value,
                phone: fields[FIELD_IDS.PHONE]?.value,
                bloodType: fields[FIELD_IDS.BLOOD_TYPE]?.value,
                reservationType: fields[FIELD_IDS.RESERVATION_TYPE]?.value,
            });
            setEdit(false);
        } else {
            setEdit(true);
        }
    };

    const handleStatusChange = (newStatus: ReservationStatus) => {
        if (reservation) {
            updateReservation(reservation.id, { reservationStatus: newStatus });
        }
    };

    if (loading) return <div className="p-5 text-center">Loading...</div>;
    if (error) return <div className="p-5 text-center text-red-600">{error}</div>;
    if (!reservation) return null;

    const reservationStatus = ReservationStatuses.find(r => r.item === reservation.reservationStatus);

    return (
        <div className="relative w-full pb-20">
            <div className="relative w-full p-5 lg:px-40 md:px-5">
                <IoIosArrowBack
                    className="text-3xl cursor-pointer mb-4"
                    onClick={() => window.history.back()}
                />
                <div className="flex flex-col gap-3">
                    {Object.values(fields).map(field => (
                        <Input key={field.id} {...field} />
                    ))}
                </div>
            </div>

            {/* Status action buttons */}
            <div className="relative flex justify-center items-center gap-2 flex-wrap">
                {reservationStatus?.previous && (
                    <button
                        onClick={() => handleStatusChange(reservationStatus.previous as ReservationStatus)}
                        className="flex items-center gap-3 p-3 bg-leight dark:bg-dark-foreground rounded-full hover:scale-110 duration-300 cursor-pointer"
                    >
                        <FaArrowAltCircleLeft fontSize="20px" />
                        <span className="capitalize">change to {reservationStatus.previous}</span>
                    </button>
                )}

                {reservationStatus?.next && (
                    <button
                        onClick={() => handleStatusChange(reservationStatus.next as ReservationStatus)}
                        className="flex items-center gap-3 p-3 bg-leight dark:bg-dark-foreground rounded-full hover:scale-110 duration-300 cursor-pointer"
                    >
                        <span className="capitalize">change to {reservationStatus.next}</span>
                        {reservationStatus.next === 'completed' ? (
                            <FaCheckCircle fontSize="20px" />
                        ) : (
                            <FaArrowAltCircleRight fontSize="20px" />
                        )}
                    </button>
                )}
                {reservationStatus?.item !== 'completed' && reservationStatus?.item !== 'cancelled' && (
                    <button
                        onClick={handleEdit}
                        className="flex items-center gap-3 p-3 bg-leight dark:bg-dark-foreground rounded-full hover:scale-110 duration-300 cursor-pointer"
                    >
                        {edit ? (
                            <>
                                <FaCheck fontSize="23px" />
                                <span className="capitalize">Save</span>
                            </>
                        ) : (
                            <>
                                <FaRegEdit fontSize="23px" />
                                <span className="capitalize">Edit</span>
                            </>
                        )}
                    </button>

                )}
                {!reservationStatus?.previous && reservationStatus?.item !== 'completed' && reservationStatus?.item !== 'cancelled' && (
                    <button
                        onClick={() => handleStatusChange('cancelled')}
                        className="flex items-center gap-3 p-3 bg-leight dark:bg-dark-foreground rounded-full hover:scale-110 duration-300 cursor-pointer"
                    >
                        <MdOutlineCancel color="red" fontSize="23px" />
                        <span className="capitalize">Cancel</span>
                    </button>
                )}




                {!reservationStatus?.previous && reservationStatus?.item !== 'completed' && reservationStatus?.item !== 'cancelled' && (
                    <button
                        onClick={() => {
                            deleteReservation(reservation.id)
                            navigate(-1)
                        }}
                        className="flex items-center gap-3 p-3 bg-leight dark:bg-dark-foreground rounded-full hover:scale-110 duration-300 cursor-pointer"
                    >
                        <FaRegTrashAlt color="red" fontSize="23px" />
                        <span className="capitalize">Delete</span>
                    </button>
                )}
            </div>
        </div>
    );
}