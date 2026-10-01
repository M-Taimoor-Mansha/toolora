import type { ReactNode, SVGProps } from "react";
import { cn } from "@/lib/cn";

/**
 * Central icon registry. All icons are hand-drawn 24x24 stroke icons that
 * inherit `currentColor`, so theme and color are controlled by the parent.
 *
 * Data files reference icons by name (`IconName`), which keeps the registry
 * typed end-to-end.
 */
const icons = {
  // --- interface ---
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20.5 20.5-4-4" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  x: <path d="m6 6 12 12M18 6 6 18" />,
  chevronDown: <path d="m6 9.5 6 6 6-6" />,
  chevronRight: <path d="m9.5 6 6 6-6 6" />,
  arrowRight: <path d="M4 12h15m-6-6 6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M9 7h8v8" />,
  home: (
    <>
      <path d="m4 11 8-7 8 7" />
      <path d="M6 9.5V20h12V9.5" />
      <path d="M10 20v-5.5h4V20" />
    </>
  ),
  layoutGrid: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </>
  ),
  flame: (
    <path d="M12 3.5s5.5 4.2 5.5 9a5.5 5.5 0 0 1-11 0c0-2 1-3.8 2.2-5.2.3 1 1 1.9 2 2.4C10.4 7.4 10.8 5 12 3.5z" />
  ),
  newspaper: (
    <>
      <path d="M4 6.5A1.5 1.5 0 0 1 5.5 5H18v13.5H5.5A1.5 1.5 0 0 1 4 17z" />
      <path d="M18 8.5h1.5A1.5 1.5 0 0 1 21 10v7.5" />
      <path d="M7.5 8.5h7M7.5 12h7M7.5 15.5h4.5" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5 10-11" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01M12 11.5V16" />
    </>
  ),
  alert: (
    <>
      <path d="M12 4.5 2.8 19.5h18.4z" />
      <path d="M12 10.5v4M12 17h.01" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </>
  ),
  bell: (
    <>
      <path d="M6.3 9.5a5.7 5.7 0 0 1 11.4 0c0 4.8 1.8 6 1.8 6H4.5s1.8-1.2 1.8-6" />
      <path d="M10.2 19.5a2 2 0 0 0 3.6 0" />
    </>
  ),
  star: (
    <path d="m12 4 2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8z" />
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2.5 12h2M19.5 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  moon: <path d="M20.5 13.2A8.5 8.5 0 1 1 10.8 3.5a7 7 0 0 0 9.7 9.7z" />,
  monitor: (
    <>
      <rect x="3" y="4.5" width="18" height="12.5" rx="2" />
      <path d="M9 21h6M12 17v4" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5M12 14.5v2" />
    </>
  ),
  zap: <path d="M13 2.5 4.5 13.5H11l-1.5 8L18 10.5h-6.5z" />,

  // --- categories ---
  code: (
    <>
      <path d="m8.5 8-4 4 4 4" />
      <path d="m15.5 8 4 4-4 4" />
      <path d="m13.2 5.5-2.4 13" />
    </>
  ),
  type: (
    <>
      <path d="M5 7.5v-3h14v3" />
      <path d="M12 4.5v15M9 19.5h6" />
    </>
  ),
  image: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="2" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m5.5 18.5 4.5-4.5 2.5 2.5 3.5-3.5 3 3" />
    </>
  ),
  file: (
    <>
      <path d="M14 3.5H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5z" />
      <path d="M14 3.5v5h5" />
    </>
  ),
  calculator: (
    <>
      <rect x="5.5" y="3" width="13" height="18" rx="2" />
      <path d="M9 7.5h6" />
      <path d="M9 12h.01M12 12h.01M15 12h.01M9 15.5h.01M12 15.5h.01M15 15.5h.01" />
    </>
  ),
  swap: (
    <>
      <path d="M4 8.5h13" />
      <path d="m14.5 5.5 3 3-3 3" />
      <path d="M20 15.5H7" />
      <path d="m9.5 12.5-3 3 3 3" />
    </>
  ),
  seo: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20.5 20.5-4-4" />
      <path d="M8 13.5v-2.5M11 13.5v-4M14 13.5v-1.5" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 4.5 13.8 9.2 18.5 11l-4.7 1.8L12 17.5l-1.8-4.7L5.5 11l4.7-1.8z" />
      <path d="m18.8 15.5.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" />
    </>
  ),

  copy: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </>
  ),
  download: (
    <>
      <path d="M12 3.5v11" />
      <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
      <path d="M4 17.5v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1" />
    </>
  ),
  rotateCcw: (
    <>
      <path d="M3.5 4.5v5h5" />
      <path d="M4 9.5a8.5 8.5 0 1 1 2.1 6.2" />
    </>
  ),
  refreshCw: (
    <>
      <path d="M20.5 4.5v5h-5" />
      <path d="M3.5 19.5v-5h5" />
      <path d="M20 9.5A8.5 8.5 0 0 0 6.3 6.3L3.5 9.5" />
      <path d="M4 14.5a8.5 8.5 0 0 0 13.7 3.2l2.8-3.2" />
    </>
  ),

  // --- tools ---
  braces: (
    <>
      <path d="M9 4H7.5A2.5 2.5 0 0 0 5 6.5v3A2.5 2.5 0 0 1 2.5 12 2.5 2.5 0 0 1 5 14.5v3A2.5 2.5 0 0 0 7.5 20H9" />
      <path d="M15 4h1.5A2.5 2.5 0 0 1 19 6.5v3a2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0-2.5 2.5v3a2.5 2.5 0 0 1-2.5 2.5H15" />
    </>
  ),
  shieldCheck: (
    <>
      <path d="M12 3 4.5 6v5.8c0 5 3.2 8.6 7.5 9.7 4.3-1.1 7.5-4.7 7.5-9.7V6z" />
      <path d="m9 12.2 2.1 2.1 4.2-4.4" />
    </>
  ),
  minimize: (
    <>
      <path d="M4 14h6v6" />
      <path d="M20 10h-6V4" />
      <path d="m14 10 6-6" />
      <path d="m4 20 6-6" />
    </>
  ),
  binary: (
    <>
      <rect x="5" y="4" width="4" height="7" rx="1.5" />
      <rect x="15" y="13" width="4" height="7" rx="1.5" />
      <path d="M15 4h2v7" />
      <path d="M14 11h4" />
      <path d="M7 13h2v7" />
      <path d="M6 20h4" />
    </>
  ),
  link: (
    <>
      <path d="M10 13a4.5 4.5 0 0 0 6.4.4l2.5-2.5a4.5 4.5 0 0 0-6.4-6.4L11 6" />
      <path d="M14 11a4.5 4.5 0 0 0-6.4-.4l-2.5 2.5a4.5 4.5 0 0 0 6.4 6.4L13 18" />
    </>
  ),
  fingerprint: (
    <>
      <path d="M6.5 11a5.5 5.5 0 0 1 11 0v2.5" />
      <path d="M9.5 11a2.5 2.5 0 0 1 5 0v5" />
      <path d="M12 11v8" />
      <path d="M4 11a8 8 0 0 1 14.5-4.7" />
      <path d="M6.5 16.5v2" />
    </>
  ),
  fileText: (
    <>
      <path d="M14 3.5H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5z" />
      <path d="M14 3.5v5h5M9 13h6M9 16.5h4" />
    </>
  ),
  hash: (
    <>
      <path d="M4.5 9h15M4.5 15h15" />
      <path d="M10.5 3.5 8.5 20.5M15.5 3.5l-2 17" />
    </>
  ),
  quote: (
    <>
      <path d="M4 17.5c2.5 0 6-1 6-7V6a2 2 0 0 0-2-2H6.5A1.5 1.5 0 0 0 5 5.5V10a1.5 1.5 0 0 0 1.5 1.5H8c0 2.5-1 4.5-4 4.5z" />
      <path d="M14 17.5c2.5 0 6-1 6-7V6a2 2 0 0 0-2-2h-1.5A1.5 1.5 0 0 0 15 5.5V10a1.5 1.5 0 0 0 1.5 1.5H18c0 2.5-1 4.5-4 4.5z" />
    </>
  ),
  pilcrow: (
    <>
      <path d="M13 4v16" />
      <path d="M17 4v16" />
      <path d="M19.5 4H9.5a4.5 4.5 0 0 0 0 9H13" />
    </>
  ),
  eraser: (
    <>
      <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4L12.4 3.7c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" />
      <path d="M22 21H7" />
      <path d="m5 11 9 9" />
    </>
  ),
  alignLeft: (
    <>
      <path d="M4 6h16" />
      <path d="M4 12h10" />
      <path d="M4 18h13" />
    </>
  ),
  arrowDownAZ: (
    <>
      <path d="m3 16 4 4 4-4" />
      <path d="M7 20V4" />
      <path d="M20 8h-5" />
      <path d="M15 10V6.5a2.5 2.5 0 0 1 5 0V10" />
      <path d="m15 13 5 7h-5" />
    </>
  ),
  flipHorizontal: (
    <>
      <path d="m3 7 5 5-5 5V7" />
      <path d="m21 7-5 5 5 5V7" />
      <path d="M12 20v2M12 14v2M12 8v2M12 2v2" />
    </>
  ),
  cake: (
    <>
      <path d="M4 21v-8.5A2.5 2.5 0 0 1 6.5 10h11a2.5 2.5 0 0 1 2.5 2.5V21" />
      <path d="M4 17.5c1.33 1.33 2.67 1.33 4 0 1.33-1.33 2.67-1.33 4 0 1.33 1.33 2.67 1.33 4 0 1.33-1.33 2.67-1.33 4 0" />
      <path d="M8 10V7.5M12 10V6.5M16 10V7.5" />
      <path d="M3.5 21h17" />
    </>
  ),
  compress: (
    <>
      <path d="M4 14h6v6" />
      <path d="M20 10h-6V4" />
      <path d="m14 10 7-7M3 21l7-7" />
    </>
  ),
  qr: (
    <>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.2" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.2" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.2" />
      <path d="M13.5 13.5h3v3h-3z" />
      <path d="M17.5 17.5H20V20h-2.5z" />
      <path d="M20 13.5h.01M13.5 20h.01" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof icons;

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
}

export function Icon({ name, className, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("h-5 w-5", className)}
      {...rest}
    >
      {icons[name]}
    </svg>
  );
}
