"use client";
import EchoItem from "@/app/_components/EchoItem";
import { getAllBookMark } from "@/app/_services/fetchDataAPI";
import { useAuth } from "@/app/_utils/getLogin";
import Head from "next/head";
import { useQuery } from "react-query";
import Loading from "@/app/loading";
import Header from "@/app/_components/Header";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import Content from "@/app/_components/Content";

function BookmarkPage() {
  const { currentUserId } = useAuth();

  const { data, error, isLoading } = useQuery(
    "bookmark",
    () => getAllBookMark(currentUserId),
    {
      enabled: !!currentUserId,
    },
  );

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading bookmarks: {error.message}</div>;

  return (
    <div>
      <Header title="Bookmark" />
      <Content>
        <Suspense fallback={<Spinner />}>
          {data && data.length > 0 ? (
            <div>
              {data.map((item, index) => (
                <EchoItem key={item?.feed._id} feed={item?.feed} />
              ))}
            </div>
          ) : (
            <div>No bookmarks available.</div>
          )}
        </Suspense>
      </Content>
    </div>
  );
}

export default BookmarkPage;
