"use client";

import React, { ElementRef, useEffect, useRef, useState } from 'react'
import { Companion } from '@prisma/client';
import ChatMessage from './chat-message';
import { ChatMessageProps } from './chat-message';

interface ChatMessagesProps{
    messages: ChatMessageProps[];
    isLoading: boolean;
    companion: Companion;
}

const ChatMessages = ({
    messages,
    isLoading,
    companion
}:ChatMessagesProps) => {
    const scrollRef=useRef<ElementRef<"div">>(null);

    const [fakeLoading,setFakeLoading]=useState(messages.length === 0 ? true : false)

    useEffect(()=>{
        const timeout=setTimeout(()=>{
            setFakeLoading(false);
        },1000);

        return () =>{
            clearTimeout(timeout);
        }
    })

    useEffect(()=>{
        scrollRef?.current?.scrollIntoView({behavior: "smooth"});
    },[messages.length]);

  return (
    <div className='flex-1 overflow-y-auto pr-4'>
        <ChatMessage isLoading={fakeLoading} src={companion.src} role="system" content={`Hello, I am ${companion.name}, ${companion.description}`}></ChatMessage>
        {messages.map((message)=>
            <ChatMessage
            key={message.content}
            role={message.role}
            content={message.content}
            src={message.src}></ChatMessage>
        )}
        {isLoading && (
            <ChatMessage
            role='system'
            src={companion.src}
            isLoading></ChatMessage>
        )}
        <div ref={scrollRef}/>

    </div>
  )
}

export default ChatMessages