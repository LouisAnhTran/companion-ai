"use client";

import React from "react";
import { useToast } from "./ui/use-toast";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import BotAvatar from "./bot-avatar";
import {BeatLoader} from 'react-spinners';
import UserAvatar from "./user-avatar";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";

export interface ChatMessageProps {
  role: "system" | "user";
  content?: string;
  isLoading?: boolean;
  src?: string;
}

const ChatMessage = ({ role, content, isLoading, src }: ChatMessageProps) => {
  const { toast } = useToast();
  const { theme } = useTheme();

  const onCopy = () => {
    if (!content) {
      return;
    }

    navigator.clipboard.writeText(content);
    toast({
      description: "Message copied to clipboard",
    });
  };

  return <div className={cn("group flex items-start gap-x-3 py-4 w-full",role==='user' && 'justify-end')}>
    {role !== 'user' && src && <BotAvatar src={src}></BotAvatar>}
    <div className="rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10">
        {isLoading ? <BeatLoader color={theme === "light" ? "black" : "white"}></BeatLoader>  : content}
    </div>
    {role === "user" &&  <UserAvatar></UserAvatar>}
    <Button onClick={onCopy}
    className="opacity-0 group-hover:opacity-100 transition"
    size="icon"
    variant="ghost">
        <Copy className="w-4 h-4"></Copy>
    </Button>
  </div>;
};

export default ChatMessage;
