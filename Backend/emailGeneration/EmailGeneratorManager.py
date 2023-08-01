import openai

openai.api_key  = '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'

def get_completion(prompt, model="gpt-3.5-turbo"):
    messages = [{"role": "user", "content": prompt}]
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0.5, # this is the degree of randomness of the model's output
    )
    return response.choices[0].message['content']

def remove_null_or_empty_values(dictionary):
    return {key: value for key, value in dictionary.items() if value is not None and value != ""}


# filtered_dict = remove_null_or_empty_values(sample_dict)
# print(filtered_dict)

# Attributes={"Product Description":"This is Boat brand, product is Boat Rockerz","Email Tone":"Excitement"}
# #Personal_Information={"Name":"Manoj","Age_Range":"30-40","hobbies":"Traveller, singing, Reading","language":"English"}
# Personal_Information={'title': 'Mr', 'first_name': 'Steve', 'middle_initial': 'R', 'last_name': 'Edgerly', 'address': '8700 West Ln Spc 126', 'city': 'Stockton', 'state': 'CA', 'zipcode': 95210, 'countycode': 77, 'county': 'SAN JOAQUIN', 'age_range': '65 - 69', 'income_range': 'Under $20,000', 'potential_investor': 'Likely Investor', 'home_owner': 'Yes', 'marital_status': 'Single', 'ethnicity': 'English', 'language': 'English', 'gender': 'Male', 'estimated_household_income': 'Under $20,000', 'housing_type': 'Trailer Court', 'estimated_home_value': '$1 - $24,999', 'year_home_built': 1975, 'mail_order_purchase': 'Golf                        Car Buff                    Computer                    Health/Fitness              Books And Music             Finance/Investment          Sweepstakes/Gambling        Apparel', 'actual_age': 68, 'birth_month': 'October', 'number_of_children': 0, 'veterans': 'No', 'home_size': 0, 'health': 'General Health & Exercise, Fitness', 'motor_interest': 'Auto Racing Enthusiast', 'politics': 'Politically Liberal', 'purchase_behavior': 'Catalog Shopper', 'technology_entertainment': 'Internet User, Personal Computers, Internet Access'}
 



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


# response = get_completion(prompt)
# print(response)
