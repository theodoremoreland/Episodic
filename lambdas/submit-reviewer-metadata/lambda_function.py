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
    statusCode = 201
    body = event["body"]
    body = body.replace("'", "''") # Single quotes get duplicated so they are escaped in postgres query.
    body = json.loads(body)
    email = body["Email"]
    results = ""
    
    print(json.dumps(body))
    
    try:
        cursor.execute('BEGIN TRANSACTION;')
        results = cursor.execute(f"""
            SELECT "fnReviewerMetadataInsert"('{json.dumps(body)}'::jsonb, '{email}');
            """)
        cursor.execute('COMMIT;')
        results = "Success"
    except Exception as e:
        cursor.execute('ROLLBACK;')
        print(results)
        results = f"SQL ERROR: {e}"
        print(results)
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