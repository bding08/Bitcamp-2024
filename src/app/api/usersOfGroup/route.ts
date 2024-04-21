import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { z } from "zod";
import { getServerSession } from "next-auth"

const groupSchema = z.object({
  groupID: z.number(),
});

export async function POST(req: Request) {

    const body = await req.json();
    const { groupID } = groupSchema.parse(body);

    try {
        const currentUsers = await db.group.findUnique({
            where: {
                groupID: groupID,
            },
            include: {
                users: true,
            },
        });

        // Extracting only the users array from the currentUsers object
        const usersArray = currentUsers ? currentUsers.users : [];

        return NextResponse.json(usersArray, { status: 200 });
    }catch (error) {
        return NextResponse.json({ status: 501 });
    }
}