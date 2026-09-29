import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-svh place-items-center px-6">
      <div className="shell w-full max-w-md rounded-[32px] p-6 text-center text-white">
        <p className="font-mono text-xs uppercase tracking-[0.28em]">betowdex</p>
        <h1 className="mt-4 font-mono text-5xl">404</h1>
        <p className="mt-3 text-sm text-white/85">
          Entrada não encontrada. / Entry not found.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/" className="rounded-full bg-[#ffd15c] px-4 py-2 text-sm font-semibold text-[#2a1408]">
            Português
          </Link>
          <Link href="/en" className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
            English
          </Link>
        </div>
      </div>
    </div>
  );
}
