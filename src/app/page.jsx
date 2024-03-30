"use client";

import Link from "next/link";
// import useGuestOnly from "@/hooks/useGuestOnly";

export default function Home() {
  // useGuestOnly();
  return (
    <div>
      <button>
        <Link href="/auth/insurance">Assurance</Link>
      </button>
      <button>
        <Link href="/auth/expert">Expert</Link>
      </button>
    </div>
  );
}
