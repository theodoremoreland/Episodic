import json
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
    
    try:
        cursor.execute("""
            SELECT
                review::jsonb
            FROM public.reviews
            WHERE dateentered IN (SELECT MAX(dateentered) FROM public.reviews GROUP BY enteredby_id, TO_DATE(review ->> 'Week Ending', 'YYYY-MM-DD'))
            ;	
            """)
        results = cursor.fetchall()
        results = [result[0] for result in results]
    except Exception as e:
        results = e
        statusCode = 500
    
    return {
        'statusCode': statusCode,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(results)
    }