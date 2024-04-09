import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Auth() {
  return (
    <div className="flex-grow h-full flex flex-col items-center gap-10">
      <ProtectedRoute requiredRole={null}>
        <h1 className="text-3xl font-bold">
          Select Your Profession To Get Started
        </h1>
        <div className="flex w-full h-1/2 justify-center gap-10">
          <Link
            href="/auth/insurance"
            className="border-4 border-cyan-800 rounded-lg w-1/3 flex flex-col items-center justify-center gap-4 transition-colors duration-300 ease-in-out hover:bg-slate-100"
          >
            <div className="w-4/6">
              <img src="/images/car insurance.png" alt="car insurance" />
            </div>
            <h1 className="text-lg font-medium">Continue As Insurance</h1>
          </Link>
          <Link
            href="/auth/expert"
            className="border-4 border-cyan-800 rounded-lg w-1/3 flex flex-col items-center justify-center gap-4 transition-colors duration-300 ease-in-out hover:bg-slate-100"
          >
            <div className="w-4/6">
              <img src="/images/car inspection.png" alt="car inspection" />
            </div>
            <h1 className="text-lg font-medium">Continue As Expert</h1>
          </Link>
        </div>
      </ProtectedRoute>
    </div>
  );
}
