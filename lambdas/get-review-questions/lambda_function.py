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
        cursor.execute(f"""
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
            """)
        results = cursor.fetchall()
        results = [result[0] for result in results]
    except Exception as e:
        results = f"SQL ERROR: {e}"
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