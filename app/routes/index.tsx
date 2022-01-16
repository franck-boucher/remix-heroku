import { AddIcon, PhoneIcon, WarningIcon } from "@chakra-ui/icons";
import { Button, Container, Input, Stack } from "@chakra-ui/react";
import { Line } from "@prisma/client";
import React from "react";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useLoaderData,
  useTransition,
} from "remix";
import invariant from "tiny-invariant";

import db from "~/server/db";

type LoaderData = {
  lines: Line[];
};
export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const lines = await db.line.findMany({
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      label: true,
    },
  });
  return { lines };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  if (request.method === "POST") {
    const newLine = formData.get("newLine");
    invariant(typeof newLine === "string");

    if (newLine) {
      await db.line.create({
        data: {
          label: newLine,
        },
      });
    }
  }

  if (request.method === "DELETE") {
    const lineId = formData.get("lineId");
    invariant(typeof lineId === "string");
    await db.line.delete({
      where: {
        id: Number(lineId),
      },
    });
  }

  return redirect("/");
};

export default function Index() {
  const { lines } = useLoaderData<LoaderData>();
  const formRef = React.useRef<HTMLFormElement>(null);
  const transition = useTransition();

  React.useEffect(() => {
    if (transition.state === "submitting") {
      formRef.current && formRef.current.reset();
    }
  }, [transition.submission]);

  return (
    <Container>
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
        <h1>Welcome to Remix - test dev branch</h1>
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
        <hr style={{ margin: "2rem" }} />
        <div>
          <Form method="post" ref={formRef}>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Input placeholder="New line" name="newLine" />
              <Button type="submit" colorScheme="blue">
                Add
              </Button>
            </div>
          </Form>
          <ul style={{ marginTop: "1rem" }}>
            {lines.map((line) => (
              <li
                key={line.id}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>
                  [{line.id}] {line.label}
                </span>
                <Form method="delete">
                  <button type="submit" name="lineId" value={line.id}>
                    x
                  </button>
                </Form>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}
