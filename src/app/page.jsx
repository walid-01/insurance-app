import Link from "next/link";

export default function Home() {
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
