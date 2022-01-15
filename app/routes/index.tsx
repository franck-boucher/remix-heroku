import { AddIcon, PhoneIcon, WarningIcon } from "@chakra-ui/icons";
import { Button, Container, Stack } from "@chakra-ui/react";

export default function Index() {
  return (
    <Container>
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
        <h1>Welcome to Remix</h1>
        <ul>
          <li>
            <a
              target="_blank"
              href="https://remix.run/tutorials/blog"
              rel="noreferrer"
            >
              15m Quickstart Blog Tutorial
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://remix.run/tutorials/jokes"
              rel="noreferrer"
            >
              Deep Dive Jokes App Tutorial
            </a>
          </li>
          <li>
            <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
              Remix Docs
            </a>
          </li>
        </ul>
        <div>
          // The default icon size is 1em (16px)
          <PhoneIcon />
          // Use the `boxSize` prop to change the icon size
          <AddIcon w={6} h={6} />
          // Use the `color` prop to change the icon color
          <WarningIcon w={8} h={8} color="red.500" />
        </div>
        <div>
          <Stack spacing={4} direction="row" align="center">
            <Button colorScheme="teal" size="xs">
              Button
            </Button>
            <Button colorScheme="teal" size="sm">
              Button
            </Button>
            <Button colorScheme="teal" size="md">
              Button
            </Button>
            <Button colorScheme="teal" size="lg">
              Button
            </Button>
          </Stack>
        </div>
      </div>
    </Container>
  );
}
