import Link from "next/link";
import { Mark } from "@/components/Mark";

export default function NotFound() {
  return (
    <div className="grid min-h-svh place-items-center px-6">
      <div className="max-w-md text-center">
        <div className="flex justify-center">
          <Mark />
        </div>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight">404</h1>
        <p className="mt-3 text-muted">
          Essa página não existe. / This page does not exist.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/" className="rounded-full bg-lime px-4 py-2 text-sm font-semibold">
            Português
          </Link>
          <Link
            href="/en"
            className="rounded-full border border-line bg-cream px-4 py-2 text-sm font-semibold"
          >
            English
          </Link>
        </div>
      </div>
    </div>
  );
}
