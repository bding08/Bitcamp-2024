import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const interestSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is Required" })
    .email("Invalid Email"),
  interests: z.array(z.string()),
});

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
