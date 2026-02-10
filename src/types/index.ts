
import { Timestamp } from 'firebase/firestore';

export interface BloodStock {
    'A+': number;
    'A-': number;
    'B+': number;
    'B-': number;
    'AB+': number;
    'AB-': number;
    'O+': number;
    'O-': number;
}

export interface BloodBank {
    id: string;
    name: string;
    city: string;
    phone: string;
    address: string;
    stock: BloodStock;
    lastUpdated: Timestamp;
}

export interface Campaign {
    id: string;
    name: string;
    description: string;
    organizer: string;
    date: Timestamp;
    location: string;
    city: string;
    createdAt: Timestamp;
}

export interface EmergencyRequest {
    id: string;
    requesterName: string;
    patientName: string;
    bloodGroup: string;
    unitsNeeded: number;
    hospitalName: string;
    city: string;
    contactNumber: string;
    priority: 'Emergency' | 'Normal';
    status: 'Pending' | 'Fulfilled' | 'Cancelled';
    createdAt: Timestamp;
}
