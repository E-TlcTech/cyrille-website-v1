"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAcceptedCookies = localStorage.getItem("cookiesAccepted");
    if (!hasAcceptedCookies) {
      // Show the banner after a short delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookiesDeclined", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="container mx-auto max-w-screen-lg">
            <motion.div
              className="relative bg-card border shadow-lg rounded-2xl p-6 md:p-8"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              {/* Close Button */}
              <button
                onClick={declineCookies}
                className="absolute top-4 right-4 p-2 hover:bg-muted/80 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">Votre vie privée</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      Nous utilisons des cookies pour améliorer votre expérience
                      de navigation et analyser le trafic de notre site. Vous
                      pouvez choisir d&apos;accepter ou de refuser ces cookies.
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={acceptCookies}
                      className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors text-sm font-medium shadow-lg shadow-primary/25 flex items-center justify-center"
                    >
                      Accepter les cookies
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={declineCookies}
                      className="px-6 py-2.5 bg-card border hover:bg-muted/50 rounded-lg transition-colors text-sm font-medium flex items-center justify-center"
                    >
                      Continuer sans accepter
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
