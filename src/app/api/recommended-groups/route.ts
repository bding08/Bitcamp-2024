import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { z } from "zod";

const groupSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is Required" })
    .email("Invalid Email"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {email} = groupSchema.parse(body);

    if (!email) {
      return NextResponse.json(
        {
          message: "Can't get email",
        },
        { status: 400 }
      );
    }

    const eventList = await db.user.findMany({
      where: {
        email: email,
      },
      select: {
        recGroups: {
          select: {
            event: true,
          }
        }
      }
    });

    const events = eventList.flatMap(user => user.recGroups.map(group => group.event));

    return NextResponse.json(
      {
        events,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Can't get interests",
      },
      { status: 501 }
    );
  }
}