import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'pg';

// PostgreSQL connection configuration
const connectionConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: 'episodic',
  ssl: true,
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const series = searchParams.get('series');

  if (!series) {
    return NextResponse.json(
      { error: 'Missing required parameter: series' },
      { status: 400 }
    );
  }

  const client = new Client(connectionConfig);

  try {
    await client.connect();

    // Execute the main dashboard query
    const dashboardResult = await client.query(
      `SELECT "fnBuildDashboardJSON"($1);`,
      [series]
    );
    const main_dashboard_data = dashboardResult.rows[0];

    // Execute review scores per week by series query
    const reviewScoresSeriesResult = await client.query(
      `SELECT "fnAverageReviewScorePerWeekBySeries"($1);`,
      [series]
    );
    const review_scores_per_week_by_series = reviewScoresSeriesResult.rows.map(
      (result: any) =>
        result['fnAverageReviewScorePerWeekBySeries']
          .replace(/[()]/g, '')
          .split(',')
    );

    // Execute review scores per week query
    const reviewScoresResult = await client.query(
      `SELECT "fnAverageReviewScorePerWeek"();`
    );
    const review_scores_per_week = reviewScoresResult.rows.map((result: any) =>
      result['fnAverageReviewScorePerWeek']
        .replace(/[()]/g, '')
        .split(',')
    );

    const dashboard_data = {
      main_dashboard_data: main_dashboard_data[0],
      review_scores_per_week_by_series,
      review_scores_per_week,
    };

    return NextResponse.json(dashboard_data, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `SQL Error: ${errorMessage}` },
      { status: 500 }
    );
  } finally {
    await client.end();
  }
}
