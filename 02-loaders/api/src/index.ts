import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { posts } from "./mock-data";

const PORT = 3000;

let db = {
  posts: posts,
};

const app = new Hono();
app.use(logger());
app.use("/api/*", cors());

app.get("/api/posts", async (context) => {
  return context.json(db.posts);
});

app.get("/api/posts/:id", async (context) => {
  const { id } = context.req.param();
  return context.json(db.posts.find((post) => post.id === Number(id)));
});

serve({ fetch: app.fetch, port: PORT }, (info) => {
  console.log(`API running on ${info.port}`);
});
