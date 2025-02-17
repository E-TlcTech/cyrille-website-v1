"use client";

import { motion } from "framer-motion";
import { Code2, Palette, Rocket, Smartphone } from "lucide-react";

const services = [
  {
    title: "Développement Frontend",
    description:
      "Création d'interfaces web modernes et réactives avec les dernières technologies",
    icon: Code2,
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-500",
    borderColor: "hover:border-violet-500/20",
  },
  {
    title: "Design UI/UX",
    description:
      "Conception d'expériences utilisateur intuitives et esthétiques",
    icon: Palette,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
    borderColor: "hover:border-blue-500/20",
  },
  {
    title: "Optimisation Performance",
    description:
      "Amélioration des performances et de l'expérience utilisateur de votre site",
    icon: Rocket,
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-500",
    borderColor: "hover:border-orange-500/20",
  },
  {
    title: "Responsive Design",
    description: "Adaptation parfaite de votre site sur tous les appareils",
    icon: Smartphone,
    iconBg: "bg-green-500/10",
    iconColor: "text-green-500",
    borderColor: "hover:border-green-500/20",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-12 space-y-4"
      >
        <h2 className="text-3xl font-bold">Mes Services</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base">
          Des solutions sur mesure pour répondre à vos besoins en développement
          web
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div
              className={`group h-full bg-background border border-border/40 rounded-2xl p-6 hover:bg-card/5 transition-all duration-300 ${service.borderColor}`}
            >
              <div className="space-y-4">
                <div
                  className={`w-12 h-12 rounded-2xl ${service.iconBg} ${service.iconColor} flex items-center justify-center`}
                >
                  <service.icon className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground/80 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <motion.a
          href="#contact"
          whileHover={{ y: -2 }}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <span>Discutons de votre projet</span>
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            →
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  );
}
