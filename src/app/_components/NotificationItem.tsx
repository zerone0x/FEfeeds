import { FormatTime } from "../_utils/FormatData";
// const ActionEnum = Object.freeze({
//   LIKE: "like",
//   COMMENT: "comment",
//   SHARE: "share",
//   FOLLOW: "follow",
//   BOOKMARK: "bookmark",
// });
function NotificationItem({ notification }) {
  const { sender, receiver, content, createdAt, type, action, status } =
    notification;
  return (
    <>
      {/* {action="like" && } */}
      <p>
        {sender.name} sent you a {type} {content?.content} with {action} on{" "}
        {FormatTime(createdAt)}
      </p>
    </>
  );
}

export default NotificationItem;