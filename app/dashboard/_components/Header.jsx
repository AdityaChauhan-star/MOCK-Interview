"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";

function Header() {
  const path = usePathname();

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Questions", path: "/dashboard/questions" },
    { name: "Upgrade", path: "/dashboard/upgrade" },
    { name: "How it works?", path: "/dashboard/how-it-works" },
  ];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/dashboard">
              <Image src="/logo.svg" width={140} height={40} alt="AI Mock Interview" className="h-8 w-auto" />
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                href={item.path}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors duration-200 hover:text-blue-600 ${
                  path === item.path
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:border-gray-300"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center">
            <UserButton afterSignOutUrl="/" appearance={{
              elements: {
                userButtonAvatarBox: "h-9 w-9"
              }
            }} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;