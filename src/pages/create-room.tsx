import { CreateRoomForm } from "@/components/create-room-form";
import { RoomList } from "@/components/room-lis";

export function CreateRoom() {
  return (
    <div className="min-h-screen min-w-screen max-w-820px p-4">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-2 items-start gap-8">
          <CreateRoomForm />
          <RoomList />
        </div>
      </div>
    </div>
  );
}
