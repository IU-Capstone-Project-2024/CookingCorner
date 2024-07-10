import { cn } from "@/lib/utils";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

const Title = ({ children, className }: TitleProps) => {
  return (
    <div
      className={cn("text-mainBlack font-inter text-3xl font-bold", className)}
    >
      {children}
    </div>
  );
};

export default Title;
