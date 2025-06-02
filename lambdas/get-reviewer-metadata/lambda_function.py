import json
import pg8000

from config import (user, password, host, port)

connection = pg8000.connect(user=user,
                            password=password,
                            host=host,
                            port=int(port),
                            database="episodic",
                            ssl_context=True)

cursor = connection.cursor()

# Print PostgreSQL version
cursor.execute("SELECT version();")
record = cursor.fetchone()
print("You are connected to - ", record, "\n")

def lambda_handler(event, context):
    statusCode = 200
    email = event["queryStringParameters"]['email']
    
    try:
        cursor.execute(f"SELECT metadata::jsonb FROM public.reviewer_metadata WHERE active = true AND reviewer_id = (SELECT reviewer_id FROM public.reviewers WHERE emailaddress = '{email}');")
        results = cursor.fetchone()
        results = results[0]
    except Exception as e:
        results = f"SQL Error: {e}"
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