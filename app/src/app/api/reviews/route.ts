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
        review::jsonb
      FROM public.reviews
      WHERE dateentered IN (
        SELECT MAX(dateentered) FROM public.reviews 
        GROUP BY enteredby_id, series_id, TO_DATE(review ->> 'Week Ending', 'YYYY-MM-DD')
      );
    `);

    const results = result.rows.map((row: any) => row.review);

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
