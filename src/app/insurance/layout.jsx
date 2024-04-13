import ProtectedRoute from "@/components/ProtectedRoute";

export default function InsuranceLayout({ children }) {
  return (
    <>
      <ProtectedRoute requiredRole="insurance">
        <div>{children}</div>
      </ProtectedRoute>
    </>
  );
}
