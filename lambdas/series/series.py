import json

def lambda_handler(event, context):
    series = {
        
       'series' : [
            'Dragon Ball Z'
            , 'JuJutsu Kaisen'
            , 'Attack on Titan'
            , 'Fire Force'
        ]
    }
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(series)
    }