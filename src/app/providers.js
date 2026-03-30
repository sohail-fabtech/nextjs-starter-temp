"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/queryClient";
import { SwRegister } from "@/components/shared/sw-register";

export function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <SwRegister />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}