"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Link } from "lucide-react";

const projects = [
  {
    title: "E-commerce Platform",
    description:
      "Une plateforme de commerce électronique moderne avec panier et paiement intégré",
    tech: ["Next.js", "Tailwind CSS", "Stripe"],
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1600&auto=format&fit=crop",
    link: "https://example.com",
    github: "https://github.com",
    category: "E-commerce",
  },
  {
    title: "Application de Gestion",
    description:
      "Système de gestion d'entreprise avec tableau de bord en temps réel",
    tech: ["React", "TypeScript", "Firebase"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
    link: "https://example.com",
    github: "https://github.com",
    category: "Application Web",
  },
  {
    title: "Portfolio d'Artiste",
    description: "Site vitrine pour un artiste avec galerie interactive",
    tech: ["Next.js", "Framer Motion", "Sanity.io"],
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1600&auto=format&fit=crop",
    link: "https://example.com",
    github: "https://github.com",
    category: "Portfolio",
  },
];

export default function Projects() {
  return (
    <section id="projets" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-16 space-y-4"
      >
        <span className="text-primary text-sm font-medium tracking-wider uppercase">
          Réalisations
        </span>
        <h2 className="text-4xl font-bold mb-4">Mes Projets</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Une sélection de mes réalisations récentes, démontrant mon expertise
          en développement frontend.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative bg-card rounded-xl overflow-hidden border border-border/50 hover-border-accent"
          >
            {/* Project Image Container */}
            <div className="aspect-video relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent z-10" />
              <motion.img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-full transition-all duration-700"
                whileHover={{ scale: 1.05 }}
              />
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary backdrop-blur-sm">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Project Content */}
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex gap-2"
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-background hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-background hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Link className="w-4 h-4" />
                    </a>
                  </motion.div>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 text-xs rounded-full bg-background text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group/link"
                whileHover={{ x: 4 }}
              >
                Voir le projet
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
