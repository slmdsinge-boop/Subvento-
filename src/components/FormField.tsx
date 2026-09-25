"use client";
import type { FocusEvent, InputHTMLAttributes } from "react";
import clsx from "clsx";
import { vibrate } from "@/lib/haptics";
interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> { label: string; hint?: string; error?: string; }
export function FormField({ label, hint, error, className, id, onFocus, ...props }: FormFieldProps) {
 const fieldId = id ?? props.name;
 function handleFocus(e: FocusEvent<HTMLInputElement>) { vibrate(); onFocus?.(e); }
 return (<div><label htmlFor={fieldId} className="block text-sm font-medium mb-1.5">{label}</label><input id={fieldId} onFocus={handleFocus} className={clsx("focus-gold w-full rounded-xl px-3.5 py-2.5 text-sm outline-none transition-colors",className)} style={{background:"var(--color-bg-elevated)",border:`1px solid ${error ? "var(--color-error)" : "var(--color-border)"}`,color:"var(--color-text)"}} {...props}/>{error ? <p className="mt-1.5 text-xs" style={{color:"var(--color-error)"}}>{error}</p> : hint ? <p className="mt-1.5 text-xs" style={{color:"var(--color-text-faint)"}}>{hint}</p> : null}</div>);
}