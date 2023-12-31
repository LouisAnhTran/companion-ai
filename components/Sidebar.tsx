"use client";

import { Home, Plus, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

import { cn } from "@/lib/utils";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const routes = [
    {
      href: "/",
      icon: Home,
      pro: false,
      label: "Home",
    },
    {
      href: "/companion/new",
      icon: Plus,
      pro: false,
      label: "Add",
    },
    {
      href: "/settings",
      icon: Settings,
      pro: false,
      label: "Setting",
    },
  ];

  const onNavigate=(url: string)=>{
    router.push(url);
  }

  return (
    <div className="space-y-4 flex flex-col h-full text-primary bg-secondary">
      <div className="p-3 flex-1 flex justify-center">
        <div className="space-y-2">
          {routes.map((route) => (
            <div
              key={route.href}
              onClick={() => onNavigate(route.href)}
              className={cn(
                "text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                pathname === route.href && "bg-primary/10 text-primary"
              )}
            >
                <div className="flex flex-col gap-y-2 items-center flex-1">
                    <route.icon className="h-5 w-5"></route.icon>
                    {route.label}
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
