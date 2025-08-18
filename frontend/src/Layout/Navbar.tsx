import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { setUser } from "@/store/slices/UserSlice";
import { SignOut } from "@/apiEndpoints/Auth";
import { toast } from "sonner";

const Navbar = () => {
  const userId = useSelector((state: any) => state.user.userId);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("");

  const handleSignOut = async () => {
    try {
      const response = await SignOut();
      dispatch(
        setUser({
          _id: "",
          userName: "",
          email: "",
        })
      );
      toast.success(response.message);
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    // { name: "Create Quiz", path: "/create-quiz" },
    { name: "My Rooms", path: "/room" },
  ];

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-gray-700/40 bg-indigo-950 backdrop-blur-lg supports-[backdrop-filter]:bg-indigo-950/80"
    >
      <div className="container w-[90%] mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
        {/* Logo - Preserved original styling */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2"
        >
          <Link to="/" className="flex items-center">
            <span className="ml-2 text-xl font-bold text-white">
              Quiz
              <span className="bg-purple rounded-sm p-1 m-1 text-white">
                Hub
              </span>
            </span>
          </Link>
        </motion.div>

        {/* Navigation Links with Underline Animation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <motion.div
              key={item.name}
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={item.path}
                className={`text-sm font-medium px-1 py-2 transition-colors ${
                  activeLink === item.path
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveLink(item.path)}
              >
                {item.name}
                {activeLink === item.path && (
                  <motion.div
                    className="absolute bottom-[-3] left-0 w-full h-1 bg-purple-500"
                    layoutId="underline"
                    initial={false}
                    transition={{
                      type: "spring",
                      bounce: 0.25,
                      duration: 0.5,
                    }}
                  />
                )}
                {activeLink !== item.path && (
                  <motion.div
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* User Profile with Enhanced Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDropdown}
          >
            {userId ? (
              <button className="flex items-center gap-2 focus:outline-none">
                <div className="relative">
                  <img
                    src={"https://cdn.prod.website-files.com/62bdc93e9cccfb43e155104c/66c9beca445b37b90d7a4696_Luffy%20pfp%20400x400%20(6).png"}
                    alt="User profile"
                    className="h-9 w-9 rounded-full object-cover border-2 border-purple-500/30 hover:border-purple-500/60 transition-all"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                </div>
              </button>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/auth"
                  className="rounded-lg px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg transition-all"
                >
                  Login
                </Link>
              </motion.div>
            )}
          </motion.div>

          <AnimatePresence>
            {isDropdownOpen && userId && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-0 mt-2 w-56 rounded-xl shadow-xl bg-gray-800 border border-gray-700 z-50 overflow-hidden"
              >
                <div className="py-1">
                  <div className="px-4 py-3 border-b border-gray-700">
                    <p className="text-sm font-medium text-white">My Account</p>
                    <p className="text-xs text-gray-400 truncate">user@example.com</p>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-700/50 transition-all"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    View Profile
                  </Link>
                  <Link
                    to="/profile/edit"
                    className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-700/50 transition-all"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Edit Profile
                  </Link>
                  <button
                    className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-700/50 w-full transition-all"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      handleSignOut();
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

// // src/components/Navbar.tsx
// import React from "react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";

// const Navbar: React.FC = () => {
//   return (
//     <nav className="w-full py-4 z-40 bg-transparent">
//       <div className="container mx-auto flex items-center justify-between px-4">
//         <Link to="/" className="text-lg font-bold">
//           QuizRealtime
//         </Link>

//         <div className="flex items-center gap-3">
//           <Link to="/how-it-works" className="text-sm text-muted-foreground hidden sm:inline">
//             How it works
//           </Link>
//           <Link to="/rooms" className="text-sm text-muted-foreground hidden sm:inline">
//             Rooms
//           </Link>
//           <Button asChild size="sm">
//             <Link to="/create">Create</Link>
//           </Button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
