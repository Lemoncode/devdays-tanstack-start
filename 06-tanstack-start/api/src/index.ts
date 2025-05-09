import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { posts } from "./mock-data";

const PORT = 3000;

let db = {
  posts: posts,
  loggedUser: null as string | null,
};

const app = new Hono();
app.use(logger());
app.use("/api/*", cors());

app.post("/api/login", async (context) => {
  const { email } = await context.req.json<{
    email: string;
    password: string;
  }>();
  db.loggedUser = email.split("@")[0].replace(".", " ");
  return context.json(db.loggedUser);
});

app.post("/api/logout", async (context) => {
  db.loggedUser = null;
  return context.body(null, 204);
});

app.get("/api/auth-user", async (context) => {
  return context.json(db.loggedUser);
});

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
