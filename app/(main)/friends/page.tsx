import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { UserProgress } from "@/components/user-progress";
import {
  getTopTenUsers,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";

const LeaderboardPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();
  const leaderboardData = getTopTenUsers();

  const [userProgress, userSubscription, leaderboard] = await Promise.all([
    userProgressData,
    userSubscriptionData,
    leaderboardData,
  ]);

  if (!userProgress || !userProgress.activeCourse) redirect("/courses");

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
        {!isPro && <Promo />}
      </StickyWrapper>

      <FeedWrapper>
        <div className="flex w-full flex-col items-center">
          <Image
            src="/add-user-friends.svg"
            alt="add friends"
            height={90}
            width={90}
          />

          <h1 className="my-6 text-center text-2xl font-bold text-neutral-800">
            Other Users
          </h1>
          <p className="mb-6 text-center text-lg text-muted-foreground">
            Add friends to your community.
          </p>
          <Separator className="mb-4 h-0.5 rounded-full" />
          <div className="relative mb-6 w-full max-w-md">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full rounded-lg border border-gray-300 p-3 pl-10 text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-lime-600"
              disabled
            />
            <svg
              className="absolute left-3 top-3 h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm8.485-1.485L21 21"
              />
            </svg>
          </div>
          {leaderboard
          .filter(userProgress => userProgress.userId !== "user_2pdVw3sPsfQDi5aA3SRSjRXwyHW")
          .map((userProgress, i) => (
            <div
              key={userProgress.userId}
              className="flex w-full items-center rounded-xl p-2 px-4 hover:bg-gray-200/50"
            >
              <p className="mr-4 font-bold text-lime-700">{i + 1}</p>

              <Avatar className="ml-3 mr-6 h-12 w-12 border bg-green-500">
                <AvatarImage
                  src={userProgress.userImageSrc}
                  className="object-cover"
                />
              </Avatar>

              <p className="flex-1 font-bold text-neutral-800">
                {userProgress.userName}
              </p>
              <p className="text-muted-foreground">Add Friend +</p>
            </div>
          ))}
        </div>
      </FeedWrapper>
    </div>
  );
};

export default LeaderboardPage;
