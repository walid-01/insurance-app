import ProtectedRoute from "@/components/ProtectedRoute";

export default function InsuranceLayout({ children }) {
  return (
    <>
      <ProtectedRoute requiredRole="insurance">
        <div>Insurance Nav Bar</div>
        <div>{children}</div>
      </ProtectedRoute>
    </>
  );
}
