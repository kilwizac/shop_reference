import { ReactNode } from "react";

interface SectionCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  partNumber?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function SectionCard({
  children,
  className = "",
  title,
  subtitle,
  icon,
  partNumber,
  hover = false,
  onClick,
}: SectionCardProps) {
  const baseClasses = "relative bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-4 sm:p-4 md:p-6 flex flex-col";
  const hoverClasses = hover ? "cursor-pointer hover:border-black dark:hover:border-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group" : "";
  const clickableClasses = onClick ? "cursor-pointer" : "";

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
    >
      {partNumber && (
        <div className="font-mono text-xs text-gray-400 dark:text-gray-600 mb-3">
          {partNumber}
        </div>
      )}
      
      {icon && (
        <div className="w-10 h-10 md:w-12 md:h-12 mb-3 flex items-center justify-center overflow-hidden">
          <div className="text-2xl md:text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 origin-center">
            {icon}
          </div>
        </div>
      )}
      
      {title && (
        <h3 className="text-lg sm:text-xl font-bold mb-2">{title}</h3>
      )}
      
      {subtitle && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {subtitle}
        </p>
      )}
      
      {children}
    </div>
  );
}
