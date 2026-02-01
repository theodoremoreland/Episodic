import { NextResponse } from "next/server";
import { Client } from "pg";

const connectionConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  database: "episodic",
  ssl: true,
};

export async function GET() {
  const client = new Client(connectionConfig);

  try {
    await client.connect();

    const result = await client.query(`
      SELECT
        jsonb_build_object(
          'question', question,
          'inputType', inputtype,
          'questionGroup', questiongroup,
          'hoverText', hovertext,
          'required', required
        )
      FROM public.review_questions
      WHERE active = true;
    `);

    const results = result.rows.map((row: any) => row.jsonb_build_object);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `SQL ERROR: ${errorMessage}` },
      { status: 500 },
    );
  } finally {
    await client.end();
  }
}
