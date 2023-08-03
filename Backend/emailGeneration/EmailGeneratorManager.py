import openai
from dotenv import load_dotenv
load_dotenv() 
import os
import json

openai.api_key  = str(os.getenv('OPEN_AI_API_KEY'))

def get_completion(prompt, index,model="gpt-3.5-turbo",):
    messages = [
        {"role":"system","content":"You are an expert in writing personalized emails for product marketing."},
        {"role": "user", "content": prompt}
        ]
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0.5, 
        n=5
    )
     
    if(index>0 and response.choices[0].message['content'] =="Please, enter a valid product description." ):
        raise ValueError("Sorry, you've attempted multiple times. Please try with a different input this time.")

    if(response.choices[0].message['content'] =="Please, enter a valid product description."):
        raise ValueError("Please, enter a valid product description.")
    
    return json.loads(response.choices[index].message['content'])

def remove_null_or_empty_values(dictionary):
    return {key: value for key, value in dictionary.items() if value is not None and value != ""}

def responseGenerator(personal_information,Attributes,index):
    personal_information = remove_null_or_empty_values(personal_information)
    del personal_information["language"]

    prompt = f"""your objective is to compose a concise, personalized \
email with subject using the provided information. 
Before generating email,
    i. first check product description under Attributes and analyze product description.\
    ii. Given a product description in one word, treat the input word as case insensitive, check if it corresponds to an existing product or brand name. Please only consider nouns and noun phrases as valid product descriptions and exclude adjectives, adverbs, and verbs from the response."\
    iii. Given a product description in sentences, verify that the description pertains to a specific product and does not contain any irrelevant information beyond the product description.\
    iv. If any of ii or iii condition is not satisfying then don't follow below guidelines and just print "Please, Enter a valid product description."\

Follow the guidelines below:\
1. Generate a short email with maximum 2 lines in each paragraph with maximum 3 paragraphs.
2. Use the "Attributes" and "Personal Information" delimited in triple backticks for generating dynamic content in email.\
3. Attributes section is provided by Product owner and Personal information is of a target person.\
4. Compose a compelling email that aligns with the given Product Description, email tone and Email tone description under attributes.\
5. Feel free to use emojis or other Unicode characters to add emphasis or express emotions in the email.\
6. Strictly, Do not include product descriptions, features, or any special offers, deals, or discounts in the email, unless explicitly mentioned in the Product Description.\
7. Utilize as many fields under "Personal Information" as possible in combination to create an engaging \
email.\
8. If you come across any irrelevant fields under "Personal Information", unrelated to the product \
or unsuitable for the email, please omit them. Prioritize the recipient's name \
and relevant details to ensure a meaningful email. \
9. Remember you are prohibited from including PII data fields present in Personal Information under Attributes in email \
and focus on engaging the recipient with a personalized message. \
10. Generate email in json format, with "subject","regards" and each paragraph in different key like "para1", "para2",etc. 

  
Attributes:```{Attributes}```\

Personal Information:```{personal_information}```\

"""
    
    return get_completion(prompt,index)
