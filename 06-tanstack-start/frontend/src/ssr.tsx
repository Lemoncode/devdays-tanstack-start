import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";
import { getRouterManifest } from "@tanstack/react-start/router-manifest";
import { createRouter } from "#common/router";

export default createStartHandler({
  createRouter,
  getRouterManifest,
})(defaultStreamHandler);
