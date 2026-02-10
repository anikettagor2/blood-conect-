import { EmergencyRequestForm } from "@/components/emergency-request-form";
import { Navbar } from "@/components/navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertCircle, Phone, MapPin, Droplet } from "lucide-react";
import { Timestamp } from "firebase/firestore";
import { EmergencyRequest } from "@/types";

export default function EmergencyRequestPage() {
  const mockRequests: EmergencyRequest[] = [
      {
          id: "er-1",
          requesterName: "Sarah Connor",
          patientName: "John Connor",
          bloodGroup: "O-",
          unitsNeeded: 3,
          hospitalName: "Cyberdyne Memorial",
          city: "Los Angeles",
          contactNumber: "+1 (555) 999-8888",
          priority: "Emergency",
          status: "Pending",
          createdAt: Timestamp.now()
      },
      {
          id: "er-2",
          requesterName: "Bruce Wayne",
          patientName: "Alfred Pennyworth",
          bloodGroup: "AB+",
          unitsNeeded: 2,
          hospitalName: "Gotham General",
          city: "Gotham",
          contactNumber: "+1 (555) 123-4567",
          priority: "Emergency",
          status: "Pending",
          createdAt: Timestamp.now()
      }
  ];

  return (
    <div className="min-h-screen bg-rose-50 flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 border-t-4 border-red-600">
                  <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-red-700 tracking-tight">EMERGENCY BLOOD REQUEST</h1>
                    <p className="text-gray-700 mt-4 text-lg">
                      Submit your request immediately. We will broadcast this to all nearby eligible donors.
                    </p>
                  </div>
                  <EmergencyRequestForm />
                </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
                        <AlertCircle className="text-red-600 animate-pulse" />
                        Live Requests
                    </h3>
                    <div className="space-y-4">
                        {mockRequests.map(req => (
                            <div key={req.id} className="p-4 bg-red-50 rounded-md border border-red-100">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-bold text-red-700">{req.bloodGroup} Blood Needed</span>
                                    <span className="bg-red-200 text-red-800 text-xs px-2 py-1 rounded-full animate-pulse">URGENT</span>
                                </div>
                                <div className="text-sm text-gray-700 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <Droplet size={14} className="text-red-500" />
                                        <span>{req.unitsNeeded} Units for {req.patientName}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin size={14} className="text-red-500" />
                                        <span>{req.hospitalName}, {req.city}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone size={14} className="text-red-500" />
                                        <span>{req.contactNumber}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-100 text-center">
                    <h4 className="font-bold text-blue-800 mb-2">Can you help?</h4>
                    <p className="text-sm text-blue-700 mb-4">
                        Check the requests above. If you are a match and nearby, please contact the requester immediately.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
