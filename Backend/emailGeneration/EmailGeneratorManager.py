import openai
from dotenv import load_dotenv
load_dotenv() 
import os
openai.api_key  = str(os.getenv('OPEN_AI_API_KEY'))

def get_completion(prompt, model="gpt-3.5-turbo"):
    messages = [{"role": "user", "content": prompt}]
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0.5, 
    )
    return response.choices[0].message['content']

def remove_null_or_empty_values(dictionary):
    return {key: value for key, value in dictionary.items() if value is not None and value != ""}

def responseGenerator(personal_information,Attributes):
    temporary = remove_null_or_empty_values(personal_information)
    prompt = f"""your objective is to compose a concise, personalized \
email using the provided information. 

Please follow these guidelines:\
Before generating entire email, first check product description under Attributes and analyze product description.\
Check that the product description provided below is in a meaningful english or a brand name \
that already exist or not and if does not exist then don't follow the below instruction and just print "This product does not exist"
1. Use the attributes and personal information delimited in triple backticks for dynamic content.\
2. Check the language under Personal Information, if available, translate the email from english to given language\
3. Compose a compelling email that aligns with the given email tone\
and product under attributes. Different email tones are:\
Excitement: Generate enthusiasm and anticipation around a new product launch or upcoming sale.
Personalized: Tailor the email to the recipient's preferences or previous purchases, making them feel valued.
Informative: Provide detailed information about the product's features, benefits, and how it solves a problem.
Urgency: Create a sense of urgency by emphasizing limited quantities, time-limited offers, or exclusive deals.
Social Proof: Showcase positive reviews, testimonials, or user-generated content to build trust and credibility.
Storytelling: Engage the reader by sharing a compelling narrative or success story related to the product.
Exclusive: Offer special discounts, promotions, or access to exclusive content for email subscribers only.
Educational: Share valuable tips, guides, or tutorials related to the product's use or industry insights.
Interactive: Encourage engagement through interactive elements like polls, quizzes, or interactive product demos.
Humorous: Inject humor and playfulness into the email to entertain and create a memorable impression.\

4. Strictly, Keep the content within 250 characters.\
5. Utilize as many fields under personal information as possible in combination to create an engaging \
email but don't show any sensitive personal information in email but you must print person's name. \
6. If you come across any irrelevant fields under personal information, unrelated to the product \
or unsuitable for the email, please omit them. Prioritize the recipient's name \
and relevant details to ensure a meaningful email. \
7. Remember to respect privacy guidelines and focus on engaging the recipient \
with a personalized message. \

    
Attributes:```{Attributes}```\


Personal Information:```{temporary}```\


"""
    return get_completion(prompt)
