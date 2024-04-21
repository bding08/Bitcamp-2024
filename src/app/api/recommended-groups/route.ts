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

const recommendationSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is Required" })
    .email("Invalid Email"),
  eventIDs: z.array(z.number()),
});

//gets all events
export async function GET() {
  try {
    const events = await db.event.findMany({
        select: {
          title: true,
          eventID: true,
        },
      },
    );
  
    return NextResponse.json(events, { status: 200 });
  }
    catch (error) {
    console.log(error);
  }
}

export async function POST(req: Request) {
  try {
    
    const body = await req.json();
    const { email} = groupSchema.parse(body);

    // Query to fetch group information and related events

    const groupsOfUser = await db.user.findFirst({
        where: {email : email},
        select: { 
          recGroups: {
            select: {
              groupID: true // Select only the groupID field from userGroups
            }
          }
        }
    });


    var groupIDs: number[] = [];
    if (groupsOfUser) {
      groupIDs = groupsOfUser.recGroups.map(group => group.groupID);
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

export async function PUT(req: Request) {
  try {
    
    const body = await req.json();
    const { email, eventIDs } = recommendationSchema.parse(body);

    // Query to fetch group information and related events

    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Step 2: Find the groups that have the specified eventIDs
    const groups = await db.group.findMany({
      where: {
        eventID: {
          in: eventIDs,
        },
      },
    });

    if (groups.length === 0) {
      throw new Error('No groups found with the specified eventIDs');
    }
    
    const groupsArray = groups.map((item: { groupID: number, eventID: number }) => ({ groupID: item.groupID }));
    
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        recGroups: {
          set: [], // Remove all existing connections
        },
      },
    });

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        recGroups: {
          connect: groupsArray,
        },
      },
    });
  
    return NextResponse.json(groupsArray, { status: 200 });
  }
    catch (error) {
      console.log(error)
      return NextResponse.json({ status: 501 });
  }
}