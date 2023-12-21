// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

// import { handler$AddExam } from "@/modules/commands/AddExam/handler";
// import { AddExam$Params } from "@/modules/commands/AddExam/typing";
// import { handler$EditExam } from "@/modules/commands/EditExam/handler";
// import { EditExam$Params } from "@/modules/commands/EditExam/typing";
// import { handler$GetExam } from "@/modules/commands/GetExam/handler";
// import { GetExam$Params } from "@/modules/commands/GetExam/typing";
// import { handler$LoginStatus } from "@/modules/commands/LoginStatus/handler";
// import { getDb } from "@/modules/mongodb";

// export async function POST(request: NextRequest) {
//   const body = await request.json();
//   const db = await getDb();
//   const cookieList = cookies();
//   const loginStatus = await handler$LoginStatus(db, {
//     token: cookieList.get("token")?.value
//   });
//   if (!loginStatus.loggedIn) {
//     return NextResponse.json({ message: "not logged in" }, { status: 401 });
//   }
//   if (!loginStatus.isAgent) {
//     return NextResponse.json({ message: "not authorized" }, { status: 403 });
//   }
//   const result = await handler$AddExam(AddExam$Params.parse(body), {
//     db,
//     userId: loginStatus.userId
//   });
//   return NextResponse.json(result);
// }

// export async function GET(request: NextRequest) {
//   const db = await getDb();
//   const searchParams = Object.fromEntries(request.nextUrl.searchParams);
//   const params = GetExam$Params.parse(searchParams);

//   const result = await handler$GetExam(db, params);
//   return NextResponse.json(result);
// }

// export async function PUT(request: NextRequest) {
//   const body = await request.json();
//   const db = await getDb();
//   const cookieList = cookies();
//   const loginStatus = await handler$LoginStatus(db, {
//     token: cookieList.get("token")?.value
//   });
//   if (!loginStatus.loggedIn) {
//     return NextResponse.json({ message: "not logged in" }, { status: 401 });
//   }
//   if (!loginStatus.isAgent) {
//     return NextResponse.json({ message: "not authorized" }, { status: 403 });
//   }
//   const result = await handler$EditExam(db, EditExam$Params.parse(body));
//   return NextResponse.json(result);
// }
