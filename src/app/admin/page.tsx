
"use client"

import { useEffect, useState } from "react";
import { useUserAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { db } from "@/lib/firebase";
import { collection, doc, updateDoc, setDoc, getDocs, onSnapshot, query, where, serverTimestamp } from "firebase/firestore";
import { BloodBank, Campaign } from "@/types";
import { Loader2, Plus, RefreshCw, Trash2 } from "lucide-react";

export default function AdminDashboard() {
  const { user, userData } = useUserAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Data states
  const [donors, setDonors] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [bloodBanks, setBloodBanks] = useState<BloodBank[]>([]);
  
  // Form states
  const [newBankName, setNewBankName] = useState("");
  const [newBankCity, setNewBankCity] = useState("");

  useEffect(() => {
    if (userData?.role === 'admin') {
      setIsAdmin(true);
      fetchData();
    } else {
      setIsAdmin(false);
    }
    setLoading(false);
  }, [userData]);

  const fetchData = () => {
    // Realtime listeners for admin dashboard
    const unsubDonors = onSnapshot(collection(db, "donors"), (snap) => {
      setDonors(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const unsubCampaigns = onSnapshot(collection(db, "campaigns"), (snap) => {
      setCampaigns(snap.docs.map(d => ({ id: d.id, ...d.data() } as Campaign)));
    });

    const unsubBanks = onSnapshot(collection(db, "bloodBanks"), (snap) => {
      setBloodBanks(snap.docs.map(d => ({ id: d.id, ...d.data() } as BloodBank)));
    });

    return () => {
      unsubDonors();
      unsubCampaigns();
      unsubBanks();
    };
  };

  const handleCreateBank = async () => {
    if (!newBankName || !newBankCity) return;
    try {
      await setDoc(doc(collection(db, "bloodBanks")), {
        name: newBankName,
        city: newBankCity,
        phone: "555-0123", // Dummy for now
        address: "123 Medical Way", // Dummy
        stock: { 'A+': 0, 'A-': 0, 'B+': 0, 'B-': 0, 'AB+': 0, 'AB-': 0, 'O+': 0, 'O-': 0 },
        lastUpdated: serverTimestamp(),
      });
      setNewBankName("");
      setNewBankCity("");
      toast({ title: "Blood Bank Created", description: "New bank added successfully." });
    } catch (error) {
      console.error(error);
      toast({ title: "Error", variant: "destructive", description: "Failed to create blood bank." });
    }
  };

  const updateStock = async (bankId: string, bloodGroup: string, change: number) => {
    const bank = bloodBanks.find(b => b.id === bankId);
    if (!bank) return;

    const currentStock = bank.stock[bloodGroup as keyof typeof bank.stock] || 0;
    const newStock = Math.max(0, currentStock + change);

    try {
      await updateDoc(doc(db, "bloodBanks", bankId), {
        [`stock.${bloodGroup}`]: newStock,
        lastUpdated: serverTimestamp(),
      });
    } catch (error) {
      console.error(error);
      toast({ title: "Error", variant: "destructive", description: "Failed to update stock." });
    }
  };

  const becomeAdminForDemo = async () => {
    if (!user) return;
    await setDoc(doc(db, "users", user.uid), { role: 'admin' }, { merge: true });
    window.location.reload(); // Quick reload to refresh context
  };

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Card className="w-[400px]">
            <CardHeader><CardTitle>Access Denied</CardTitle><CardDescription>Please sign in to access admin panel.</CardDescription></CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Admin Access Required</CardTitle>
              <CardDescription>You do not have permission to view this page.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={becomeAdminForDemo} className="w-full bg-slate-800">
                (Demo Only) Switch Role to Admin
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="text-sm text-gray-500">Logged in as {user.displayName} (Admin)</div>
        </div>

        <Tabs defaultValue="blood-banks" className="space-y-4">
          <TabsList>
            <TabsTrigger value="blood-banks">Blood Banks & Stock</TabsTrigger>
            <TabsTrigger value="donors">Registered Donors</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          </TabsList>

          <TabsContent value="blood-banks" className="space-y-4">
             <Card>
              <CardHeader>
                <CardTitle>Manage Blood Banks</CardTitle>
                <CardDescription>Create new banks and update real-time stock levels.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <Input placeholder="Bank Name" value={newBankName} onChange={(e) => setNewBankName(e.target.value)} />
                  <Input placeholder="City" value={newBankCity} onChange={(e) => setNewBankCity(e.target.value)} />
                  <Button onClick={handleCreateBank}><Plus className="mr-2 h-4 w-4" /> Add Bank</Button>
                </div>

                <div className="grid gap-6">
                  {bloodBanks.map((bank) => (
                    <Card key={bank.id} className="border-l-4 border-l-red-500">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <CardTitle className="text-lg">{bank.name}</CardTitle>
                           <span className="text-sm text-gray-500">{bank.city}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                            <div key={bg} className="flex flex-col items-center bg-gray-100 p-2 rounded-md">
                              <span className="font-bold text-sm mb-2">{bg}</span>
                              <div className="flex items-center space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  className="h-6 w-6" 
                                  onClick={() => updateStock(bank.id, bg, -1)}
                                >-</Button>
                                <span className="font-mono">{bank.stock?.[bg as keyof typeof bank.stock] || 0}</span>
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  className="h-6 w-6" 
                                  onClick={() => updateStock(bank.id, bg, 1)}
                                >+</Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {bloodBanks.length === 0 && <p className="text-center text-gray-500 py-8">No blood banks found. Add one above.</p>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donors">
            <Card>
              <CardHeader><CardTitle>Registered Donors</CardTitle></CardHeader>
              <CardContent>
                <div className="rounded-md border">
                   <table className="w-full text-sm">
                    <thead className="bg-gray-100 border-b">
                      <tr>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">City</th>
                        <th className="p-3 text-left">Blood Group</th>
                        <th className="p-3 text-left">Phone</th>
                        <th className="p-3 text-left">Eligibility</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donors.map((donor) => (
                        <tr key={donor.id} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">{donor.fullName}</td>
                          <td className="p-3">{donor.city}</td>
                          <td className="p-3"><span className="px-2 py-1 rounded-full bg-red-100 text-red-800 font-bold text-xs">{donor.bloodGroup}</span></td>
                          <td className="p-3">{donor.phone}</td>
                          <td className="p-3">{donor.isEligible ? "Yes" : "No"}</td>
                        </tr>
                      ))}
                      {donors.length === 0 && <tr><td colSpan={5} className="p-6 text-center">No donors registered yet.</td></tr>}
                    </tbody>
                   </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns">
             <Card>
              <CardHeader><CardTitle>Manage Campaigns</CardTitle></CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  {/* Reuse Campaign List similar to campaigns page or simplified table */}
                   <table className="w-full text-sm">
                    <thead className="bg-gray-100 border-b">
                      <tr>
                        <th className="p-3 text-left">Campaign Name</th>
                        <th className="p-3 text-left">Organizer</th>
                        <th className="p-3 text-left">Date</th>
                        <th className="p-3 text-left">City</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaigns.map((camp) => (
                        <tr key={camp.id} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">{camp.name}</td>
                          <td className="p-3">{camp.organizer}</td>
                          <td className="p-3">{camp.date ? camp.date.toDate().toLocaleDateString() : 'N/A'}</td>
                          <td className="p-3">{camp.city}</td>
                        </tr>
                      ))}
                      {campaigns.length === 0 && <tr><td colSpan={4} className="p-6 text-center">No campaigns found.</td></tr>}
                    </tbody>
                   </table>
                </div>
                <div className="mt-4">
                  <Button variant="outline" onClick={() => window.location.href='/campaigns/register'}>+ Create New Campaign</Button>
                </div>
              </CardContent>
             </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
