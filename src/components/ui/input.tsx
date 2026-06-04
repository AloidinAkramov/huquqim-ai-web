import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-muted-foreground">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground",
            "placeholder:text-muted transition-colors",
            "focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100",
            error && "border-danger focus:border-danger focus:ring-red-100",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-danger">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-muted-foreground">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground",
            "placeholder:text-muted transition-colors resize-none",
            "focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100",
            error && "border-danger focus:border-danger focus:ring-red-100",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-danger">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
