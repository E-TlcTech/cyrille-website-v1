import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 12,
    lineHeight: 1.5,
    color: "#333",
  },
  header: {
    marginBottom: 30,
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  logo: {
    width: 120,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  dateText: {
    fontSize: 12,
    color: "#666",
    textAlign: "right",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 10,
    backgroundColor: "#f9fafb",
    padding: 8,
    borderRadius: 4,
  },
  infoGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 16,
  },
  infoItem: {
    flex: 1,
    minWidth: "45%",
  },
  label: {
    fontSize: 10,
    color: "#666",
    marginBottom: 4,
  },
  value: {
    fontSize: 12,
    color: "#111",
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f9fafb",
    borderBottom: "1px solid #e5e7eb",
    padding: 8,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #e5e7eb",
    padding: 8,
    minHeight: 40,
  },
  tableCell: {
    flex: 1,
    fontSize: 11,
    padding: 4,
  },
  tableCellHeader: {
    flex: 1,
    fontSize: 11,
    fontWeight: "bold",
    color: "#374151",
    padding: 4,
  },
  status: {
    padding: "4 8",
    borderRadius: 4,
    fontSize: 10,
    textAlign: "center",
    maxWidth: 100,
  },
  statusPending: {
    backgroundColor: "#fff7ed",
    color: "#c2410c",
  },
  statusInProgress: {
    backgroundColor: "#eff6ff",
    color: "#1d4ed8",
  },
  statusCompleted: {
    backgroundColor: "#f0fdf4",
    color: "#15803d",
  },
  statusCancelled: {
    backgroundColor: "#fef2f2",
    color: "#b91c1c",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    borderTop: "1px solid #e5e7eb",
    paddingTop: 20,
  },
  footerText: {
    fontSize: 10,
    color: "#666",
    textAlign: "center",
  },
  description: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f9fafb",
    borderRadius: 4,
    fontSize: 11,
    color: "#374151",
    lineHeight: 1.6,
  },
  price: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f8fafc",
    borderRadius: 4,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  priceLabel: {
    fontSize: 11,
    color: "#666",
  },
  priceValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111",
  },
  totalPrice: {
    marginTop: 8,
    paddingTop: 8,
    borderTop: "1px solid #e5e7eb",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111",
  },
  totalValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111",
  },
});

const getStatusStyle = (status) => {
  switch (status) {
    case "pending":
      return styles.statusPending;
    case "in_progress":
      return styles.statusInProgress;
    case "completed":
      return styles.statusCompleted;
    case "cancelled":
      return styles.statusCancelled;
    default:
      return {};
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case "pending":
      return "En attente";
    case "in_progress":
      return "En cours";
    case "completed":
      return "Terminé";
    case "cancelled":
      return "Annulé";
    default:
      return status;
  }
};

export const ProjectPDF = ({ project, client }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.title}>Détails du Projet</Text>
            <Text style={styles.subtitle}>
              Généré le {format(new Date(), "PPP", { locale: fr })}
            </Text>
          </View>
          <Text style={styles.dateText}>Réf: PRJ-{project.id.slice(0, 8)}</Text>
        </View>
      </View>

      {/* Project Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informations Projet</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Nom</Text>
            <Text style={styles.value}>{project.name}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Statut</Text>
            <View style={[styles.status, getStatusStyle(project.status)]}>
              <Text>{getStatusLabel(project.status)}</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Date de début</Text>
            <Text style={styles.value}>
              {format(new Date(project.startDate), "PPP", { locale: fr })}
            </Text>
          </View>
          {project.endDate && (
            <View style={styles.infoItem}>
              <Text style={styles.label}>Date de fin</Text>
              <Text style={styles.value}>
                {format(new Date(project.endDate), "PPP", { locale: fr })}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.description}>
          <Text>{project.description}</Text>
        </View>
        {project.price && (
          <View style={styles.price}>
            <View style={styles.totalPrice}>
              <Text style={styles.totalLabel}>Prix Total</Text>
              <Text style={styles.totalValue}>
                {project.price.toLocaleString()}€
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Client Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informations Client</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Nom</Text>
            <Text style={styles.value}>{client.name}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{client.email}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Téléphone</Text>
            <Text style={styles.value}>{client.phone}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Entreprise</Text>
            <Text style={styles.value}>{client.company}</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © {new Date().getFullYear()} Cyrille Mani - Tous droits réservés
        </Text>
        <Text style={[styles.footerText, { marginTop: 4 }]}>
          Ce document est confidentiel et ne doit pas être partagé sans
          autorisation.
        </Text>
      </View>
    </Page>
  </Document>
);

export const ClientProjectPDF = ({ client, projects }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.title}>Rapport Client</Text>
            <Text style={styles.subtitle}>
              Généré le {format(new Date(), "PPP", { locale: fr })}
            </Text>
          </View>
          <Text style={styles.dateText}>Réf: CLT-{client.id.slice(0, 8)}</Text>
        </View>
      </View>

      {/* Client Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informations Client</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Nom</Text>
            <Text style={styles.value}>{client.name}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{client.email}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Téléphone</Text>
            <Text style={styles.value}>{client.phone}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Entreprise</Text>
            <Text style={styles.value}>{client.company}</Text>
          </View>
        </View>
      </View>

      {/* Projects */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Projets</Text>
        {projects.length > 0 ? (
          <>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableCellHeader, { flex: 2 }]}>
                  Projet
                </Text>
                <Text style={styles.tableCellHeader}>Statut</Text>
                <Text style={styles.tableCellHeader}>Date de début</Text>
                <Text style={styles.tableCellHeader}>Prix</Text>
              </View>
              {projects.map((project, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.tableCell, { flex: 2 }]}>
                    {project.name}
                  </Text>
                  <View
                    style={[styles.tableCell, { justifyContent: "center" }]}
                  >
                    <Text
                      style={[styles.status, getStatusStyle(project.status)]}
                    >
                      {getStatusLabel(project.status)}
                    </Text>
                  </View>
                  <Text style={styles.tableCell}>
                    {format(new Date(project.startDate), "dd/MM/yyyy", {
                      locale: fr,
                    })}
                  </Text>
                  <Text style={styles.tableCell}>
                    {project.price ? `${project.price.toLocaleString()}€` : "-"}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.price}>
              <View style={styles.totalPrice}>
                <Text style={styles.totalLabel}>Total des Projets</Text>
                <Text style={styles.totalValue}>
                  {projects
                    .reduce((sum, project) => sum + (project.price || 0), 0)
                    .toLocaleString()}
                  €
                </Text>
              </View>
            </View>
          </>
        ) : (
          <Text style={styles.value}>Aucun projet associé</Text>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © {new Date().getFullYear()} Cyrille Mani - Tous droits réservés
        </Text>
        <Text style={[styles.footerText, { marginTop: 4 }]}>
          Ce document est confidentiel et ne doit pas être partagé sans
          autorisation.
        </Text>
      </View>
    </Page>
  </Document>
);
