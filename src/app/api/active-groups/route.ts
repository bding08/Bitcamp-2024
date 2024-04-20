import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { z } from "zod";

const groupSchema = z.object({
  groupIDs: z.array(z.number()),
});

export async function POST(req: Request) {
  try {
    
    const body = await req.json();
    console.log(body)
    const { groupIDs } = groupSchema.parse(body);

    // Query to fetch group information and related events

    const groupWithEvents = await db.group.findMany({
      where: { 
        groupID: {in: groupIDs}
      },
      include: { event: true } // Include the related event
    });
  
    return NextResponse.json(groupWithEvents, { status: 200 });
  }
    catch (error) {
    console.log(error);
  }
}