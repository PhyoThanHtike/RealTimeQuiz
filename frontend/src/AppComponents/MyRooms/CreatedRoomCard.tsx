import React from "react";
import { Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Link } from "react-router-dom";
import { RotateCcw } from 'lucide-react';

interface CardData {
  _id: string;
  userId: string;
  roomName: string;
  status: string;
  onDelete?: (roomId: string) => void;
  onReset?: (roomId: string) => void;
}

const CreatedRoomCard: React.FC<CardData> = ({
  _id,
  userId,
  roomName,
  status,
  onDelete,
  onReset,
}) => {
  const statusStyles = {
    waiting: {
      dot: "bg-amber-400",
      text: "text-amber-800",
      bg: "bg-gradient-to-r from-amber-50 to-amber-100",
      border: "border border-amber-200",
    },
    finished: {
      dot: "bg-emerald-500",
      text: "text-emerald-800",
      bg: "bg-gradient-to-r from-emerald-50 to-emerald-100",
      border: "border border-emerald-200",
    },
    active: {
      dot: "bg-blue-500",
      text: "text-blue-800",
      bg: "bg-gradient-to-r from-blue-50 to-blue-100",
      border: "border border-blue-200",
    },
    default: {
      dot: "bg-gray-400",
      text: "text-gray-800",
      bg: "bg-gradient-to-r from-gray-50 to-gray-100",
      border: "border border-gray-200",
    },
  };

  const currentStatus =
    statusStyles[status as keyof typeof statusStyles] || statusStyles.default;

  return (
    <div
      className={`w-full rounded-xl ${currentStatus.bg} ${currentStatus.border} shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden`}
    >
      <div className="flex items-center justify-between p-5 gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div
              className={`w-4 h-4 rounded-full ${currentStatus.dot} absolute -top-1 -right-1 border-2 border-white`}
            />
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-inner">
              <span className="text-lg font-bold text-gray-600">
                {roomName.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 text-lg">{roomName}</h2>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${currentStatus.text} ${currentStatus.bg} shadow-inner`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-2">
            {/* Delete Alert */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 hover:bg-red-50 text-red-600 hover:text-red-700 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-xl max-w-md">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-lg">
                    Delete Room
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-600">
                    Are you sure you want to delete{" "}
                    <strong className="text-gray-900">{roomName}</strong>? This
                    action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-lg">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete?.(_id)}
                    className="bg-red-600 hover:bg-red-700 rounded-lg"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Reset Alert */}
            {status == "finished" && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 hover:bg-blue-50 text-blue-600 hover:text-blue-700 rounded-lg"
                  >
                    <RotateCcw/> Reset
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-xl max-w-md">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-lg">
                      Reset Room
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-600">
                      Are you sure you want to reset{" "}
                      <strong className="text-gray-900">{roomName}</strong>?
                      This will clear previous quiz room data.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-lg">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onReset?.(_id)}
                      className="bg-blue-600 hover:bg-blue-700 rounded-lg"
                    >
                      Reset
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
          <Link
            to={
              status === "active"
                ? `/room/preview-quiz/${_id}/${userId}`
                : status === "started"
                ? `/room/game-room/${_id}/${userId}`
                : status === "waiting"
                ? `/room/generate-quiz/${_id}/${userId}`
                : status === "finished"
                ? `/room/final-room/${_id}/${userId}}`
                : `/room/generate-quiz/${_id}/${userId}`
            }
            key={_id}
            className="block"
          >
            <Button className="w-full rounded-lg bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 hover:text-gray-900 shadow-sm hover:shadow-md transition-all flex items-center gap-2">
              View Room
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreatedRoomCard;
