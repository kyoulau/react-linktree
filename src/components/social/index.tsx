import type { ReactNode } from "react";

interface SocialProps {
  url: string;
  children: ReactNode;
}

function Social({ url, children }: SocialProps) {

  return (
    <a
      rel="noopener noreferrer"
      target="_blank"
      href={url}
      className="text-gray-50 hover:text-gray-100 transition-colors duration-300"
    >
      {children}
    </a>
  )
}

export default Social
