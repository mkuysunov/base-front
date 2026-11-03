import { MantineProvider as MantineProviderRoot } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { PropsWithChildren } from "react";

import { theme } from "@/styles";
import { BRAND_NAME } from "@/utils";

export function MantineProvider({ children }: PropsWithChildren) {
  return (
    <MantineProviderRoot theme={theme} classNamesPrefix={BRAND_NAME}>
      <ModalsProvider>{children}</ModalsProvider>
    </MantineProviderRoot>
  );
}
