import { ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useRooms } from "@/http/use-rooms";
import { timeAgoIntl } from "@/lib/utils";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type GetRoomsResponse = Array<{
  id: string;
  name: string;
  description: string;
  questionsCount: number;
  createdAt: string;
}>;

export function RoomList() {
  const { data, isLoading } = useRooms();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Salas recentes</CardTitle>
        <CardDescription>
          Acesso rápido para as salas criadas recentemente
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isLoading && (
          <div className="flex items-center justify-center">
            <Loader2 className="size-4 animate-spin" />
          </div>
        )}
        {!isLoading &&
          data &&
          data.length > 0 &&
          data.map((room: GetRoomsResponse[number]) => {
            return (
              <Link
                className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent"
                key={room.id}
                to={`/room/${room.id}`}
              >
                <div className="flex-1 text-sm">
                  <h3 className="font-medium">{room.name}</h3>
                  <Badge className="text-sm" variant="secondary">
                    {timeAgoIntl(room.createdAt)}
                  </Badge>
                  <Badge className="text-sm" variant="secondary">
                    {room.questionsCount
                      ? `${room.questionsCount} pergunta(s)`
                      : "Sem perguntas"}
                  </Badge>
                </div>
                <span className="flex items-center gap-1 text-sm">
                  Entrar
                  <ArrowRight className="size-3" />
                </span>
              </Link>
            );
          })}
      </CardContent>
    </Card>
  );
}
