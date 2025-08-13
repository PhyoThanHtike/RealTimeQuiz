import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { joinRoom } from "@/apiEndpoints/Room";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface JoinRoomProps {
  trigger: React.ReactNode; // This is where we accept anything: Button, Card, etc.
}

const JoinRoom = ({ trigger }: JoinRoomProps) => {
  const [roomId, setRoomId] = useState<string>("");
  const navigate = useNavigate();
  const userId = useSelector((state: any) => state.user.userId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await joinRoom(roomId);
      toast.success(response.message);
      if ("room" in response) {
        navigate(
          `/room/game-room/${response.room._id}/${userId}`
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to join room");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Join Room</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="roomId">Room ID</Label>
              <Input
                id="roomId"
                name="roomId"
                value={roomId}
                onChange={handleChange}
                placeholder="*****************"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Join Room</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JoinRoom;
