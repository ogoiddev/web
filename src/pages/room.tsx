import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

type RoomParams = {
  id: string | undefined;
};

export function Room() {
  const { id } = useParams<RoomParams>();

  if (!id) {
    return <Navigate replace to="/" />;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["room", id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/rooms/${id}`);
      return response.json();
    },
  });
  console.log("🚀 ~ Room ~ data:", data);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center text-white">
      <div className="flex flex-col gap-4">
        <span>{id}</span>
        <h1 className="text-2xl font-bold">{data[0]?.name}</h1>
        <p className="text-sm text-zinc-400">{data[0]?.description}</p>
      </div>
    </div>
  );
}
