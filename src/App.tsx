import "@/i18n";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "./styles/global.css";

import { Notifications } from "@mantine/notifications";
import { NuqsAdapter } from "nuqs/adapters/react";

import { Router } from "@/pages";

import {
  DayjsProvider,
  MantineProvider,
  ReactQueryProvider,
} from "./providers";

export default function App() {
  return (
    <NuqsAdapter>
      <ReactQueryProvider>
        <MantineProvider>
          <DayjsProvider />
          <Notifications position="top-center" limit={3} />
          <Router />
        </MantineProvider>
      </ReactQueryProvider>
    </NuqsAdapter>
  );
}
