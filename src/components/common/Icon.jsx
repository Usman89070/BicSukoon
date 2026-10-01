const paths = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  chevron: <path d="M6 9l6 6 6-6" />,
  play: <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" stroke="none" />,
  pause: <path d="M8 5h3v14H8zM13 5h3v14h-3z" fill="currentColor" stroke="none" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  expand: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
  volume: <path d="M4 10v4h4l5 4V6L8 10zM16 9a4 4 0 010 6" />,
  mute: <path d="M4 10v4h4l5 4V6L8 10zM17 9l4 6M21 9l-4 6" />,
  pin: <><path d="M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  calendar: <><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  mail: <><rect x="3" y="5.5" width="18" height="13" rx="2" /><path d="M3.5 7l8.5 6 8.5-6" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z" />,
  heart: <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0112 7a4.3 4.3 0 017.5 3c0 5.4-7.5 10-7.5 10z" />,
  doc: <><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5M10 13h6M10 17h6" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  star: <path d="M12 3l2.6 6.3L21 12l-6.4 2.7L12 21l-2.6-6.3L3 12l6.4-2.7z" />,
  layers: <path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5" />,
  // Social
  facebook: <path d="M14 8.5V7c0-.8.5-1 1-1h2V3h-3c-2.8 0-3.5 2-3.5 3.6v1.9H8V12h2.5v9H14v-9h2.6l.4-3.5z" fill="currentColor" stroke="none" />,
  instagram: <><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" /></>,
  youtube: <><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10 9v6l5-3z" fill="currentColor" stroke="none" /></>,
  linkedin: <><path d="M6.5 10v8M6.5 6.5v.01M10.5 18v-8M10.5 13.5c0-2 1.3-3.5 3.2-3.5S17 11.3 17 13.5V18" /></>,
  x: <path d="M4 4l16 16M20 4L4 20" />,
  whatsapp: <><path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z" /><path d="M9 9.5c.5 2.5 2.5 4.5 5 5l1-1.5-2-1-1 1c-1-.5-1.5-1-2-2l1-1-1-2z" fill="currentColor" stroke="none" /></>,
}

export default function Icon({ name, size = 20, className, title }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title && <title>{title}</title>}
      {paths[name]}
    </svg>
  )
}
