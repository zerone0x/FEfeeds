"use client";
import { FormatTime } from "@/app/_utils/FormatData";
import TextExpander from "./TextExpander";
import Link from "next/link";
import UserCard from "./UserCard";
import { useAuth } from "../_utils/getLogin";
import Reaction from "./Reaction";

function EchoItem({ feed }) {
  const user = feed?.user;
  const content = feed?.content;
  const createdAt = feed?.createdAt;
  const name = user?.name;
  const { authData, setAuthData, currentUserId } = useAuth();
  const feedId = feed?.id;

  return (
    feed && (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <Link href={`/${name}/status/${feedId}`}>
          <div className="p-4 flex justify-between items-center">
            <UserCard user={user} />
            <span className="text-sm text-gray-500">
              {FormatTime(createdAt)}
            </span>
          </div>
          <div className="px-4 py-2">
            <TextExpander>{content}</TextExpander>
          </div>
        </Link>
        <Reaction feedId={feedId} />
      </div>
    )
  );
}

export default EchoItem;
