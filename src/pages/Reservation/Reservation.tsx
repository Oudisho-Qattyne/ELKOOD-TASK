import { useParams } from "react-router";
import { useReservationStore, type Reservation, type ReservationStatus } from "../../store/store";
import { useEffect, useState, useCallback } from "react";
import type { InputProps } from "../../components/input/types";
import { BloodTypes, ReservationStatuses, ReservationTypes } from "../../store/constants";
import Input from "../../components/input";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaCheck, FaCheckCircle, FaRegEdit } from "react-icons/fa";

export default function Reservation() {
  const [edit, setEdit] = useState(false);
  const reservations = useReservationStore(state => state.reservations);
  const updateReservation = useReservationStore(state => state.updateReservation);
  const { id } = useParams();
  const getReservation = useReservationStore(state => state.getReservation);
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

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

  // Helper to format date for datetime-local
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

  // Load reservation
  useEffect(() => {
    if (!id) {
      setError('No reservation ID provided');
      setLoading(false);
      return;
    }
    const result = getReservation(id);
    if (result === 'not found') {
      setError('Reservation not found');
    } else if(typeof(result) != 'string') {
      setReservation(result);
    }
    setLoading(false);
  }, [id, getReservation, reservations]);

  // Populate form when reservation loads
  useEffect(() => {
    if (!reservation) return;
    setFormData({
      [FIELD_IDS.NAME]: reservation.name || '',
      [FIELD_IDS.PHONE]: reservation.phone || '',
      [FIELD_IDS.BLOOD_TYPE]: reservation.bloodType || null,
      [FIELD_IDS.RESERVATION_TYPE]: reservation.reservationType || null,
      [FIELD_IDS.RESERVATION_STATUS]: reservation.reservationStatus || null,
      [FIELD_IDS.RESERVATION_DATE]: toDateTimeLocal(reservation.reservationDate),
      [FIELD_IDS.ENTRY_TIME]: toDateTimeLocal(reservation.entryTime),
      [FIELD_IDS.TREATMENT_START]: toDateTimeLocal(reservation.treatmentStart),
      [FIELD_IDS.TREATMENT_END]: toDateTimeLocal(reservation.treatmentEnd),
      [FIELD_IDS.CREATED_AT]: toDateTimeLocal(reservation.createdAt),
    });
  }, [reservation]);

  const handleChange = useCallback((fieldId: FieldId, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  }, []);

  const handleEdit = () => {
    if (edit && reservation) {
      updateReservation(reservation.id, {
        name: formData[FIELD_IDS.NAME],
        phone: formData[FIELD_IDS.PHONE],
        bloodType: formData[FIELD_IDS.BLOOD_TYPE],
        reservationType: formData[FIELD_IDS.RESERVATION_TYPE],
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

  // Define fields – now created on every render with current `edit` value
  const fieldDefinitions: Omit<InputProps, 'value' | 'onChange'>[] = [
    { id: FIELD_IDS.NAME, title: 'Name', type: 'text', disabled: !edit, validation: [] },
    { id: FIELD_IDS.PHONE, title: 'Phone Number', type: 'text', disabled: !edit, validation: ['phoneNumber'] },
    { id: FIELD_IDS.BLOOD_TYPE, title: 'Blood Type', type: 'select', data: BloodTypes, disabled: !edit, validation: [] },
    { id: FIELD_IDS.RESERVATION_TYPE, title: 'Reservation Type', type: 'select', data: ReservationTypes, disabled: !edit, validation: [] },
    { id: FIELD_IDS.RESERVATION_STATUS, title: 'Reservation Status', type: 'select', data: ReservationStatuses, disabled: true, validation: [] },
    { id: FIELD_IDS.RESERVATION_DATE, title: 'Reservation Date', type: 'datetime-local', disabled: true, validation: [] },
    { id: FIELD_IDS.ENTRY_TIME, title: 'Entry Time', type: 'datetime-local', disabled: true, validation: [] },
    { id: FIELD_IDS.TREATMENT_START, title: 'Treatment Start', type: 'datetime-local', disabled: true, validation: [] },
    { id: FIELD_IDS.TREATMENT_END, title: 'Treatment End', type: 'datetime-local', disabled: true, validation: [] },
    { id: FIELD_IDS.CREATED_AT, title: 'Created At', type: 'datetime-local', disabled: true, validation: [] },
  ];

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
          {fieldDefinitions.map(def => (
            <Input
              key={def.id}
              {...def}
              value={formData[def.id]}
              onChange={(val: any) => handleChange(def.id as FieldId, val)}
              error=""
              valid={true}
            />
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

        {!reservationStatus?.previous && reservationStatus?.item !== 'completed' && reservationStatus?.item !== 'cancelled' && (
          <button
            onClick={() => handleStatusChange('cancelled')}
            className="flex items-center gap-3 p-3 bg-leight dark:bg-dark-foreground rounded-full hover:scale-110 duration-300 cursor-pointer"
          >
            <MdOutlineCancel color="red" fontSize="23px" />
            <span className="capitalize">Cancel</span>
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
      </div>
    </div>
  );
}