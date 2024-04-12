import ProtectedRoute from "@/components/ProtectedRoute";

export default function ExpertLayout({ children }) {
  return (
    <>
      <ProtectedRoute requiredRole="expert">
        <div>{children}</div>
      </ProtectedRoute>
    </>
  );
}
