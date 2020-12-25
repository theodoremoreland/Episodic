import json

def lambda_handler(event, context):
    questions = [
        {
            'question' : 'Email'
            , 'inputType' : 'SingleTextField'
            , 'questionGroup' : ''
            , 'hoverText' : ''
            , 'required' : json.dumps(True)
            , 'active' : json.dumps(True)
        },
        {
            'question' : 'Series'
            , 'inputType' : 'Dropdown'
            , 'questionGroup' : ''
            , 'hoverText' : ''
            , 'required' : json.dumps(True)
            , 'active' : json.dumps(True)
        },
        {
            'question' : 'How would you rate the dialogue (on a scale of 1 to 10)?'
            , 'inputType' : 'DoubleDropdown'
            , 'questionGroup' : 'Anime Vs Manga'
            , 'hoverText' : 'Consider things like whether or not the chracters express distinct viewpoints, quirks, and motivations.'
            , 'required' : json.dumps(False)
            , 'active' : json.dumps(True)
        },
        {
            'question' : 'How would you rate the artwork (on a scale of 1 to 10)?'
            , 'inputType' : 'DoubleDropdown'
            , 'questionGroup' : 'Anime Vs Manga'
            , 'hoverText' : 'Animation and/or illustrations depending on the medium.'
            , 'required' : json.dumps(False)
            , 'active' : json.dumps(True)
        },
        {
            'question' : 'How would you rate the story-telling (on a scale of 1 to 10)?'
            , 'inputType' : 'DoubleDropdown'
            , 'questionGroup' : 'Anime Vs Manga'
            , 'hoverText' : ''
            , 'required' : json.dumps(False)
            , 'active' : json.dumps(True)
        },
        {
            'question' : 'How would you rate the voice acting (on a scale of 1 to 10)?'
            , 'inputType' : 'Dropdown'
            , 'questionGroup' : 'Anime'
            , 'hoverText' : ''
            , 'required' : json.dumps(False)
            , 'active' : json.dumps(True)
        },
        {
            'question' : 'How would you rate the sound and music (on a scale of 1 to 10)?'
            , 'inputType' : 'Dropdown'
            , 'questionGroup' : 'Anime'
            , 'hoverText' : ''
            , 'required' : json.dumps(False)
            , 'active' : json.dumps(True)
        },
        {
            'question' : 'Did this episode live up to your expectations?'
            , 'inputType' : 'Elaborate'
            , 'questionGroup' : 'Hype Train'
            , 'hoverText' : ''
            , 'required' : json.dumps(False)
            , 'active' : json.dumps(True)
        },
        {
            'question' : 'Are you excited for the next episode?'
            , 'inputType' : 'Elaborate'
            , 'questionGroup' : 'Hype Train'
            , 'hoverText' : ''
            , 'required' : json.dumps(False)
            , 'active' : json.dumps(True)
        }
    ]

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(questions)
    }
