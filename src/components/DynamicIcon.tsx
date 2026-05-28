import React from "react";
import * as Lucide from "lucide-react";

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function DynamicIcon({ name, className = "", size = 20 }: DynamicIconProps) {
  // Map string to Component matching Lucide icon names
  const IconComponent = (Lucide as any)[name];

  if (!IconComponent) {
    // Elegant fallback icon
    return <Lucide.Sparkles className={className} size={size} />;
  }

  return <IconComponent className={className} size={size} />;
}
