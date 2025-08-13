import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-24 bg-gray-300">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-900">© {new Date().getFullYear()} QuizRealtime</div>
        <div className="flex gap-4 text-sm">
          <Link to="/privacy" className="text-gray-900">Privacy</Link>
          <Link to="/terms" className="text-gray-900">Terms</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
