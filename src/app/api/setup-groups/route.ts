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

export async function GET() {
    try {
      const events = await db.event.findMany({
          select: {
            eventID: true,
            title: true,
          },
        },
      );
    
      return NextResponse.json(events, { status: 200 });
    }
      catch (error) {
      console.log(error);
    }
  }