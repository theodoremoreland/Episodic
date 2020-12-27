import json
import re
import pg8000

from config import (user, password, host, port)

connection = pg8000.connect(user=user,
                            password=password,
                            host=host,
                            port=int(port),
                            database="episodic")

cursor = connection.cursor()

# Print PostgreSQL version
cursor.execute("SELECT version();")
record = cursor.fetchone()
print("You are connected to - ", record, "\n")

def lambda_handler(event, context):
    statusCode = 200
    series = event["queryStringParameters"]['series']
    
    try:
        cursor.execute(f"""
            SELECT "fnBuildDashboardJSON"('{series}');
        """)
        results = cursor.fetchone()
        main_dashboard_data = results[0]

        cursor.execute(f"""
            SELECT "fnAverageReviewScorePerWeekBySeries"('{series}');
        """)
        results = cursor.fetchall()
        review_scores_per_week_by_series = [result[0].replace("(", "").replace(")", "").split(",") for result in results]

        cursor.execute(f"""
            SELECT "fnAverageReviewScorePerWeek"();
        """)
        results = cursor.fetchall()
        review_scores_per_week = [result[0].replace("(", "").replace(")", "").split(",") for result in results]
        
        dashboard_data = {
            "main_dashboard_data": main_dashboard_data
            , "review_scores_per_week_by_series": review_scores_per_week_by_series
            , "review_scores_per_week": review_scores_per_week
        }
    except Exception as e:
        dashboard_data = f"SQL Error: {e}"
        statusCode = 500
    
    return {
        'statusCode': statusCode,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(dashboard_data)
    }