
import { z } from 'zod';

export const donorSchema = z.object({
    fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
    age: z.coerce.number().min(18, { message: "You must be at least 18 years old." }).max(65, { message: "Age must be under 65." }),
    gender: z.enum(["Male", "Female", "Other"]),
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
    phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
    city: z.string().min(2, { message: "City is required." }),
    lastDonationDate: z.string().optional(),
    isEligible: z.boolean().refine((val) => val === true, {
        message: "You must confirm your eligibility.",
    }),
});


export const campaignSchema = z.object({
    name: z.string().min(5, { message: "Campaign name must be at least 5 characters." }),
    description: z.string().min(10, { message: "Description must be at least 10 characters." }),
    organizer: z.string().min(2, { message: "Organizer name is required." }),
    date: z.string().refine((val) => new Date(val) > new Date(), {
        message: "Date must be in the future.",
    }),
    time: z.string().min(1, { message: "Time is required" }),
    location: z.string().min(5, { message: "Location address is required." }),
    city: z.string().min(2, { message: "City is required." }),
});


export const emergencyRequestSchema = z.object({
    patientName: z.string().min(2, { message: "Patient name is required." }),
    hospitalName: z.string().min(2, { message: "Hospital name is required." }),
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
    unitsNeeded: z.coerce.number().min(1, { message: "At least 1 unit is required." }),
    contactNumber: z.string().min(10, { message: "Valid contact number is required." }),
    city: z.string().min(2, { message: "City is required." }),
    priority: z.enum(["Normal", "Emergency"]),
});

export type DonorFormData = z.infer<typeof donorSchema>;
export type CampaignFormData = z.infer<typeof campaignSchema>;
export type EmergencyRequestFormData = z.infer<typeof emergencyRequestSchema>;


