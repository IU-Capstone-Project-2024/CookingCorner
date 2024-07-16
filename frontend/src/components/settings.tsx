import { cn } from "@/lib/utils";

interface SettingsContainerProps {
  children: React.ReactNode;
  className?: string;
}

const SettingsContainer = ({ children, className }: SettingsContainerProps) => {
  return (
    <div
      className={cn(
        `inline-flex h-12 items-center justify-between gap-4 border-2 border-x-transparent border-y-mainBlack bg-hover-secondary px-3 py-1.5`,
        className,
      )}
    >
      {children}
    </div>
  );
};

interface SettingsItemProps {
  children: React.ReactNode;
  className?: string;
}

const SettingsItem = ({ children, className }: SettingsItemProps) => {
  return (
    <div className={cn(`inline-flex max-w-[290px]`, className)}>{children}</div>
  );
};

export { SettingsContainer, SettingsItem };
