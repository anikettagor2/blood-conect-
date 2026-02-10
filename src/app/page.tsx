
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Navbar } from '@/components/navbar';
import Link from 'next/link';
import { LiveStats } from '@/components/live-stats';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Users, Activity, Calendar } from 'lucide-react';

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-red-50 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-rose-50 rounded-full blur-3xl opacity-50 -translate-x-1/3 translate-y-1/4" />

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="space-y-8 z-10"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 font-medium text-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              Urgent Need: O- Blood in New York
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-1.1">
              Donate Blood, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500">
                Save a Life
              </span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-slate-600 max-w-lg leading-relaxed">
              Join our community of heroes. Connect with nearby donation centers, track your impact, and help save lives in your city.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-red-600 hover:bg-red-700 shadow-xl shadow-red-600/20 transition-all hover:scale-105">
                  Become a Donor
                </Button>
              </Link>
              <Link href="/blood-bank">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-2 hover:bg-slate-50 text-slate-700">
                  Find Blood Bank
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={fadeIn} className="pt-8 flex items-center gap-4 text-sm text-slate-500">
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden`}>
                     <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="avatar" />
                  </div>
                ))}
              </div>
              <p>Join 10,000+ donors today</p>
            </motion.div>
          </motion.div>

          {/* Hero Image / Illustration */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
             <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1615461066159-fea0960485d5?q=80&w=1000&auto=format&fit=crop" 
                  alt="Blood Donation" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <p className="font-bold text-lg">Every drop counts</p>
                    <p className="text-sm opacity-80">Be the reason someone smiles today.</p>
                  </div>
                </div>
             </div>
             
             {/* Floating Badge */}
             <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -bottom-8 -left-8 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-4 max-w-xs"
             >
               <div className="bg-green-100 p-3 rounded-full text-green-600">
                 <Activity size={24} />
               </div>
               <div>
                 <p className="font-bold text-slate-900">Live Updates</p>
                 <p className="text-xs text-slate-500">Real-time stock tracking</p>
               </div>
             </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section with LiveStats Component */}
      <section className="py-12 bg-white relative z-10 -mt-20 lg:-mt-32 px-4">
         <div className="container mx-auto">
            <LiveStats />
         </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How BloodConnect Works</h2>
            <p className="text-lg text-slate-600">We've simplified the process to make saving lives easier than ever.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "Register", desc: "Create your profile in under 2 minutes and join our donor community." },
              { icon: Calendar, title: "Find A Drive", desc: "Locate nearby blood donation camps or schedule a visit to a blood bank." },
              { icon: Heart, title: "Save Lives", desc: "Donate blood and track your impact. You are a hero to someone." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center group"
              >
                <div className="w-16 h-16 mx-auto bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                  <item.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features / Why Donate */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
           <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2 relative">
                 <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1000&auto=format&fit=crop" alt="Doctor" className="w-full" />
                 </div>
                 {/* Decorative elements */}
                 <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-50"></div>
                 <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
              </div>
              
              <div className="lg:w-1/2 space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Why Donate Through Us?</h2>
                <div className="space-y-6">
                  {[
                    "Real-time availability tracking reduces wastage.",
                    "Instant emergency alerts to nearby donors.",
                    "Verified blood banks and safe campaings.",
                    "Track your donation history and health checkups."
                  ].map((feat, i) => (
                    <div key={i} className="flex items-start gap-4">
                       <div className="mt-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                         <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                       </div>
                       <p className="text-lg text-slate-700">{feat}</p>
                    </div>
                  ))}
                </div>
                <Link href="/register">
                  <Button className="mt-4 bg-slate-900 text-white hover:bg-slate-800 rounded-full px-8 py-6 text-lg">
                    Get Started <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to make a difference?</h2>
          <p className="text-xl md:text-2xl text-red-100 mb-10 max-w-2xl mx-auto">Your donation is a gift of life. Join thousands of others making an impact today.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
               <Button size="lg" className="bg-white text-red-600 hover:bg-red-50 font-bold text-lg px-8 py-6 rounded-full shadow-lg">
                 Register as Donor
               </Button>
            </Link>
            <Link href="/campaigns">
               <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6 rounded-full">
                 View Campaigns
               </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
               <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                 <Heart className="w-4 h-4 text-white" fill="white" />
               </div>
               <span className="text-xl font-bold text-white">BloodConnect</span>
            </div>
            <p className="text-sm text-slate-400">
              Connecting donors with those in need. Simple, fast, and life-saving.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-red-500 transition">Home</Link></li>
              <li><Link href="/blood-bank" className="hover:text-red-500 transition">Find Blood</Link></li>
              <li><Link href="/campaigns" className="hover:text-red-500 transition">Campaigns</Link></li>
              <li><Link href="/emergency" className="hover:text-red-500 transition">Emergency</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-red-500 transition">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-red-500 transition">FAQs</Link></li>
              <li><Link href="#" className="hover:text-red-500 transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-red-500 transition">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><ArrowRight size={14}/> support@bloodconnect.com</li>
              <li className="flex items-center gap-2"><ArrowRight size={14}/> +1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
           © 2024 BloodConnect. All rights reserved.
        </div>
      </footer>
    </main>
  );
}

