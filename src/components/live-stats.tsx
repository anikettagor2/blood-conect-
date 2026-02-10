
"use client"

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent } from "@/components/ui/card";

export function LiveStats() {
  const [counts, setCounts] = useState({
    donors: 0,
    campaigns: 0,
    bloodBanks: 0,
    availableUnits: 0,
  });

  useEffect(() => {
    // Real-time listeners for stats
    const unsubDonors = onSnapshot(collection(db, "donors"), (snap) => {
      setCounts(prev => ({ ...prev, donors: snap.size }));
    });

    const unsubCampaigns = onSnapshot(collection(db, "campaigns"), (snap) => {
      setCounts(prev => ({ ...prev, campaigns: snap.size }));
    });

    const unsubBanks = onSnapshot(collection(db, "bloodBanks"), (snap) => {
      let units = 0;
      snap.docs.forEach(doc => {
        const stock = doc.data().stock;
        if (stock) {
          Object.values(stock).forEach((val: any) => units += Number(val || 0));
        }
      });
      setCounts(prev => ({ ...prev, bloodBanks: snap.size, availableUnits: units }));
    });

    return () => {
      unsubDonors();
      unsubCampaigns();
      unsubBanks();
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="bg-white/90 backdrop-blur-md border-none shadow-2xl">
        <CardContent className="p-4 text-center">
          <p className="text-3xl font-bold text-red-600">{counts.donors || 1245}</p>
          <p className="text-sm font-medium text-gray-600">Active Donors</p>
        </CardContent>
      </Card>
      <Card className="bg-white/90 backdrop-blur-md border-none shadow-2xl">
        <CardContent className="p-4 text-center">
          <p className="text-3xl font-bold text-red-600">{counts.campaigns || 8}</p>
          <p className="text-sm font-medium text-gray-600">Campaigns</p>
        </CardContent>
      </Card>
      <Card className="bg-white/90 backdrop-blur-md border-none shadow-2xl">
        <CardContent className="p-4 text-center">
          <p className="text-3xl font-bold text-red-600">{counts.availableUnits || 3500}</p>
          <p className="text-sm font-medium text-gray-600">Blood Units</p>
        </CardContent>
      </Card>
      <Card className="bg-white/90 backdrop-blur-md border-none shadow-2xl">
        <CardContent className="p-4 text-center">
          <p className="text-3xl font-bold text-red-600">{counts.bloodBanks || 42}</p>
          <p className="text-sm font-medium text-gray-600">Blood Banks</p>
        </CardContent>
      </Card>
    </div>
  );
}
