import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { z } from "zod";

const userSchema = z.object({
  username: z.string().min(1, { message: "Username is Required" }).max(30),
  email: z
    .string()
    .min(1, { message: "Email is Required" })
    .email("Invalid Email"),
  password: z.string().min(1, { message: "Password is Required" }),
});

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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = userSchema.parse(body);

    const existingEmail = await db.user.findUnique({
      where: { email: email },
    });

    if (existingEmail) {
      return NextResponse.json(
        {
          user: null,
          message: "User with this email already exists",
        },
        { status: 409 }
      );
    }

    const existingUsername = await db.user.findUnique({
      where: { username: username },
    });

    if (existingUsername) {
      return NextResponse.json(
        {
          user: null,
          message: "User with this username already exists",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const { password: newPw, ...rest } = newUser;

    return NextResponse.json(
      {
        user: rest,
        message: "User successfully created",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unsuccessful",
      },
      { status: 500 }
    );
  }
}
