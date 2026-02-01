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

export async function POST(request: NextRequest) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { Email } = body;

  if (!Email) {
    return NextResponse.json(
      { error: "Missing required field: Email" },
      { status: 400 },
    );
  }

  const client = new Client(connectionConfig);

  try {
    await client.connect();

    await client.query("BEGIN TRANSACTION;");

    await client.query(`SELECT "fnReviewerMetadataInsert"($1::jsonb, $2);`, [
      JSON.stringify(body),
      Email,
    ]);

    await client.query("COMMIT;");

    return NextResponse.json("Success", { status: 201 });
  } catch (error) {
    await client.query("ROLLBACK;").catch(() => {});
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Reviewer metadata submission error:", error);
    return NextResponse.json(
      { error: `SQL ERROR: ${errorMessage}` },
      { status: 500 },
    );
  } finally {
    await client.end();
  }
}
