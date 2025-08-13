import "./App.css";
import { Button } from "@/components/ui/button";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Home from "./Pages/Home";
import { Suspense } from "react";
import Auth from "./Auth/Auth";
import About from "./Pages/About";
import Room from "./Pages/Room";
import ProtectRoute from "./Layout/ProtectRoute";
import GenerateQuiz from "./Pages/GenerateQuiz";
import PreviewQuiz from "./Pages/PreviewQuiz";
import GameRoom from "./Pages/GameRoom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "auth", element: <Auth /> },
      {
        path: "room",
        element: (
          <ProtectRoute>
            <Room />
          </ProtectRoute>
        ),
      },
      {
        path: "room/generate-quiz/:roomId/:hostId", // Changed from "rooom/generate-quiz/:roomId"
        element: (
          <ProtectRoute>
            <GenerateQuiz />
          </ProtectRoute>
        ),
      },
      {
        path: "room/preview-quiz/:roomId/:hostId", // Changed from "rooom/generate-quiz/:roomId"
        element: (
          <ProtectRoute>
            <PreviewQuiz />
          </ProtectRoute>
        ),
      },
      {
        path: "room/game-room/:roomId/:userId", // Changed from "rooom/generate-quiz/:roomId"
        element: (
          <ProtectRoute>
            <GameRoom/>
          </ProtectRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
