
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 dark:hover:shadow-[0_0_18px_rgba(52,152,219,0.6)] transition-all duration-300 active:scale-95 transform-gpu hover:translate-y-[-1px]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:hover:shadow-[0_0_18px_rgba(231,76,60,0.6)] transition-all duration-300 active:scale-95 transform-gpu hover:translate-y-[-1px]",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-300 active:scale-95 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:shadow-[0_0_15px_rgba(52,152,219,0.4)] transform-gpu hover:translate-y-[-1px]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:hover:shadow-[0_0_18px_rgba(155,89,182,0.6)] transition-all duration-300 active:scale-95 transform-gpu hover:translate-y-[-1px]",
        ghost: "hover:bg-accent hover:text-accent-foreground transition-all duration-300 active:scale-95 dark:hover:bg-gray-800/70 transform-gpu hover:translate-y-[-1px]",
        link: "text-primary underline-offset-4 hover:underline transition-all duration-200 dark:text-calendoodle-blue dark:hover:text-calendoodle-blue/90 dark:hover:filter dark:hover:drop-shadow-[0_0_8px_rgba(52,152,219,0.8)]",
        gradient: "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 dark:hover:shadow-[0_0_20px_rgba(52,152,219,0.7)] transition-all duration-300 active:scale-95 transform-gpu hover:translate-y-[-1px] dark:from-calendoodle-blue dark:to-calendoodle-purple dark:text-white",
        "gradient-apple": "bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 shadow-lg hover:shadow-xl dark:hover:shadow-[0_0_25px_rgba(66,153,225,0.6)] transition-all duration-300 active:scale-95 transform-gpu hover:translate-y-[-2px]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
