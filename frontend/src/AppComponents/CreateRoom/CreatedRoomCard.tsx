import React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CardData {
  _id: string;
  roomName: string;
  status: string;
  onDelete?: (id: string) => void;
}

const CreatedRoomCard: React.FC<CardData> = ({ 
  _id, 
  roomName, 
  status, 
  onDelete 
}) => {
  const statusStyles = {
    waiting: { dot: "bg-yellow-500", text: "text-yellow-800", bg: "bg-yellow-100" },
    finished: { dot: "bg-green-500", text: "text-green-800", bg: "bg-green-100" },
    active: { dot: "bg-blue-500", text: "text-blue-800", bg: "bg-blue-100" },
    default: { dot: "bg-gray-500", text: "text-gray-800", bg: "bg-gray-100" }
  };

  const currentStatus = statusStyles[status as keyof typeof statusStyles] || statusStyles.default;


  return (
    <div className={`w-full rounded-lg overflow-hidden ${currentStatus.bg} shadow-sm hover:shadow-md transition-all`}>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <div className={`w-3 h-3 rounded-full ${currentStatus.dot}`} />
          <div>
            <h2 className="font-medium text-gray-900">{roomName}</h2>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${currentStatus.text}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        </div>
        
          <button  
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-5 h-5" />
          </button>
      </div>

      {/* {status === "active" && (
        <div className="px-4 pb-4">
          <Button asChild className="w-full" size="sm">
            <Link to={getRoomLink()}>
              Join Room
            </Link>
          </Button>
        </div>
      )} */}
    </div>
  );
};

export default CreatedRoomCard;