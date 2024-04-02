import ProtectedRoute from "@/components/ProtectedRoute";

export default function ExpertLayout({ children }) {
  return (
    <>
      <ProtectedRoute requiredRole="expert">
        <div>Expert Nav Bar</div>
        <div>{children}</div>
      </ProtectedRoute>
    </>
  );
}
