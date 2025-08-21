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
import CreateQuiz from "./Pages/CreateQuiz";
import Profile from "./Pages/Profile";
import AuthSuccess from "./Auth/AuthSuccess"; // Import the AuthSuccess component

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: (<ProtectRoute><Home /></ProtectRoute> )},
      { path: "about", element: <About /> },
      { path: "auth", element: <Auth /> },
      { 
        path: "auth/success", // Add this route for Google OAuth success
        element: <AuthSuccess /> 
      },
      {
        path: "room",
        element: (
          <ProtectRoute>
            <Room />
          </ProtectRoute>
        ),
      },
      {
        path: "room/generate-quiz/:roomId/:hostId",
        element: (
          <ProtectRoute>
            <GenerateQuiz />
          </ProtectRoute>
        ),
      },
      {
        path: "room/preview-quiz/:roomId/:hostId",
        element: (
          <ProtectRoute>
            <PreviewQuiz />
          </ProtectRoute>
        ),
      },
      {
        path: "room/game-room/:roomId/:userId",
        element: (
          <ProtectRoute>
            <GameRoom/>
          </ProtectRoute>
        ),
      },
      {
        path: "create-quiz",
        element: (
          <ProtectRoute>
            <CreateQuiz/>
          </ProtectRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectRoute>
            <Profile/>
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
