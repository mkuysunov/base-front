import { Button, Card, Group, Text } from "@mantine/core";
import { useState } from "react";

import { COUNT_STEP, DEFAULT_COUNT } from "./ExampleComponentConstants";
import classes from "./ExampleComponentStyles.module.css";
import type { ExampleComponentProps } from "./ExampleComponentTypes";
import { formatCount } from "./ExampleComponentUtils";

export const ExampleComponent = (props: ExampleComponentProps) => {
  const { title, initialCount = DEFAULT_COUNT } = props;
  const [count, setCount] = useState(initialCount);

  return (
    <Card withBorder p="md" radius="md" className={classes.Card}>
      <Text fw={600}>{title}</Text>

      <Group justify="space-between">
        <Text size="sm" c="dimmed">
          {formatCount(count)}
        </Text>
        <Button onClick={() => setCount((c) => c + COUNT_STEP)}>+</Button>
      </Group>
    </Card>
  );
};
