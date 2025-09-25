import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  let title = "Unexpected Error";
  let message = "Something went wrong.";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "404 – Page Not Found";
      message = "The page you’re looking for doesn’t exist.";
    } else {
      title = `${error.status} – ${error.statusText}`;
      message = error.data || "An error occurred.";
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 via-purple-50 to-blue-50 
    dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-800 transition-colors duration-300 p-6"
    >
      <Card className="max-w-lg w-full text-center shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-red-600">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700">{message}</p>
          
        </CardContent>
        <CardContent className="flex items-center justify-center">
            <Button
            onClick={() => (window.location.href = "/")}
            className="flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Go Back Home
        </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
