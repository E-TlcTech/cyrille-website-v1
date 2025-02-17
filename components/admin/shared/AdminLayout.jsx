"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  FolderKanban,
  Menu,
  X,
  LogOut,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    name: "Clients",
    href: "/admin/clients",
    icon: Users,
  },
  {
    name: "Projets",
    href: "/admin/projects",
    icon: FolderKanban,
  },
];

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 h-16 bg-background border-b border-border/40 flex items-center px-4 z-50">
          <button
            onClick={toggleSidebar}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-primary/10 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="ml-4 text-lg font-semibold">Administration</h1>
        </div>
      )}

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isMobile ? (isSidebarOpen ? 0 : "-100%") : 0,
        }}
        className={`fixed top-0 left-0 h-full border-r border-border/40 bg-card z-50 ${
          isMobile ? "w-[280px] pt-16" : isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header - Only show on desktop */}
          {!isMobile && (
            <div className="h-16 flex items-center justify-between px-4 border-b border-border/40">
              <AnimatePresence mode="wait">
                {isSidebarOpen && (
                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-lg font-semibold"
                  >
                    Administration
                  </motion.h1>
                )}
              </AnimatePresence>
              <button
                onClick={toggleSidebar}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-primary/10 transition-colors"
              >
                {isSidebarOpen ? (
                  <ChevronRight className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 py-6 px-3">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-primary/10"
                      }`}
                      onClick={() => isMobile && setIsSidebarOpen(false)}
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      <AnimatePresence mode="wait">
                        {(isSidebarOpen || isMobile) && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="truncate"
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-3 border-t border-border/40">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
              onClick={() => isMobile && setIsSidebarOpen(false)}
            >
              <LogOut className="w-5 h-5 shrink-0" />
              <AnimatePresence mode="wait">
                {(isSidebarOpen || isMobile) && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="truncate"
                  >
                    Quitter
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          isMobile ? "pt-20 px-4" : isSidebarOpen ? "ml-64 px-6" : "ml-20 px-6"
        }`}
      >
        <div className="container mx-auto py-8 max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
