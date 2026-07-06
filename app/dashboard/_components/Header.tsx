"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { Wifi, Clock, Menu } from "lucide-react";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { user } = useUser();
  const [isOnline, setIsOnline] = useState(false);
  const [currentTime, setCurrentTime] = useState<string | null>(null); 
  const path = usePathname();

  useEffect(() => {
    // Simulating online status check
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    };

    updateTime(); // Initialize time immediately after mounting
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Breadcrumbs logic
  const breadcrumbs = path.split("/").filter(Boolean);

  return (
    <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between gap-3 border-b bg-white px-4 py-3 shadow-sm sm:px-6">
      <button
        type="button"
        aria-label="Open navigation"
        onClick={onMenuClick}
        className="rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="min-w-0 flex-1 truncate text-sm text-gray-600">
        {breadcrumbs.map((crumb, index) => (
          <span key={index} className="capitalize">
            {index > 0 && <span className="mx-2">/</span>}
            <Link href={`/${breadcrumbs.slice(0, index + 1).join("/")}`} className="hover:underline">
              {crumb.replace("-", " ")}
            </Link>
          </span>
        ))}
      </nav>

      {/* Live Status Indicator and Time */}
      <div className="hidden items-center gap-4 lg:flex">
        <div className="flex items-center gap-2 border-l pl-4">
        <Wifi className="w-4 h-4 text-gray-600" />
          <span className={`w-3 h-3 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-400"}`}></span>
          <span className="text-sm text-gray-600">{isOnline ? "Online" : "Offline"}</span>
        </div>

        {/* Date & Time Display (Only shows if client-side) */}
        
        {currentTime && (
          <div className="text-sm font-semibold text-gray-700 border-l pl-4 flex gap-2 items-center justify-center">
            <Clock className="w-4 h-4 text-gray-600" />
            {currentTime}
          </div>
        )}

        {/* User Greeting */}
        {user && <span className="text-gray-700 font-semibold border-l pl-4">Welcome, {user.firstName}!</span>}
      </div>

      {/* User Button */}
      <div className="shrink-0 border-l pl-3 sm:scale-110">
        <UserButton />
      </div>
    </header>
  );
};

export default Header;
