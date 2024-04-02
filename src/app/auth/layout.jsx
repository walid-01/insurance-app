import ProtectedRoute from "@/components/ProtectedRoute";

export default function auth({ children }) {
  return (
    <>
      <ProtectedRoute requiredRole={null}>
        <h1>Auth</h1>
        <div>{children}</div>
      </ProtectedRoute>
    </>
  );
}
