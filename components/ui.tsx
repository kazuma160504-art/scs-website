import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";

/* shadcn/ui 風の軽量 UI プリミティブ集。依存を増やさないため自前実装。 */

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-cream-200 bg-white shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Badge({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        className ?? "bg-cream-200 text-ink"
      )}
    >
      {children}
    </span>
  );
}

export function Button({
  href,
  className,
  children,
  variant = "primary",
}: {
  href: string;
  className?: string;
  children: ReactNode;
  variant?: "primary" | "outline";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf-600",
        variant === "primary"
          ? "bg-leaf-600 text-white hover:bg-leaf-700"
          : "border-2 border-leaf-600 text-leaf-700 hover:bg-leaf-50",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function SectionTitle({
  children,
  sub,
}: {
  children: ReactNode;
  sub?: string;
}) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-black text-ink sm:text-3xl">{children}</h2>
      {sub && <p className="mt-2 text-ink-light">{sub}</p>}
    </div>
  );
}

export function PageHeader({
  title,
  lead,
  emoji,
}: {
  title: string;
  lead?: string;
  emoji?: string;
}) {
  return (
    <div className="bg-gradient-to-b from-leaf-50 to-cream-50 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h1 className="text-3xl font-black text-ink sm:text-4xl">
          {emoji && <span className="mr-3">{emoji}</span>}
          {title}
        </h1>
        {lead && <p className="mt-4 max-w-3xl leading-relaxed text-ink-light">{lead}</p>}
      </div>
    </div>
  );
}

export function TodoNote({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-lg border border-dashed border-apricot-300 bg-apricot-50 px-4 py-3 text-sm text-apricot-700">
      🚧 {children}
    </p>
  );
}
