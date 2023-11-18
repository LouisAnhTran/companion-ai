import React from "react";
import { UserButton } from "@clerk/nextjs";
import SearchInput from "@/components/SearchInput";
import prismadb from "@/lib/prismadb";
import Categories from "@/components/Categories";
import Companions from "@/components/companions";

interface RootPageProps{
  searchParams: {
    categoryId: string,
    name: string
  }
}

const MainPage = async ({searchParams}:RootPageProps) => {
  const categories=await prismadb.category.findMany();

  const data=await prismadb.companion.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name
      }
    },
    orderBy:{
      createdAt: "desc"
    },
    include: {
      _count :{
        select: {
          messages: true
        }
      }
    }
  })

  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput></SearchInput>
      <Categories data={categories}></Categories>
      <Companions data={data}></Companions>
    </div>
  );
};

export default MainPage;
