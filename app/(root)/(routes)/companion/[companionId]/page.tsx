import prismadb from "@/lib/prismadb";
import React from "react";
import CompanionForm from "./components/companion-form";
import { auth, redirectToSignIn } from "@clerk/nextjs";

interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
}

const page = async ({ params }: CompanionIdPageProps) => {
  const {userId}=auth();

  if(!userId){
    return redirectToSignIn();
  }

  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.companionId,
      userId
    },
  });

  const catagories = await prismadb.category.findMany();

  return <CompanionForm initialData={companion} categories={catagories}></CompanionForm>;
};

export default page;
