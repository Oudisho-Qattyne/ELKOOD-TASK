// import { useReservationStore} from "../../store/store";
import { useEffect, useState, useCallback } from "react";
import type { InputProps } from "../../components/input/types";
import { BloodTypes, ReservationTypes } from "../../store/constants";
import Input from "../../components/input";
import { IoIosArrowBack } from "react-icons/io";

export default function AddReservation() {
//   const addReservation = useReservationStore(state => state.addReservation);
  const [formData, setFormData] = useState<Record<string, any>>({});

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

 
 
 
  useEffect(() => {
    setFormData({
      [FIELD_IDS.NAME]: '',
      [FIELD_IDS.PHONE]: '',
      [FIELD_IDS.BLOOD_TYPE]: 'unknown',
      [FIELD_IDS.RESERVATION_TYPE]: 'pre-booked',
      [FIELD_IDS.RESERVATION_DATE]: toDateTimeLocal(new Date()),
      [FIELD_IDS.ENTRY_TIME]: null,
      [FIELD_IDS.TREATMENT_START]: null,
      [FIELD_IDS.TREATMENT_END]: null,
      [FIELD_IDS.CREATED_AT]: toDateTimeLocal(new Date()),
    });
  }, []);

  const handleChange = useCallback((fieldId: FieldId, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  }, []);

  

 

 
  const fieldDefinitions: Omit<InputProps, 'value' | 'onChange'>[] = [
    { id: FIELD_IDS.NAME, title: 'Name', type: 'text', disabled: false, validation: [] },
    { id: FIELD_IDS.PHONE, title: 'Phone Number', type: 'text', disabled: false, validation: ['phoneNumber'] },
    { id: FIELD_IDS.RESERVATION_DATE, title: 'Reservation Date', type: 'datetime-local', disabled: false, validation: [] },
    { id: FIELD_IDS.BLOOD_TYPE, title: 'Blood Type', type: 'select', data: BloodTypes, disabled: false, validation: [] },
    { id: FIELD_IDS.RESERVATION_TYPE, title: 'Reservation Type', type: 'select', data: ReservationTypes, disabled: false, validation: [] },
   
  ];

  
  


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

      <div className="relative flex justify-center items-center gap-2 flex-wrap">
       

      </div>
    </div>
  );
}