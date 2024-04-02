import Link from "next/link";

export default function auth() {
  return (
    <>
      <button>
        <Link href="/auth/insurance">Assurance</Link>
      </button>
      <button>
        <Link href="/auth/expert">Expert</Link>
      </button>
    </>
  );
}
