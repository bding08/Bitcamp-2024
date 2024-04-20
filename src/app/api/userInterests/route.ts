import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { z } from "zod";

const interestSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is Required" })
    .email("Invalid Email"),
  interests: z.array(z.string()),
});

const interestGetSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is Required" })
    .email("Invalid Email"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = interestGetSchema.parse(body);

    if (!email) {
      return NextResponse.json(
        {
          message: "Can't get email",
        },
        { status: 400 }
      );
    }

    const userInterests = await db.user.findFirst({
      where: {
        email: email,
      },
      select: {
        interests: true,
      },
    });

    return NextResponse.json(
      {
        interests: userInterests?.interests,
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

export async function PUT(req: Request, res: Response) {
  try {
    const body = await req.json();

    console.log(body);

    const { email, interests } = interestSchema.parse(body);

    const updatedUser = await db.user.update({
      where: {
        email: email,
      },
      data: {
        interests: interests,
      },
    });

    return NextResponse.json(
      {
        // user: rest,
        message: "Interests successfully created",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        // user: rest,
        message: "Interests unsuccessfully created",
      },
      { status: 500 }
    );
  }
}
