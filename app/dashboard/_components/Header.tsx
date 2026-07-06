"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { Wifi, Menu } from "lucide-react";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { user } = useUser();
  const [isOnline, setIsOnline] = useState(false);
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

  // Breadcrumbs logic
  const breadcrumbs = path.split("/").filter(Boolean);

  return (
    <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between gap-3 border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
      <button
        type="button"
        aria-label="Open navigation"
        onClick={onMenuClick}
        className="rounded-xl border border-slate-200 p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="min-w-0 flex-1 truncate text-sm text-slate-500">
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
      <div className="hidden items-center gap-4 md:flex">
        <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
          <Wifi className="h-3.5 w-3.5 text-slate-500" />
          <span className={`h-2 w-2 rounded-full ${isOnline ? "bg-emerald-500" : "bg-slate-400"}`}></span>
          <span className="text-xs font-medium text-slate-600">{isOnline ? "Online" : "Offline"}</span>
        </div>
        {user && <span className="hidden text-sm font-medium text-slate-600 xl:block">Hi, {user.firstName || "Creator"}</span>}
      </div>

      {/* User Button */}
      <div className="shrink-0 border-l border-slate-200 pl-3 sm:scale-110">
        <UserButton />
      </div>
    </header>
  );
};

export default Header;
