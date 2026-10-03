import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Sidebar } from "@/components/layout/Sidebar";

export function RootLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="min-w-0 flex-1 px-4 py-6 pt-16 md:px-8 md:py-6">
        <Outlet />
      </main>

      <TanStackRouterDevtools />
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}