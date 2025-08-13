import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { createNewRoom } from "@/apiEndpoints/Room";
import { toast } from "sonner";

interface RoomFormData {
  roomName: string;
  quizCount: number;
  quizTime: number;
}

interface CreateRoomProps {
  trigger: React.ReactNode; // This is where we accept anything: Button, Card, etc.
}

const CreateRoom = ({ trigger }: CreateRoomProps) => {
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState<RoomFormData>({
    roomName: "",
    quizCount: 0,
    quizTime: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRoomData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createNewRoom(roomData);
      toast.success(response.message);
      if ("room" in response) {
        navigate(`/room/generate-quiz/${response.room._id}/${response.room.creator}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Room</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="roomName">Room Name</Label>
              <Input
                id="roomName"
                name="roomName"
                placeholder="Room 1"
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="quizCount">Quiz Count</Label>
              <Input
                id="quizCount"
                name="quizCount"
                type="number"
                placeholder="5"
                onChange={handleChange}
                required
                min="1"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="quizTime">
                Time Limit for each quiz{" "}
                <span className="text-gray-400">(in seconds)</span>
              </Label>
              <Input
                id="quizTime"
                name="quizTime"
                type="number"
                placeholder="15"
                onChange={handleChange}
                required
                min="1"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Create Room</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoom;

