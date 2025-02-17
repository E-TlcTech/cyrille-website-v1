"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, FileText, Trash2, Pencil, X } from "lucide-react";
import DataTable from "@/components/admin/shared/DataTable";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  getClients,
  saveClient,
  updateClient,
  deleteClient,
} from "@/lib/utils/storage";
import { PDFViewer } from "@react-pdf/renderer";
import { ClientProjectPDF } from "@/lib/utils/pdfGenerator";
import toast from "react-hot-toast";
import ActionMenu from "@/components/admin/shared/ActionMenu";

const columns = [
  {
    accessorKey: "name",
    header: "Nom",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Téléphone",
  },
  {
    accessorKey: "company",
    header: "Entreprise",
  },
  {
    accessorKey: "createdAt",
    header: "Date d'ajout",
    cell: ({ row }) =>
      format(new Date(row.original.createdAt), "dd/MM/yyyy", {
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
      />
    ),
  },
];

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);

  useEffect(() => {
    setClients(getClients());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const clientData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
    };

    if (selectedClient) {
      updateClient(selectedClient.id, clientData);
      toast.success("Client mis à jour avec succès");
    } else {
      saveClient(clientData);
      toast.success("Client ajouté avec succès");
    }

    setClients(getClients());
    setIsModalOpen(false);
    setSelectedClient(null);
    e.target.reset();
  };

  const handleDelete = (client) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce client ?")) {
      deleteClient(client.id);
      setClients(getClients());
      toast.success("Client supprimé avec succès");
    }
  };

  const handleEdit = (client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const handleGeneratePDF = (client) => {
    setSelectedClient(client);
    setIsPDFModalOpen(true);
  };

  const handleDuplicate = (client) => {
    const { id, createdAt, updatedAt, ...clientData } = client;
    const newClient = saveClient(clientData);
    setClients(getClients());
    toast.success("Client dupliqué avec succès");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Clients</h1>
          <p className="text-muted-foreground">
            Gérez vos clients et leurs informations
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedClient(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Ajouter un client
        </button>
      </div>

      <DataTable
        data={clients}
        columns={columns}
        searchField="name"
        meta={{
          onEdit: handleEdit,
          onDelete: handleDelete,
          onGeneratePDF: handleGeneratePDF,
          onDuplicate: handleDuplicate,
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
                  {selectedClient ? "Modifier le client" : "Ajouter un client"}
                </h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedClient(null);
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
                    name="name"
                    defaultValue={selectedClient?.name}
                    required
                    className="w-full px-4 py-2 text-sm rounded-lg border bg-background focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={selectedClient?.email}
                    required
                    className="w-full px-4 py-2 text-sm rounded-lg border bg-background focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    defaultValue={selectedClient?.phone}
                    required
                    className="w-full px-4 py-2 text-sm rounded-lg border bg-background focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm">
                    Entreprise
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    defaultValue={selectedClient?.company}
                    className="w-full px-4 py-2 text-sm rounded-lg border bg-background focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setSelectedClient(null);
                    }}
                    className="px-4 py-2 border rounded-lg hover:bg-muted transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    {selectedClient ? "Modifier" : "Ajouter"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}

      {/* PDF Modal */}
      {isPDFModalOpen && selectedClient && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
          <div className="fixed inset-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card border rounded-lg shadow-lg h-full flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold">
                  Rapport - {selectedClient.name}
                </h2>
                <button
                  onClick={() => {
                    setIsPDFModalOpen(false);
                    setSelectedClient(null);
                  }}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 p-4">
                <PDFViewer className="w-full h-full rounded-lg">
                  <ClientProjectPDF
                    client={selectedClient}
                    projects={[]} // We'll add projects later
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
