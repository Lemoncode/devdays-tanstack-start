import { hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/react-start";
import { createRouter } from "#common/router";

const router = createRouter();

hydrateRoot(document, <StartClient router={router} />);
