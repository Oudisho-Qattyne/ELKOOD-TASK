import { useReservationStore } from "../../store/store";
import { useEffect, useState, useCallback } from "react";
import type { InputProps } from "../../components/input/types";
import { BloodTypes, ReservationTypes } from "../../store/constants";
import Input from "../../components/input";
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

export default function AddReservation() {
  const addReservation = useReservationStore(state => state.addReservation);
  const [fields, setFields] = useState<Record<string, InputProps>>({});

  const FIELD_IDS = {
    NAME: '1',
    PHONE: '2',
    BLOOD_TYPE: '3',
    RESERVATION_TYPE: '4',
    RESERVATION_DATE: '6',
    ENTRY_TIME: '7',
    TREATMENT_START: '8',
    TREATMENT_END: '9',
    CREATED_AT: '10',
  } as const;

  type FieldId = keyof typeof FIELD_IDS;

  
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

  
  const baseFieldDefinitions: Omit<InputProps, 'value' | 'onChange' | 'error' | 'valid'>[] = [
    { id: FIELD_IDS.NAME, title: 'Name', type: 'text', disabled: false, validation: ['required'] },
    { id: FIELD_IDS.PHONE, title: 'Phone Number', type: 'text', disabled: false, validation: ['phoneNumber' , 'required'] },
    { id: FIELD_IDS.RESERVATION_DATE, title: 'Reservation Date', type: 'datetime-local', disabled: false, validation: ['required'] },
    { id: FIELD_IDS.BLOOD_TYPE, title: 'Blood Type', type: 'select' , showTitle:true, data: BloodTypes, disabled: false, validation: [] },
    { id: FIELD_IDS.RESERVATION_TYPE, title: 'Reservation Type', type: 'select' , showTitle:true, data: ReservationTypes, disabled: false, validation: [] },
  ];

  
  useEffect(() => {
    const initialFields: Record<string, InputProps> = {};
    baseFieldDefinitions.forEach(def => {
      let value: any = null;
      switch (def.id) {
        case FIELD_IDS.NAME:
          value = '';
          break;
        case FIELD_IDS.PHONE:
          value = '';
          break;
        case FIELD_IDS.RESERVATION_DATE:
          value = toDateTimeLocal(new Date());
          break;
        case FIELD_IDS.BLOOD_TYPE:
          value = 'unknown';
          break;
        case FIELD_IDS.RESERVATION_TYPE:
          value = 'pre-booked';
          break;
        default:
          value = null;
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
  }, []);

  
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

  

  const handleAdd = () => {
    const addFields = [FIELD_IDS.NAME, FIELD_IDS.PHONE, FIELD_IDS.BLOOD_TYPE, FIELD_IDS.RESERVATION_TYPE];
    const hasErrors = addFields.some(fieldId => fields[fieldId]?.error);
    
    if (hasErrors) {
      alert('Please fix the errors before saving.');
      return;
    }
    addReservation({
      name: fields[FIELD_IDS.NAME]?.value,
      phone: fields[FIELD_IDS.PHONE]?.value,
      reservationDate: fields[FIELD_IDS.RESERVATION_DATE]?.value,
      bloodType: fields[FIELD_IDS.BLOOD_TYPE]?.value,
      reservationType: fields[FIELD_IDS.RESERVATION_TYPE]?.value,
    });
    
    window.history.back();
  };

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

      <div className="relative flex justify-end items-center gap-2 flex-wrap py-5">
        <button
          onClick={handleAdd}
          className="flex items-center gap-3 p-3 bg-leight dark:bg-dark-foreground rounded-full hover:scale-110 duration-300 cursor-pointer"
        >
          <FaCheck fontSize="23px" />
          <span className="capitalize">Add</span>
        </button>
      </div>
      </div>
      </div>
  );
}