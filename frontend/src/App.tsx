import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import { Suspense, lazy } from "react";
import ProtectRoute from "./Layout/ProtectRoute";
import FinalRoom from "./Pages/FinalRoom";
import ErrorPage from "./Pages/ErrorPage";

// Lazy-loaded pages
const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/About"));
const Auth = lazy(() => import("./Auth/Auth"));
const AuthSuccess = lazy(() => import("./Auth/AuthSuccess"));
const Room = lazy(() => import("./Pages/Room"));
const GenerateQuiz = lazy(() => import("./Pages/GenerateQuiz"));
const PreviewQuiz = lazy(() => import("./Pages/PreviewQuiz"));
const GameRoom = lazy(() => import("./Pages/GameRoom"));
const CreateQuiz = lazy(() => import("./Pages/CreateQuiz"));
const Profile = lazy(() => import("./Pages/Profile"));

// Skeleton for Home (matches LCP elements like hero heading)
const MyHomeSkeleton = () => (
  <div className="p-4">
    <div className="h-16 md:h-24 bg-gray-300 rounded w-3/4 mb-4 animate-pulse" />
    <div className="h-4 bg-gray-300 rounded w-full mb-2 animate-pulse" />
    <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse" />
  </div>
);

// Router setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: (
          <ProtectRoute>
            <Suspense fallback={<MyHomeSkeleton />}>
              <Home />
            </Suspense>
          </ProtectRoute>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<div className="p-4">Loading About...</div>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "auth",
        element: (
          <Suspense fallback={<div className="p-4">Loading Auth...</div>}>
            <Auth />
          </Suspense>
        ),
      },
      {
        path: "auth/success",
        element: (
          <Suspense fallback={<div className="p-4">Loading Auth...</div>}>
            <AuthSuccess />
          </Suspense>
        ),
      },
      {
        path: "room",
        element: (
          <ProtectRoute>
            <Suspense fallback={<div className="p-4">Loading Room...</div>}>
              <Room />
            </Suspense>
          </ProtectRoute>
        ),
      },
      {
        path: "room/generate-quiz/:roomId/:hostId",
        element: (
          <ProtectRoute>
            <Suspense fallback={<div className="p-4">Loading Generate Quiz...</div>}>
              <GenerateQuiz />
            </Suspense>
          </ProtectRoute>
        ),
      },
      {
        path: "room/preview-quiz/:roomId/:hostId",
        element: (
          <ProtectRoute>
            <Suspense fallback={<div className="p-4">Loading Preview Quiz...</div>}>
              <PreviewQuiz />
            </Suspense>
          </ProtectRoute>
        ),
      },
      {
        path: "room/game-room/:roomId/:userId",
        element: (
          <ProtectRoute>
            <Suspense fallback={<div className="p-4">Loading Game Room...</div>}>
              <GameRoom />
            </Suspense>
          </ProtectRoute>
        ),
      },
      {
        path: "room/final-room/:_id/:userId",
        element: (
          <ProtectRoute>
            <Suspense fallback={<div className="p-4">Loading final Room...</div>}>
              <FinalRoom/>
            </Suspense>
          </ProtectRoute>
        ),
      },
      {
        path: "create-quiz",
        element: (
          <ProtectRoute>
            <Suspense fallback={<div className="p-4">Loading Create Quiz...</div>}>
              <CreateQuiz />
            </Suspense>
          </ProtectRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectRoute>
            <Suspense fallback={<div className="p-4">Loading Profile...</div>}>
              <Profile />
            </Suspense>
          </ProtectRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    // Top-level Suspense for router
    <Suspense fallback={<MyHomeSkeleton />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
