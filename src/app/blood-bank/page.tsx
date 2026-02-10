
"use client"

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { BloodBank } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, X, AlertCircle } from "lucide-react";
import { Navbar } from "@/components/navbar";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const getStockStatus = (count: number) => {
  if (count <= 2) return { text: "Critical", color: "text-red-600 bg-red-50", icon: <AlertCircle size={14} /> };
  if (count <= 5) return { text: "Low", color: "text-amber-600 bg-amber-50", icon: <AlertCircle size={14} /> };
  return { text: "Available", color: "text-green-600 bg-green-50", icon: <Check size={14} /> };
};

export default function BloodBankDashboard() {
  const [bloodBanks, setBloodBanks] = useState<BloodBank[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");

  useEffect(() => {
    // If you want to filter by city later, add the where clause
    const q = query(collection(db, "bloodBanks"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const banks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as BloodBank[];
      setBloodBanks(banks);
    });

  }, []);

  const mockBloodBanks: BloodBank[] = [
    {
      id: "mock-1",
      name: "City General Hospital Blood Bank",
      city: "New York",
      address: "123 Medical Center Blvd, New York, NY",
      phone: "+1 (555) 123-4567",
      lastUpdated: Timestamp.now(),
      stock: {
        'A+': 15, 'A-': 5, 'B+': 12, 'B-': 3, 'AB+': 4, 'AB-': 1, 'O+': 20, 'O-': 8
      }
    },
    {
      id: "mock-2",
      name: "Red Cross Donation Center",
      city: "Brooklyn",
      address: "456 Charity Lane, Brooklyn, NY",
      phone: "+1 (555) 987-6543",
      lastUpdated: Timestamp.now(),
      stock: {
        'A+': 8, 'A-': 2, 'B+': 15, 'B-': 6, 'AB+': 2, 'AB-': 0, 'O+': 10, 'O-': 4
      }
    },
     {
      id: "mock-3",
      name: "Community Lifeblood Center",
      city: "Queens",
      address: "789 Health Ave, Queens, NY",
      phone: "+1 (555) 456-7890",
      lastUpdated: Timestamp.now(),
      stock: {
        'A+': 5, 'A-': 8, 'B+': 5, 'B-': 10, 'AB+': 7, 'AB-': 2, 'O+': 25, 'O-': 12
      }
    },
    {
       id: "mock-4",
       name: "St. Mary&apos;s Hospital",
       city: "Manhattan",
       address: "101 1st Ave, New York, NY",
       phone: "+1 (555) 111-2222",
       lastUpdated: Timestamp.now(),
       stock: {
         'A+': 2, 'A-': 0, 'B+': 4, 'B-': 1, 'AB+': 0, 'AB-': 0, 'O+': 5, 'O-': 2
       }
     }
  ];

  const displayBanks = bloodBanks.length > 0 ? bloodBanks : mockBloodBanks;

  const filteredBanks = displayBanks.filter(
    (bank) =>
      (selectedCity === "All" || bank.city === selectedCity) &&
      bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const uniqueCities = ["All", ...Array.from(new Set(displayBanks.map((b) => b.city)))];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8 pt-24">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Blood Bank Dashboard</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Input 
            placeholder="Search by hospital/bank name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:w-1/3"
          />
          <select 
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="p-2 border rounded-md"
          >
            {uniqueCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBanks.map((bank) => (
            <Card key={bank.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{bank.name}</CardTitle>
                    <CardDescription>{bank.city}</CardDescription>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Updated: {bank.lastUpdated?.toDate().toLocaleDateString()}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2">
                  {bloodGroups.map((bg) => {
                    const count = bank.stock?.[bg as keyof typeof bank.stock] || 0;
                    const status = getStockStatus(count);
                    return (
                      <div key={bg} className={`flex flex-col items-center p-2 rounded-lg border ${status.color ? '' : 'bg-gray-50'}`}>
                        <span className="text-sm font-bold">{bg}</span>
                        <div className={`flex items-center gap-1 text-xs font-semibold ${status.color}`}>
                           {status.icon}
                           {status.text === 'Available' ? count : status.text}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 pt-4 border-t text-sm text-gray-500">
                  <p><strong>Contact:</strong> {bank.phone}</p>
                  <p className="truncate"><strong>Address:</strong> {bank.address}</p>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredBanks.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              No blood banks found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
