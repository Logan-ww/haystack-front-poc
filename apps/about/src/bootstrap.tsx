import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { createRouter } from "./routing/router-factory";
import { RoutingStrategy } from "./routing/types";
import { createShadowContainer, deleteShadowContainer } from "../styleLoader";

const mount = ({
  mountPoint,
  parentElementId,
  initialPathname,
  routingStrategy,
}: {
  mountPoint: HTMLElement;
  parentElementId: string,
  initialPathname?: string;
  routingStrategy?: RoutingStrategy;
}) => {
  const appPlaceholder = createShadowContainer(parentElementId);
  const router = createRouter({ strategy: routingStrategy, initialPathname });
  // const root = createRoot(mountPoint);
  const root = createRoot(appPlaceholder);
  root.render(<RouterProvider router={router} />);

  return () => queueMicrotask(() => root.unmount());
};

export { mount };