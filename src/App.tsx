import { MantineProvider } from "@mantine/core";
import { LemmyHttp } from "lemmy-js-client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { LemmyProvider } from "./lemmy/context";
import Home from "./pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

const baseUrl = "https://lemmy.ml";
const lemmyClient: LemmyHttp = new LemmyHttp(baseUrl);
const queryClient = new QueryClient();

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <QueryClientProvider client={queryClient}>
        <LemmyProvider client={lemmyClient}>
          <RecoilRoot>
            <RouterProvider router={router} />
          </RecoilRoot>
        </LemmyProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
}
