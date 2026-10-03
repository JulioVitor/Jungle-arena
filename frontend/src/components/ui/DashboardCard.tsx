// import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function DashboardCard({
  title,
  subtitle,
  action,
  children,
  className = "",
}: Props) {
  return (
    <section
      className={`rounded-xl border bg-card p-5 shadow-sm ${className}`}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold text-foreground">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>

        {action}
      </div>

      {children}
    </section>
  );
}