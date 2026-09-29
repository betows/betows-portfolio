export function Mark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="36" height="36" rx="12" fill="#4D8DFF" />
      <circle cx="14" cy="16" r="4" fill="#E7F08C" />
      <rect x="20" y="13" width="12" height="6" rx="3" fill="#FFFCF6" />
      <path
        d="M11 26.5C13.2 23.8 17 22.5 20.4 22.8C24.2 23.1 27.4 25.2 29 28"
        stroke="#FFFCF6"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
