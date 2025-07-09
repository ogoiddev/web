import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

type GetRoomsResponse = Array<{
  id: string;
  name: string;
  description: string;
}>;

export function CreateRoom() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3333/rooms");
      const data: GetRoomsResponse = await response.json();

      return data;
    },
  });
  console.log("🚀 ~ CreateRoom ~ data:", data);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-zinc-800 p-8">
        <h1 className="text-center text-2xl font-bold">Crie uma nova sala</h1>

        {isLoading && <p>Carregando...</p>}

        <div className="flex flex-col overflow-auto h-136 items-center justify-between gap-2">
          {data &&
            data.map((room) => (
              <Link
                to={`/room/${room.id}`}
                key={room.id}
                className="flex w-full items-center justify-between bg-zinc-700 p-2 rounded-md hover:bg-zinc-600"
              >
                <span>{room.name}</span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
