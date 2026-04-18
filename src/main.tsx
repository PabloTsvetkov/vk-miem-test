import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, AppRoot } from "@vkontakte/vkui";
import '@vkontakte/vkui/dist/vkui.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 60 * 1000,
    }
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider>
      <AppRoot>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </AppRoot>
    </ConfigProvider>
  </StrictMode>,
);
