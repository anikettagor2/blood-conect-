
"use client"

import { useUserAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Activity, Droplet, Heart, Search, Calendar, Award } from "lucide-react";

export default function UserDashboard() {
  const { user, userData } = useUserAuth();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8 pt-24">
        
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Welcome back, <span className="text-red-400">{userData?.displayName || user?.displayName?.split(' ')[0] || 'Hero'}</span>!
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl">
              Thank you for being part of our life-saving community. Your commitment makes a real difference.
            </p>
          </div>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {[
            {
              title: "Find Blood",
              icon: Search,
              action: "Search",
              desc: "Locate blood banks nearby",
              href: "/blood-bank",
              color: "bg-blue-50 text-blue-600",
              hover: "group-hover:bg-blue-600 group-hover:text-white"
            },
            {
              title: "Campaigns",
              icon: Heart,
              action: "Donate",
              desc: "Find upcoming drives",
              href: "/campaigns",
              color: "bg-rose-50 text-rose-600",
              hover: "group-hover:bg-rose-600 group-hover:text-white"
            },
            {
              title: "Emergency",
              icon: Activity,
              action: "Request",
              desc: "Urgent blood needs",
              href: "/emergency",
              color: "bg-red-50 text-red-600",
              hover: "group-hover:bg-red-600 group-hover:text-white"
            },
            {
              title: "My Impact",
              icon: Droplet,
              action: `${userData?.donationsCount || 0} Lives`,
              desc: "Estimated lives saved",
              href: "#",
              color: "bg-emerald-50 text-emerald-600",
              hover: "group-hover:bg-emerald-600 group-hover:text-white"
            }
          ].map((card, idx) => (
            <motion.div key={idx} variants={item}>
              <Card 
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-none shadow-md overflow-hidden relative"
                onClick={() => card.href !== '#' && (window.location.href = card.href)}
              >
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 transition-colors duration-300 ${card.color.split(' ')[0].replace('50', '200')}`} />
                
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">{card.title}</CardTitle>
                  <div className={`p-2 rounded-xl transition-colors duration-300 ${card.color} ${card.hover}`}>
                    <card.icon className="h-5 w-5" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800 mb-1">{card.action}</div>
                  <p className="text-xs text-slate-500">{card.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.5 }}
             className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
           >
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Calendar className="text-slate-400" size={20} />
                Recent Activity
              </h2>
              <div className="space-y-6">
                 {/* Mock Activity List */}
                 {[1, 2].map((_, i) => (
                   <div key={i} className="flex items-start gap-4 pb-6 border-b border-slate-50 last:border-0 last:pb-0">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs shrink-0">
                        {i === 0 ? "2d" : "1w"}
                      </div>
                      <div>
                        <p className="text-slate-800 font-medium">
                          {i === 0 ? "You checked blood availability in New York" : "Updated your donor profile"}
                        </p>
                        <p className="text-slate-500 text-sm mt-1">
                          {i === 0 ? "Dashboard Activity" : "Account Settings"}
                        </p>
                      </div>
                   </div>
                 ))}
                 <div className="text-center pt-2">
                    <button className="text-sm text-red-600 font-medium hover:underline">View All History</button>
                 </div>
              </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.6 }}
             className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
           >
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Award className="text-yellow-500" size={20} />
                Donor Badge
              </h2>
              <div className="text-center py-6">
                 <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
                    <Award size={48} className="text-orange-500" />
                 </div>
                 <h3 className="font-bold text-lg text-slate-800">{userData?.role === 'donor' ? 'Bronze Donor' : 'Community Member'}</h3>
                 <p className="text-slate-500 text-sm mt-2 mb-6">Complete 3 more donations to unlock Silver status.</p>
                 
                 <div className="w-full bg-slate-100 rounded-full h-2 mb-2 overflow-hidden">
                    <div className="bg-orange-400 h-2 rounded-full w-1/4"></div>
                 </div>
                 <p className="text-xs text-slate-400">1/5 Donations</p>
              </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
}
