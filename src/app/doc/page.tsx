import { getApiDocs } from "../../../lib/swagger";
import ReactSwagger from '../../components/react-swagger';
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db"; // Ensure this points to your Prisma client
import { redirect } from 'next/navigation';

export default async function IndexPage() {
    const { userId } = auth();

    if (!userId) {
        console.log("Redirecting to home page: User is not authenticated");
        redirect('/');
        return null;
    }

    console.log(`Authenticated user ID: ${userId}`);

    // Find the authenticated user
    const authUser = await prisma.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!authUser) {
        console.log(`Redirecting to home page: User with ID ${userId} not found in the database`);
        redirect('/');
        return null;
    }

    if (authUser.role !== 'ADMIN') {
        console.log(`Redirecting to home page: User with ID ${userId} does not have ADMIN role`);
        redirect('/');
        return null;
    }

    const spec = await getApiDocs();
    return (
        <section 
            className="w-screen bg-white text-black absolute top-0 left-0"
        >
            <ReactSwagger spec={spec} />
        </section>
    );
}