import { Companion, Message } from "@prisma/client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { ChevronLeft, Edit, MessageSquare, MoreVertical, Trash } from "lucide-react";
import BotAvatar from "./bot-avatar";
import { useUser } from "@clerk/nextjs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Toast } from "./ui/toast";
import axios from "axios";
import { toast } from "./ui/use-toast";
import { describe } from "node:test";

interface ChatHeaderProps {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

const ChatHeader = ({ companion }: ChatHeaderProps) => {
  const router = useRouter();
  const { user } = useUser();

  const onDelete=async () =>{
    try {
        await axios.delete(`/api/companion/${companion.id}`);

        toast({
            description: "Success"
        }
        )

        router.refresh();
        router.push('/');
    } catch (error) {
        console.log(`[companion-delete], ${error}`)
        toast({
            description: "Something went wrong",
            variant: "destructive"
        })
    }
  }

  return (
    <div className="flex w-full justify-between items-center border-b border-primary/10 pb-4">
      <div className="flex gap-x-2 items-center">
        <Button onClick={() => router.back()} size="icon" variant="ghost">
          <ChevronLeft className="h-8 w-8"></ChevronLeft>
        </Button>
        <BotAvatar src={companion.src}></BotAvatar>
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold">{companion.name}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <MessageSquare className="w-3 h-3 mr-1" />
              {companion._count.messages}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Created by {companion.userName}
          </p>
        </div>
      </div>

      {user?.id === companion.userId && (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant="secondary" size="icon">
                    <MoreVertical></MoreVertical>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={()=>router.push(`/companion/${companion.id}`)}>
                    <Edit className="w-4 h-4 mr-2"/>Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete}>
                    <Trash className="w-4 h-4 mr-2"/>Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default ChatHeader;
