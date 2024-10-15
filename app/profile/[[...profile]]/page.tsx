import { UserProfile } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

const Profile = async () => {
  const { userId } = auth();
  const isAuth = !!userId;
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const loggedInUser = await prisma.user.findUnique({
    where: {clerkUserId: user.id},
  });
  if (!loggedInUser) {
    await prisma.user.create({
      data: {
        clerkUserId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });
  }


  if (!isAuth) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <h1 className="text-2xl">{user?.username}</h1>
      <UserProfile />
    </div>
  );
};

export default Profile;
