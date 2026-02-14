import { FaRegBookmark } from "react-icons/fa";
import type { Reservation } from "./store";
import { CgSandClock } from "react-Icons/cg";

import { FaPersonWalkingArrowRight } from "react-icons/fa6";
import { FiAlertTriangle } from "react-icons/fi";
import { LiaTeethOpenSolid, LiaTeethSolid } from "react-icons/lia";
import { MdOutlineCancel } from "react-icons/md";
export const BloodTypes = [
    {
        id: '0',
        item: 'Blood Type',
        value:''
    },
    {
        id: '1',
        item: 'A+',
        value:'A+'
    },
    {
        id: '2',
        item: 'A*-',
        value:'A-'
    },
    {
        id: '3',
        item: 'B+',
        value:'B+'
    },
    {
        id: '4',
        item: 'B*-',
        value:'B-'
    },
    {
        id: '5',
        item: 'AB+',
        value:'AB+'
    },
    {
        id: '6',
        item: 'AB*-',
        value:'AB-'
    },
    {
        id: '7',
        item: 'O+',
        value:'O+'
    },
    {
        id: '8',
        item: 'O*-',
        value:'O-'
    },
    {
        id: '9',
        item: 'unknown',
        value:'unknown'
    },
]

export const ReservationStatuses = [
    {
        id: '0',
        item: 'Reservation Status',
        value:'',
        color: '#3B82F6',
        Icon:FaRegBookmark  ,
        render:false,
        next:'',
        previous:''
    },
    {
        id: '1',
        item: 'upcoming',
        value:'upcoming',
        color: '#3B82F6',
        Icon:FaRegBookmark  ,
        render:true,
        next:'waiting',
        previous:''
    },
    {
        id: '2',
        item: 'waiting',
        value:'waiting',
        color: '#F59E0B',
        Icon:CgSandClock ,
        render:true,
        next:'in-treatment',
        previous:'upcoming'
    },
    {
        id: '3',
        item: 'in-treatment',
        value:'in-treatment',
        color: '#10B981',
        Icon:LiaTeethOpenSolid,
        render:true,
        next:'completed',
        previous:'waiting'
    },
    {
        id: '4',
        item: 'completed',
        value:'completed',
        color: '#6B7280',
        Icon:LiaTeethSolid,
        render:false,
        next:'',
        previous:''
    },
    {
        id: '5',
        item: 'cancelled',
        value:'cancelled',
        color: '#EF4444',
        Icon:MdOutlineCancel ,
        render:false,
        next:'',
        previous:''
    },
]

export const ReservationTypes = [
    {
        id: '09',
        item: 'Reservation Type',
        value:'',
        Icon:FaRegBookmark ,
        color: '#3B82F6' 
    },
    {
        id: '1',
        item: 'pre-booked',
        value:'pre-booked',
        Icon:FaRegBookmark ,
        color: '#3B82F6' 
    },
    {
        id: '2',
        item: 'walk-in',
        value:'walk',
        Icon:FaPersonWalkingArrowRight ,
        color: '#8B5CF6' 
    },
    {
        id: '3',
        item: 'emergency',
        value:'emergency',
        Icon:FiAlertTriangle ,
        color: '#EF4444' 
    },
]
export const ReservationSortFieldsKanban = [
    {
        id: '0',
        item: 'Sort',
        value:'',
    },
    {
        id: '1',
        item: 'reservation-type',
        value:'reservation-type',
    },
    {
        id: '2',
        item: 'reservation-date',
        value:'reservation-date',
    },
    ,
    {
        id: '3',
        item: 'name',
        value:'name',
    },
]
export const ReservationSortFields = [
    {
        id: '0',
        item: 'all',
        value:'',
    },
    {
        id: '1',
        item: 'reservation-type',
        value:'reservation-type',
    },
    {
        id: '2',
        item: 'blood-type',
        value:'blood-type',
    },
    {
        id: '3',
        item: 'reservation-status',
        value:'reservation-status',
    },
    {
        id: '4',
        item: 'reservation-date',
        value:'reservation-date',
    },
    ,
    {
        id: '5',
        item: 'name',
        value:'name',
    },
]
export const dummyReservations: Reservation[] = [
    {
      id: '101',
      name: 'John Smith',
      phone: '555-0101',
      bloodType: 'A+',
      reservationType: 'pre-booked',
      reservationStatus: 'upcoming',
      reservationDate: '2025-04-10',
      entryTime: null,
      treatmentStart: null,
      treatmentEnd: null,
      createdAt: new Date('2025-03-25T14:30:00'),
    },
    {
      id: '102',
      name: 'Emily Johnson',
      phone: '555-0102',
      bloodType: 'O-',
      reservationType: 'walk-in',
      reservationStatus: 'waiting',
      reservationDate: '2025-04-05',
      entryTime: new Date('2025-04-05T09:00:00'),
      treatmentStart: null,
      treatmentEnd: null,
      createdAt: new Date('2025-04-05T09:00:00'),
    },
    {
      id: '103',
      name: 'Michael Brown',
      phone: '555-0103',
      bloodType: 'B+',
      reservationType: 'emergency',
      reservationStatus: 'in-treatment',
      reservationDate: '2025-04-05',
      entryTime: new Date('2025-04-05T10:15:00'),
      treatmentStart: new Date('2025-04-05T10:20:00'),
      treatmentEnd: null,
      createdAt: new Date('2025-04-05T10:15:00'),
    },
    {
      id: '104',
      name: 'Sarah Davis',
      phone: '555-0104',
      bloodType: 'AB-',
      reservationType: 'pre-booked',
      reservationStatus: 'completed',
      reservationDate: '2025-04-03',
      entryTime: new Date('2025-04-03T11:30:00'),
      treatmentStart: new Date('2025-04-03T11:40:00'),
      treatmentEnd: new Date('2025-04-03T12:10:00'),
      createdAt: new Date('2025-03-20T09:00:00'),
    },
    {
      id: '105',
      name: 'James Wilson',
      phone: '555-0105',
      bloodType: 'unknown',
      reservationType: 'walk-in',
      reservationStatus: 'cancelled',
      reservationDate: '2025-04-02',
      entryTime: null,
      treatmentStart: null,
      treatmentEnd: null,
      createdAt: new Date('2025-04-02T08:45:00'),
    },
    {
      id: '106',
      name: 'Linda Martinez',
      phone: '555-0106',
      bloodType: 'A-',
      reservationType: 'pre-booked',
      reservationStatus: 'upcoming',
      reservationDate: '2025-04-12',
      entryTime: null,
      treatmentStart: null,
      treatmentEnd: null,
      createdAt: new Date('2025-03-28T11:20:00'),
    },
    {
      id: '107',
      name: 'David Anderson',
      phone: '555-0107',
      bloodType: 'O+',
      reservationType: 'emergency',
      reservationStatus: 'waiting',
      reservationDate: '2025-04-06',
      entryTime: new Date('2025-04-06T13:10:00'),
      treatmentStart: null,
      treatmentEnd: null,
      createdAt: new Date('2025-04-06T13:10:00'),
    },
    {
      id: '108',
      name: 'Patricia Thomas',
      phone: '555-0108',
      bloodType: 'B-',
      reservationType: 'walk-in',
      reservationStatus: 'in-treatment',
      reservationDate: '2025-04-06',
      entryTime: new Date('2025-04-06T14:00:00'),
      treatmentStart: new Date('2025-04-06T14:05:00'),
      treatmentEnd: null,
      createdAt: new Date('2025-04-06T14:00:00'),
    },
    {
      id: '109',
      name: 'Robert Jackson',
      phone: '555-0109',
      bloodType: 'AB+',
      reservationType: 'pre-booked',
      reservationStatus: 'completed',
      reservationDate: '2025-04-04',
      entryTime: new Date('2025-04-04T10:00:00'),
      treatmentStart: new Date('2025-04-04T10:10:00'),
      treatmentEnd: new Date('2025-04-04T10:35:00'),
      createdAt: new Date('2025-03-22T16:00:00'),
    },
    {
      id: '110',
      name: 'Jennifer White',
      phone: '555-0110',
      bloodType: 'A+',
      reservationType: 'emergency',
      reservationStatus: 'cancelled',
      reservationDate: '2025-04-01',
      entryTime: null,
      treatmentStart: null,
      treatmentEnd: null,
      createdAt: new Date('2025-04-01T07:30:00'),
    },
    {
      id: '111',
      name: 'Charles Harris',
      phone: '555-0111',
      bloodType: 'O-',
      reservationType: 'pre-booked',
      reservationStatus: 'waiting',
      reservationDate: '2025-04-07',
      entryTime: new Date('2025-04-07T09:30:00'),
      treatmentStart: null,
      treatmentEnd: null,
      createdAt: new Date('2025-03-30T10:00:00'),
    },
    {
      id: '112',
      name: 'Margaret Clark',
      phone: '555-0112',
      bloodType: 'B+',
      reservationType: 'walk-in',
      reservationStatus: 'upcoming',
      reservationDate: '2025-04-09',
      entryTime: null,
      treatmentStart: null,
      treatmentEnd: null,
      createdAt: new Date('2025-04-09T08:00:00'), // same day as reservation?
    },
    {
      id: '113',
      name: 'Christopher Lewis',
      phone: '555-0113',
      bloodType: 'unknown',
      reservationType: 'emergency',
      reservationStatus: 'in-treatment',
      reservationDate: '2025-04-06',
      entryTime: new Date('2025-04-06T15:45:00'),
      treatmentStart: new Date('2025-04-06T15:50:00'),
      treatmentEnd: null,
      createdAt: new Date('2025-04-06T15:45:00'),
    },
    {
      id: '114',
      name: 'Elizabeth Walker',
      phone: '555-0114',
      bloodType: 'AB-',
      reservationType: 'pre-booked',
      reservationStatus: 'completed',
      reservationDate: '2025-04-02',
      entryTime: new Date('2025-04-02T13:00:00'),
      treatmentStart: new Date('2025-04-02T13:15:00'),
      treatmentEnd: new Date('2025-04-02T13:50:00'),
      createdAt: new Date('2025-03-18T12:30:00'),
    },
    {
      id: '115',
      name: 'Daniel Hall',
      phone: '555-0115',
      bloodType: 'A-',
      reservationType: 'walk-in',
      reservationStatus: 'waiting',
      reservationDate: '2025-04-08',
      entryTime: new Date('2025-04-08T11:00:00'),
      treatmentStart: null,
      treatmentEnd: null,
      createdAt: new Date('2025-04-08T11:00:00'),
    },
  ];