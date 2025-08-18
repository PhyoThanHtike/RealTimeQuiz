import React from "react";
import { Link } from "react-router-dom";
import type { getRooms } from "@/apiEndpoints/Room";
import CreatedRoomCard from "@/AppComponents/MyRooms/CreatedRoomCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useSelector } from "react-redux";
import CreateRoom from "../CreateRoom/CreateRoom";

interface MyRoomsProps {
  data: getRooms | undefined;
  isLoading: boolean;
  error: Error | null;
  isError: boolean;
  onDeleteRoom?: (roomId: string) => void;
  onResetRoom?: (roomId: string) => void;
  filter?: "active" | "all";
}

const MyRooms: React.FC<MyRoomsProps> = ({
  data,
  isLoading,
  error,
  isError,
  onDeleteRoom,
  onResetRoom,
  filter = "all",
}) => {
  const filteredRooms =
    data?.rooms?.filter((room) =>
      filter === "all" ? true : room.status === "active"
    ) || [];

  const userId = useSelector((state: any) => state.user.userId);

  return (
    <div className="p-6 flex flex-col h-full">
      <div
        className="space-y-4 flex-1 overflow-y-auto pb-4"
        style={{ maxHeight: "400px" }}
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
          </div>
        ) : isError ? (
          <div className="text-center py-8 text-red-500">
            Error: {error?.message || "Failed to load rooms"}
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <p className="mb-4">
              {filter === "active"
                ? "No active rooms currently"
                : "You haven't created any rooms yet"}
            </p>
          </div>
        ) : (
          filteredRooms.map((room) => (

              <CreatedRoomCard
                _id={room._id}
                userId={userId}
                roomName={room.roomName}
                status={room.status}
                onDelete={onDeleteRoom}
                onReset={onResetRoom}
              />
          ))
        )}
        {filter != "all" && (
          <CreateRoom
            trigger={
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Create New Room
              </Button>
            }
          />
        )}
      </div>

      <div className="mt-auto pt-4 border-t border-gray-100"></div>
    </div>
  );
};

export default MyRooms;

{
  /* <Plus className="mr-2 h-4 w-4" /> */
}
