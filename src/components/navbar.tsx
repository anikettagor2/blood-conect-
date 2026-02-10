"use client";

import Link from 'next/link';
import { useUserAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Menu, X, Droplet } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { user, googleSignIn, logOut } = useUserAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100/50 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-rose-500 flex items-center justify-center shadow-red-200 shadow-lg"
          >
            <Droplet className="w-6 h-6 text-white fill-white" />
          </motion.div>
          <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent group-hover:from-red-600 group-hover:to-rose-600 transition-all duration-300">
            BloodConnect
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {[
            { name: 'Campaigns', href: '/campaigns' },
            { name: 'Find Blood', href: '/blood-bank' },
            { name: 'Emergency Request', href: '/emergency' },
            // { name: 'Admin', href: '/admin' }, // Keep admin hidden or subtle
          ].map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-sm font-semibold text-slate-600 hover:text-red-600 transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          <Link href="/admin" className="text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors">
            Admin
          </Link>
          
          <div className="pl-4 border-l border-slate-200">
            {user ? (
              <div className="flex items-center gap-4">
                 <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-slate-800">{user.displayName}</span>
                    <span className="text-xs text-slate-500">Donor</span>
                 </div>
                 {user.photoURL ? (
                   <img src={user.photoURL} alt="User" className="w-9 h-9 rounded-full border-2 border-white shadow-sm" />
                 ) : (
                   <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                     {user.displayName?.charAt(0)}
                   </div>
                 )}
                 <Button onClick={handleSignOut} variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                   Sign Out
                 </Button>
              </div>
            ) : (
              <Button onClick={handleSignIn} className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 shadow-lg shadow-slate-900/20 transition-all hover:-translate-y-0.5">
                Sign In
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-white border-t border-gray-100"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link href="/campaigns" className="text-slate-600 font-medium py-2">Campaigns</Link>
            <Link href="/blood-bank" className="text-slate-600 font-medium py-2">Find Blood</Link>
            <Link href="/emergency" className="text-slate-600 font-medium py-2">Emergency Request</Link>
            <Link href="/admin" className="text-slate-600 font-medium py-2">Admin</Link>
            <div className="pt-4 border-t border-gray-100">
              {user ? (
                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      {user.photoURL && <img src={user.photoURL} className="w-8 h-8 rounded-full" />}
                      <span className="font-semibold">{user.displayName}</span>
                    </div>
                    <Button onClick={handleSignOut} variant="outline" className="w-full justify-start text-red-600">
                      Sign Out
                    </Button>
                 </div>
              ) : (
                <Button onClick={handleSignIn} className="w-full bg-red-600 text-white">
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
