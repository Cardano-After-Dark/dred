function LogomarkPaths() {
  return (
    <g fill="none" stroke="#38BDF8" strokeLinejoin="round" strokeWidth={3}>
      <path d="M10.308 5L18 17.5 10.308 30 2.615 17.5 10.308 5z" />
      <path d="M18 17.5L10.308 5h15.144l7.933 12.5M18 17.5h15.385L25.452 30H10.308L18 17.5z" />
    </g>
  )
}

export function Logomark(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 36 36" fill="none" {...props}>
      <LogomarkPaths />
    </svg>
  )
}

export function Logo(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 227 36" fill="none" {...props}>
      <LogomarkPaths />
      <text x="38.8" y="20" fill="#ffffff" fontWeight="bold" fontSize="x-large">
        Dred
      </text>
      <text x="45" y="33" fill="#ffffff" fontWeight="bold" fontSize="x-small">
        powered by Cardano
      </text>
    </svg>
  )
}
