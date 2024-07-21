"use client";
import { useQueryClient } from "react-query";
import { useAuth } from "../_utils/getLogin";
import { FaBookmark, FaStar } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { IoIosMore } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { LuReply } from "react-icons/lu";
import {
  BookMarkFeed,
  DeleteFeedById,
  LikeFeed,
  getIsBooked,
  getIsLiked,
} from "../_services/fetchDataAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useRef, useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import { useRouter } from "next/navigation";
import { usePublishType } from "../_utils/getPublishType";

function Reaction({
  feed,
  type,
  likesCount,
  commentsCount,
  user,
}: {
  feed: object;
  type: string;
  likesCount: number;
  commentsCount: number;
  user: string;
}) {
  const feedId = feed?._id;
  const { currentUserId } = useAuth();
  const isDeletable = currentUserId === user._id;
  const queryClient = useQueryClient();
  const [likeStatus, setLikeStatus] = useState(false);
  const [likedCount, setLikedCount] = useState(likesCount);
  const [commentCount, setCommentCount] = useState(commentsCount);
  const [bookmarkStatus, setBookmarkStatus] = useState(false);
  const [dialog, setDialog] = useState({ isOpen: false, feedId: feedId });
  const [dotsDialog, setDotsDialog] = useState(false);
  const dialogRef = useRef(null);
  const router = useRouter();
  const { publishType, setPublishType } = usePublishType();

  // NOTE: We need to close dialog when click outside the dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        setDotsDialog(false);
      }
    }

    if (dotsDialog) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dotsDialog]);

  useEffect(() => {
    async function fetchStatuses() {
      const liked = await getIsLiked(feedId, type);
      const bookmarked = await getIsBooked(feedId, type);
      setLikeStatus(liked);
      setBookmarkStatus(bookmarked);
    }
    fetchStatuses();
  }, [feedId]);

  async function bookmarkClick(event: any) {
    // event.stopPropagation();
    event.preventDefault();
    setBookmarkStatus((bookmarkStatus) => !bookmarkStatus);
    setDotsDialog(false);
    await BookMarkFeed(feedId, type);
    queryClient.invalidateQueries("bookmark");
  }

  async function likeClick(event: any) {
    event.stopPropagation();
    event.preventDefault();
    setLikeStatus((likeStatus) => !likeStatus);
    setLikedCount(likeStatus ? likedCount - 1 : likedCount + 1);
    setDotsDialog(false);
    await LikeFeed(feedId, type);
    queryClient.invalidateQueries("likes");
  }

  async function ReplyClick(event: any) {
    event.stopPropagation();
    event.preventDefault();
    // setReplyDialog(true)
    setPublishType({ type: "Comment", feed: feed });
    router.push("/publish");
  }

  function handleDelDialog(event: any) {
    event.stopPropagation();
    event.preventDefault();
    setDotsDialog(false);
    setDialog({ isOpen: true, feedId: feedId });
  }

  function handleThreeDotsDialog(event: any) {
    event.stopPropagation();
    event.preventDefault();
    setDotsDialog(!dotsDialog);
  }

  async function delFeed() {
    await DeleteFeedById(dialog.feedId);
    queryClient.invalidateQueries("feeds");
    queryClient.invalidateQueries("bookmark");
    queryClient.invalidateQueries("likes");
    queryClient.invalidateQueries({
      predicate: (query) =>
        ["feeds", "bookmark", "likes"].includes(query.queryKey[0]),
    });
    setDialog({ isOpen: false, feedId: dialog.feedId });
  }

  const reactItems = [
    {
      name: "Reply",
      icon: <LuReply />,
      number: commentCount,
      settings: false,
      action: ReplyClick,
    },
    {
      name: "Repost",
      icon: <BiRepost />,
      color: "text-green-500",
      settings: false,
    },
    {
      name: "Favorite",
      icon: <FaStar />,
      action: likeClick,
      color: likeStatus ? "text-yellow-500" : "text-gray-500",
      number: likedCount,
      settings: true,
    },
    {
      name: "Bookmark",
      icon: <FaBookmark />,
      action: bookmarkClick,
      color: bookmarkStatus ? "text-red-500" : "text-gray-500",
      settings: true,
    },
    {
      name: "Others",
      icon: dotsDialog ? <IoIosClose /> : <IoIosMore />,
      action: handleThreeDotsDialog,
      settings: false,
    },
  ];

  return (
    <div className="flex w-full justify-evenly gap-10 space-x-2 px-4 py-2 text-xl">
      {/* <ToastContainer /> */}
      {reactItems.map((item) => (
        <div className="relative" key={item.name}>
          <button
            className="flex flex-col items-center text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={(e) => item.action && item.action(e)}
            aria-label={item.name}
          >
            <span className={`${item.color} flex items-center gap-1 text-xl`}>
              {item.icon} {item?.number && item?.number > 0 ? item?.number : ""}
            </span>
          </button>
          {dotsDialog && item.name === "Others" && (
            <div
              ref={dialogRef}
              className="fixed mt-1 flex flex-col gap-1 border border-gray-300 bg-white p-2 text-left"
            >
              {reactItems
                .filter((item) => item.settings !== false)
                .map((dotBtn, index) => {
                  return (
                    <button
                      key={index}
                      className="text-left"
                      onClick={dotBtn.action}
                    >
                      {dotBtn.name}
                    </button>
                  );
                })}
              {/* TODO add copy link */}
              {/* <button className="text-left text-red-500 hover:bg-gray-400">
                Copy Link
              </button> */}
              {isDeletable && (
                <button
                  className="text-left text-red-500 hover:bg-gray-400"
                  onClick={(e) => handleDelDialog(e)}
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      ))}
      {dialog.isOpen && dialog.feedId === feedId && (
        <ConfirmDialog
          dialog={dialog}
          setDialog={setDialog}
          dialogAction={delFeed}
        />
      )}
    </div>
  );
}

export default Reaction;
