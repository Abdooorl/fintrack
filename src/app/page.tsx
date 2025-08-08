import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Link href="/dashboard"> Go to Dashboard </Link>
    </div>
  );
}
