
"use client"

import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Campaign } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPinIcon, ClockIcon } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { Navbar } from "@/components/navbar";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "campaigns"), orderBy("date", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const camps = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Convert Firestore Timestamp to JS Date if needed, but TypeScript interface expects Timestamp
          // However, we might want to store it as string in state or handle Timestamp methods
        } as Campaign;
      });
      setCampaigns(camps);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const mockCampaigns: Campaign[] = [
    {
      id: "camp-mock-1",
      name: "Downtown Blood Drive 2024",
      description: "Join our community effort to replenish local blood banks. Refreshments provided for all donors.",
      organizer: "City Health Department",
      date: Timestamp.fromDate(new Date(Date.now() + 86400000 * 5)), // 5 days from now
      location: "City Center Hall, Main St",
      city: "New York",
      createdAt: Timestamp.now(),
      // time property is technically not in interface but used in UI
      // @ts-ignore
      time: "9:00 AM - 3:00 PM" 
    },
    {
      id: "camp-mock-2",
      name: "University Campus Drive",
      description: "Students and faculty are invited to donate. Help save lives while on campus!",
      organizer: "Student Red Cross Club",
      date: Timestamp.fromDate(new Date(Date.now() + 86400000 * 12)), 
      location: "Student Union Building",
      city: "Brooklyn",
      createdAt: Timestamp.now(),
       // @ts-ignore
      time: "10:00 AM - 5:00 PM"
    },
    {
      id: "camp-mock-3",
      name: "Corporate Charity Drive",
      description: "Partnering with local businesses to support emergency services.",
      organizer: "TechCorp Inc.",
      date: Timestamp.fromDate(new Date(Date.now() + 86400000 * 20)), 
      location: "Tech Park Auditorium",
      city: "San Francisco",
      createdAt: Timestamp.now(),
       // @ts-ignore
      time: "8:00 AM - 2:00 PM"
    }
  ];

  const displayCampaigns = campaigns.length > 0 ? campaigns : mockCampaigns;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8 pt-24">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blood Donation Campaigns</h1>
            <p className="text-gray-600 mt-2">Find and participate in upcoming donation drives near you.</p>
          </div>
          <Link href="/campaigns/register">
            <Button className="mt-4 md:mt-0 bg-red-600 hover:bg-red-700">Register New Campaign</Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayCampaigns.map((campaign) => (
              <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-red-700">{campaign.name}</CardTitle>
                  <CardDescription>Organized by {campaign.organizer}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 line-clamp-3">{campaign.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                       <CalendarIcon className="w-4 h-4 text-red-500" />
                       <span>{campaign.date ? format(campaign.date.toDate(), "PPP") : "TBD"}</span>
                    </div>
                    {/* Assuming time is stored separately or part of date, sticking to schema which has separate time string */}
                    <div className="flex items-center gap-2">
                       <ClockIcon className="w-4 h-4 text-red-500" />
                       <span>{(campaign as any).time || "9:00 AM - 5:00 PM"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <MapPinIcon className="w-4 h-4 text-red-500" />
                       <span>{campaign.location}, {campaign.city}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full border-red-200 text-red-700 hover:bg-red-50">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            {campaigns.length === 0 && (
              <div className="col-span-full text-center py-16 bg-white rounded-lg shadow-sm">
                <p className="text-lg text-gray-500">No upcoming campaigns found.</p>
                <Link href="/campaigns/register" className="text-red-600 hover:underline mt-2 inline-block">
                  Be the first to organize one!
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
