import EchoItem from "@/app/_components/EchoItem";
import Spinner from "@/app/_components/Spinner";
import { GetAllFeeds, GetFeedById } from "@/app/_services/fetchDataAPI";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const feed = await GetFeedById(params.feedId);
  const feedContent =
    feed && feed.content && feed.content.length > 30
      ? feed.content.slice(30) + "..."
      : feed?.content;
  return { title: `${feed?.user?.name}: "${feedContent}"` };
}

// export async function generateStaticParams() {
//   const feeds = await GetAllFeeds();
//   const paths = feeds.map((feed) => ({
//     params: { feedId: String(feed.id) },
//   }));
//   return paths;
// }

async function page({ params }) {
  const feed = await GetFeedById(params.feedId);
  return (
    <>
      <h3>Post</h3>
      <button>Back</button>
      {feed && (
        <Suspense fallback={<Spinner />}>
          <EchoItem feed={feed} />
        </Suspense>
      )}
    </>
  );
}

export default page;
