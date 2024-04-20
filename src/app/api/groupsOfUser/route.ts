import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { z } from "zod";
import { Users } from "lucide-react";

const userSchema = z.object({
    email: z
    .string()
    .min(1, { message: "Email is Required" })
    .email("Invalid Email"),
});

export async function POST(req: Request) {
  try {
    
    const body = await req.json();
    const { email } = userSchema.parse(body);

    // Query to fetch group information and related events

    const groupsOfUser = await db.user.findFirst({
        where: {email : email},
        select: { 
          userGroups: {
            select: {
              eventID: true // Select only the groupID field from userGroups
            }
          }
        }
    });

    var groupIDs: number[] = [];
    if (groupsOfUser) {
      groupIDs = groupsOfUser.userGroups.map(userGroup => userGroup.eventID);
    }
    else {
      console.log(groupIDs, "did not return");
    }

    const groupWithEvents = await db.group.findMany({
      where: { 
        groupID: {in: groupIDs}
      },
      include: { event: true } // Include the related event
    });
  
    return NextResponse.json(groupWithEvents, { status: 200 });
  }
    catch (error) {
    console.log("Error in post");
  }
}