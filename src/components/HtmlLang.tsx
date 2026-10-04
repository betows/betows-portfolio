"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function HtmlLang() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang =
      pathname === "/en" || pathname.startsWith("/en/") ? "en" : "pt-BR";
  }, [pathname]);

  return null;
}
