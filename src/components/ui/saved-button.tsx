
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { Check } from "lucide-react";

interface SavedButtonProps extends ButtonProps {
  isSaved?: boolean;
  savedText?: string;
  children: React.ReactNode;
}

const SavedButton = React.forwardRef<HTMLButtonElement, SavedButtonProps>(
  ({ className, isSaved = false, savedText = "Saved", children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "transition-all duration-300",
          isSaved && "bg-green-500 hover:bg-green-600 text-white dark:shadow-[0_0_18px_rgba(72,187,120,0.5)]",
          className
        )}
        {...props}
      >
        {isSaved ? (
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 animate-fade-in" />
            {savedText}
          </span>
        ) : (
          children
        )}
      </Button>
    );
  }
);

SavedButton.displayName = "SavedButton";

export { SavedButton };
