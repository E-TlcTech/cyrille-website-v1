"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
import { useState } from "react";

const services = [
  { id: "web", label: "Web Design" },
  { id: "mobile", label: "Application Mobile" },
  { id: "collaboration", label: "Collaboration" },
  { id: "other", label: "Autres" },
];

const contactInfo = [
  {
    title: "Vous pouvez m'envoyer un email",
    value: "contact@cyrillemani.fr",
    href: "mailto:contact@cyrillemani.fr",
    icon: Mail,
  },
  {
    title: "Appelez-moi au",
    value: "+33 6 XX XX XX XX",
    href: "tel:+33600000000",
    icon: Phone,
  },
  {
    title: "Localisation",
    value: "Paris, France",
    href: "https://maps.google.com/?q=Paris,France",
    icon: MapPin,
  },
];

export default function Contact() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    services: [],
  });

  const handleServiceToggle = (serviceId) => {
    setFormState((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((id) => id !== serviceId)
        : [...prev.services, serviceId],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
  };

  return (
    <section id="contact" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-12 space-y-3"
      >
        <h2 className="text-3xl font-bold">Me Contacter</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base">
          Discutons de votre projet et voyons comment je peux vous aider
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {contactInfo.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              target={item.icon === MapPin ? "_blank" : undefined}
              rel={item.icon === MapPin ? "noopener noreferrer" : undefined}
              className="block"
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="bg-background border border-border/40 rounded-2xl p-6 group hover-border-accent">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-muted-foreground/80 text-sm">
                      {item.title}
                    </p>
                    <p className="text-base font-medium group-hover:text-primary transition-colors">
                      {item.value}
                    </p>
                  </div>
                  <div className="h-8 w-8 rounded-xl border border-border/40 flex items-center justify-center group-hover:border-primary/20 group-hover:bg-primary/5 transition-all duration-300">
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6 bg-background border border-border/40 p-6 rounded-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm">
                  Prénom
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={formState.firstName}
                  onChange={(e) =>
                    setFormState({ ...formState, firstName: e.target.value })
                  }
                  className="w-full px-4 py-2 text-sm rounded-lg border bg-background/50 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors"
                  placeholder="Votre prénom"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm">
                  Nom
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={formState.lastName}
                  onChange={(e) =>
                    setFormState({ ...formState, lastName: e.target.value })
                  }
                  className="w-full px-4 py-2 text-sm rounded-lg border bg-background/50 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors"
                  placeholder="Votre nom"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  className="w-full px-4 py-2 text-sm rounded-lg border bg-background/50 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors"
                  placeholder="votre@email.com"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formState.phone}
                  onChange={(e) =>
                    setFormState({ ...formState, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 text-sm rounded-lg border bg-background/50 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors"
                  placeholder="Votre numéro"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm">Pour quel service ?</label>
              <div className="grid grid-cols-2 gap-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleServiceToggle(service.id)}
                    className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                      formState.services.includes(service.id)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background/50 border-border hover:border-primary/50"
                    }`}
                  >
                    {service.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
                className="w-full px-4 py-2 text-sm rounded-lg border bg-background/50 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors resize-none"
                placeholder="Votre message..."
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors text-sm flex items-center justify-center gap-2 group"
              type="submit"
            >
              <span>Envoyer</span>
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
