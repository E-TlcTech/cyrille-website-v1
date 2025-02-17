"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, FileText, Trash2, Pencil, X } from "lucide-react";
import DataTable from "@/components/admin/shared/DataTable";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  getProjects,
  saveProject,
  updateProject,
  deleteProject,
  getClients,
} from "@/lib/utils/storage";
import { PDFViewer } from "@react-pdf/renderer";
import { ProjectPDF } from "@/lib/utils/pdfGenerator";
import toast from "react-hot-toast";
import ActionMenu from "@/components/admin/shared/ActionMenu";

registerLocale("fr", fr);

const projectStatus = [
  { value: "pending", label: "En attente" },
  { value: "in_progress", label: "En cours" },
  { value: "completed", label: "Terminé" },
  { value: "cancelled", label: "Annulé" },
];

const columns = [
  {
    accessorKey: "name",
    header: "Nom",
  },
  {
    accessorKey: "clientId",
    header: "Client",
    cell: ({ row, table }) => {
      const client = table.options.meta?.clients.find(
        (c) => c.id === row.original.clientId
      );
      return client?.name || "N/A";
    },
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const status = projectStatus.find((s) => s.value === row.original.status);
      return (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            row.original.status === "completed"
              ? "bg-green-500/10 text-green-500"
              : row.original.status === "in_progress"
              ? "bg-blue-500/10 text-blue-500"
              : row.original.status === "cancelled"
              ? "bg-red-500/10 text-red-500"
              : "bg-yellow-500/10 text-yellow-500"
          }`}
        >
          {status?.label}
        </span>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Prix",
    cell: ({ row }) =>
      row.original.price
        ? `${row.original.price.toLocaleString()}€`
        : "Non défini",
  },
  {
    accessorKey: "startDate",
    header: "Date de début",
    cell: ({ row }) =>
      format(new Date(row.original.startDate), "dd/MM/yyyy", {
        locale: fr,
      }),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => (
      <ActionMenu
        onEdit={() => table.options.meta?.onEdit(row.original)}
        onDelete={() => table.options.meta?.onDelete(row.original)}
        onGeneratePDF={() => table.options.meta?.onGeneratePDF(row.original)}
        onDuplicate={() => table.options.meta?.onDuplicate(row.original)}
        onArchive={() => table.options.meta?.onArchive(row.original)}
      />
    ),
  },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    clientId: "",
    status: "pending",
    price: "",
    startDate: new Date(),
    endDate: null,
  });

  useEffect(() => {
    setProjects(getProjects());
    setClients(getClients());
  }, []);

  useEffect(() => {
    if (selectedProject) {
      setFormData({
        name: selectedProject.name,
        description: selectedProject.description,
        clientId: selectedProject.clientId,
        status: selectedProject.status,
        price: selectedProject.price,
        startDate: new Date(selectedProject.startDate),
        endDate: selectedProject.endDate
          ? new Date(selectedProject.endDate)
          : null,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        clientId: "",
        status: "pending",
        price: "",
        startDate: new Date(),
        endDate: null,
      });
    }
  }, [selectedProject]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectData = {
      ...formData,
      price: formData.price ? parseFloat(formData.price) : null,
    };

    if (selectedProject) {
      updateProject(selectedProject.id, projectData);
      toast.success("Projet mis à jour avec succès");
    } else {
      saveProject(projectData);
      toast.success("Projet ajouté avec succès");
    }

    setProjects(getProjects());
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleDelete = (project) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      deleteProject(project.id);
      setProjects(getProjects());
      toast.success("Projet supprimé avec succès");
    }
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleGeneratePDF = (project) => {
    setSelectedProject(project);
    setIsPDFModalOpen(true);
  };

  const handleDuplicate = (project) => {
    const { id, createdAt, updatedAt, ...projectData } = project;
    const newProject = saveProject(projectData);
    setProjects(getProjects());
    toast.success("Projet dupliqué avec succès");
  };

  const handleArchive = (project) => {
    const updatedProject = {
      ...project,
      status: "cancelled",
      endDate: new Date().toISOString(),
    };
    updateProject(project.id, updatedProject);
    setProjects(getProjects());
    toast.success("Projet archivé avec succès");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projets</h1>
          <p className="text-muted-foreground">
            Gérez vos projets et leurs informations
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedProject(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Ajouter un projet
        </button>
      </div>

      <DataTable
        data={projects}
        columns={columns}
        searchField="name"
        meta={{
          clients,
          onEdit: handleEdit,
          onDelete: handleDelete,
          onGeneratePDF: handleGeneratePDF,
          onDuplicate: handleDuplicate,
          onArchive: handleArchive,
        }}
      />

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  {selectedProject ? "Modifier le projet" : "Ajouter un projet"}
                </h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedProject(null);
                  }}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 text-sm rounded-lg border bg-background focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                    rows={4}
                    className="w-full px-4 py-2 text-sm rounded-lg border bg-background focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="clientId" className="text-sm">
                    Client
                  </label>
                  <select
                    id="clientId"
                    value={formData.clientId}
                    onChange={(e) =>
                      setFormData({ ...formData, clientId: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 text-sm rounded-lg border bg-background focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors"
                  >
                    <option value="">Sélectionner un client</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="status" className="text-sm">
                    Statut
                  </label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 text-sm rounded-lg border bg-background focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors"
                  >
                    {projectStatus.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="price" className="text-sm">
                    Prix (€)
                  </label>
                  <input
                    type="number"
                    id="price"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 text-sm rounded-lg border bg-background focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="startDate" className="text-sm">
                      Date de début
                    </label>
                    <DatePicker
                      id="startDate"
                      selected={formData.startDate}
                      onChange={(date) =>
                        setFormData({ ...formData, startDate: date })
                      }
                      locale="fr"
                      dateFormat="dd/MM/yyyy"
                      className="w-full px-4 py-2 text-sm rounded-lg border bg-background focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="endDate" className="text-sm">
                      Date de fin
                    </label>
                    <DatePicker
                      id="endDate"
                      selected={formData.endDate}
                      onChange={(date) =>
                        setFormData({ ...formData, endDate: date })
                      }
                      locale="fr"
                      dateFormat="dd/MM/yyyy"
                      isClearable
                      placeholderText="Non définie"
                      className="w-full px-4 py-2 text-sm rounded-lg border bg-background focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setSelectedProject(null);
                    }}
                    className="px-4 py-2 border rounded-lg hover:bg-muted transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    {selectedProject ? "Modifier" : "Ajouter"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}

      {/* PDF Modal */}
      {isPDFModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
          <div className="fixed inset-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card border rounded-lg shadow-lg h-full flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold">
                  Rapport - {selectedProject.name}
                </h2>
                <button
                  onClick={() => {
                    setIsPDFModalOpen(false);
                    setSelectedProject(null);
                  }}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 p-4">
                <PDFViewer className="w-full h-full rounded-lg">
                  <ProjectPDF
                    project={selectedProject}
                    client={clients.find(
                      (c) => c.id === selectedProject.clientId
                    )}
                  />
                </PDFViewer>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
