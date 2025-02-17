import AdminLayout from "@/components/admin/shared/AdminLayout";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  return (
    <>
      <AdminLayout>{children}</AdminLayout>
      <Toaster
        position="top-right"
        toastOptions={{
          className: "!bg-background !text-foreground !border !border-border",
          style: {
            background: "hsl(var(--background))",
            color: "hsl(var(--foreground))",
            border: "1px solid hsl(var(--border))",
          },
        }}
      />
    </>
  );
}
