import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { number, z } from "zod";

const groupSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is Required" })
    .email("Invalid Email"),
  groupId: number(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {email, groupId} = groupSchema.parse(body);

    if (!email) {
      return NextResponse.json(
        {
          message: "Can't get email",
        },
        { status: 400 }
      );
    }

    const user = await db.user.findFirst({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found"
        },
        { status: 404 }
      );
    }

    const result = await db.$transaction([
      db.user.update({
        where: { email },
        data: {
          userGroups: {
            connect: { groupID: groupId },
          },
          recGroups: {
            disconnect: { groupID: groupId },
          }
        },
      })
    ]);



    return NextResponse.json(
      {
        result,
        message: "Succesfully Added"
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Couldn't update",
      },
      { status: 501 }
    );
  }
}