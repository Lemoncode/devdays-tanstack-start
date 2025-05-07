import { BrowserRouter, Routes, Route } from "react-router";
import { Home, PostList, Post, Navbar, Footer } from "#components";

export const Router = () => {
  return (
    <BrowserRouter>
      <div className="grid grid-rows-[auto_1fr_auto] h-screen">
        <Navbar />
        <main className="h-full overflow-y-auto">
          <Routes>
            <Route index element={<Home />} />
            <Route path="posts">
              <Route index element={<PostList />} />
              <Route path=":postId" element={<Post />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
