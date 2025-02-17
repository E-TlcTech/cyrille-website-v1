"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MoreVertical,
  Pencil,
  Trash2,
  FileText,
  Download,
  Copy,
  Archive,
} from "lucide-react";

export default function ActionMenu({
  onEdit,
  onDelete,
  onGeneratePDF,
  onDuplicate,
  onArchive,
  onDownload,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAction = (action) => {
    console.log("Action triggered", action);
    if (typeof action === "function") {
      try {
        action();
        console.log("Action executed successfully");
      } catch (error) {
        console.error("Action execution failed:", error);
      }
    } else {
      console.warn("Action is not a function:", action);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
          console.log("Menu toggled:", !isOpen);
        }}
        className="p-2 hover:bg-muted/80 rounded-lg transition-colors"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="absolute right-0 mt-1 w-48 bg-card border rounded-lg shadow-lg overflow-hidden z-[100]"
            style={{ position: "fixed", transform: "translate(-50%, 0)" }}
          >
            <div className="py-1">
              {onEdit && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Edit button clicked");
                    handleAction(onEdit);
                  }}
                  className="w-full px-4 py-2 text-sm text-left flex items-center gap-2 hover:bg-muted/80 transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                  Modifier
                </button>
              )}

              {onDuplicate && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Duplicate button clicked");
                    handleAction(onDuplicate);
                  }}
                  className="w-full px-4 py-2 text-sm text-left flex items-center gap-2 hover:bg-muted/80 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Dupliquer
                </button>
              )}

              {onGeneratePDF && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Generate PDF button clicked");
                    handleAction(onGeneratePDF);
                  }}
                  className="w-full px-4 py-2 text-sm text-left flex items-center gap-2 hover:bg-muted/80 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Générer PDF
                </button>
              )}

              {onArchive && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Archive button clicked");
                    handleAction(onArchive);
                  }}
                  className="w-full px-4 py-2 text-sm text-left flex items-center gap-2 hover:bg-muted/80 transition-colors"
                >
                  <Archive className="w-4 h-4" />
                  Archiver
                </button>
              )}

              {onDownload && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Download button clicked");
                    handleAction(onDownload);
                  }}
                  className="w-full px-4 py-2 text-sm text-left flex items-center gap-2 hover:bg-muted/80 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Télécharger
                </button>
              )}

              {onDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Delete button clicked");
                    handleAction(onDelete);
                  }}
                  className="w-full px-4 py-2 text-sm text-left flex items-center gap-2 text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Supprimer
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
