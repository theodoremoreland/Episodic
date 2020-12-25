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
    body = json.loads(event["body"])
    series = body["Series"]
    email = body["Email"]
    
    print(json.dumps(body))
    
    try:
        cursor.execute('BEGIN TRANSACTION;')
        cursor.execute(f"""SELECT "fnReviewInsert"('{json.dumps(body)}'::json, '{email}', '{series}');""")
        cursor.execute('COMMIT;')
        results = "Sucess"
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