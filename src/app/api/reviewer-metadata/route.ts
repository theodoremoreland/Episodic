import { NextRequest, NextResponse } from "next/server";
import { Client } from "pg";

const connectionConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  database: "episodic",
  ssl: true,
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "Missing required parameter: email" },
      { status: 400 },
    );
  }

  const client = new Client(connectionConfig);

  try {
    await client.connect();

    const result = await client.query(
      `SELECT metadata::jsonb FROM public.reviewer_metadata 
       WHERE active = true AND reviewer_id = 
       (SELECT reviewer_id FROM public.reviewers WHERE emailaddress = $1);`,
      [email],
    );

    const metadata = result.rows.length > 0 ? result.rows[0].metadata : null;

    return NextResponse.json(metadata, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `SQL Error: ${errorMessage}` },
      { status: 500 },
    );
  } finally {
    await client.end();
  }
}
