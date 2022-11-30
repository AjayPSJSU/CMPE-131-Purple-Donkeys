import sys
import json
import re
import random

#add a joke function, date function, hobby, -> random like
def random_string():
    random_list = [
        "Please try writing something more descriptive.",
        "Oh! It appears you wrote something I don't understand yet",
        "Do you mind trying to rephrase that?",
        "I'm terribly sorry, I didn't quite catch that.",
        "I can't answer that yet, please try asking something else."
    ]

    list_count = len(random_list)
    random_item = random.randrange(list_count)

    return random_list[random_item]

"""
out = "you said " + str(sys.argv[1])
print(out) 
"""

#in json file, switch to camel case, get rid of type, maybe add an or_words field, where things can be this or that to by pass required
#also, or keyword -> the latter as a response if no built personality "hmm idk ask me a this or that"/yesno. save responses to or questions to build a personality for the bot. also display bot personality

#also, make users pay after a month. the whole shtick is build a bot
#save preference, and on login, get the preferences from db, call a function and make a map with thing->like_value
# Load JSON data


# Store JSON data
response_data = ""

with open("BotResponses.json") as botResponses:
    #print("loaded bot responses successfully")
    response_data = json.load(botResponses)   #just responses
bestScore = -999999
bestResponse = ""

def getResponse(input_string):  #just input
    
    split_message = re.split(r'\s+|[,;?!.-]\s*', input_string.lower()) #just message
    score_list = []

    # Check all the responses
    for response in response_data:  
        response_score = 0
        required_score = 0
        required_words = response["required_words"]

        # Check if there are any required words
        if required_words:
            for word in split_message:
                if word in required_words:
                    required_score += 1

        # Amount of required words should match the required score
        if required_score == len(required_words):   #need to match required words
            # print(required_score == len(required_words))
            # Check each word the user has typed
            for word in split_message:
                # If the word is in the response, add to the score
                if word in response["user_input"]:
                    response_score += 1
        #where to check or words?
        # Add score to list
        if (response_score > bestScore):
            score_list.append(response_score)
            #bestScore = response_score
            #best_response = response["bot_response"]
        # Debugging: Find the best phrase
        # print(response_score, response["user_input"])

    # Find the best response and return it if they're not all 0
    #print(score_list)
    best_response = max(score_list)
    response_index = score_list.index(best_response)

    # Check if input is empty
    if input_string == "":
        return "Please type something so we can chat :("

    # If there is no good response, return a random one.
    if best_response != 0:
        return response_data[response_index]["bot_response"]

    return random_string()
    
print(getResponse(str(sys.argv[1])))