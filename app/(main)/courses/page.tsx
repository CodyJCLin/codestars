import { getCourses, getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";

import { List } from "./personalPrep";
import { Li } from "./playOthers"
import { Promo } from "@/components/promo";

const CoursesPage = async () => {
  const coursesData = getCourses();
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [courses, userProgress, userSubscription] = await Promise.all([
    coursesData,
    userProgressData,
    userSubscriptionData,
  ]);

  if (!userProgress || !userProgress.activeCourse) redirect("/courses");

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="mx-auto h-full max-w-[912px] px-3">
      <h1 className="text-2xl font-bold text-neutral-700">Personal Prep</h1>

      <List courses={courses} activeCourseId={userProgress?.activeCourseId} />

      <h1 className="text-2xl font-bold text-neutral-700 mt-8 mb-8">Play Against Others</h1>

      {isPro && <Li courses={courses} activeCourseId={userProgress?.activeCourseId} />}
      {!isPro && <Promo/>}
    </div>
  );
};

export default CoursesPage;
