# gemini.py
import os
import time
import google.generativeai as genai
from google.api_core.exceptions import (
    ResourceExhausted, InternalServerError
)

# Configure the API key from environment variable
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# AI Model Configuration
generation_config = {
    "temperature": 1.0,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 2000,
    "response_mime_type": "text/plain",
}

main_model = genai.GenerativeModel(
    model_name="gemini-1.5-flash-002",
    generation_config=generation_config,
    system_instruction="""
        You are the world's best salesperson and a business analyst. Your job is to identify potential communities to target for advertisement.
    """
)

mainChat = main_model.start_chat(history=[], enable_automatic_function_calling=False)
retries = 0

def call_gemini(productName: str, productDescription: str, productAdditional: str = "No Additional Information to Provide"):
    global retries, mainChat

    if retries >= 3:
        retries = 0
        return "An unexpected error occurred. Please try again later."

    model_prompt = f"""
    You are trying to sell a {productName}. Given the following information, identify at least three potential communities to target for advertisement:

    ### Product Name:
    {productName}

    ### Product Description:
    {productDescription}

    ### Additional Information (Optional):
    {productAdditional}

    ### Instructions:
    Step 1. Identify at least three very specific potential communities to target for advertisement. Be as specific as possible when naming communities to target. For each community, include a short justification for why this specific community.
    Step 2. For each of your targeted communities, identify the optimal means of advertisement (either text or image, or both).
    Step 3.
        a. If creating a textual advertisement, generate a full-length text that can be directly used.
        b. If creating a visual advertisement (image), generate a prompt for an AI image generator.

    ### Formatting Instructions:
    - Follow the sample output as closely as possible.
    - After outputting step 1, print "BREAK HERE" to separate sections.
    """

    try:
        startTime = time.time()
        response = mainChat.send_message(model_prompt)
        endTime = time.time()

        print(f'Gemini responded in {round(endTime - startTime, 2)} seconds')
        return response.text

    except (ResourceExhausted, InternalServerError) as e:
        retries += 1
        print(f'Error encountered: {e}. Retrying... ({retries}/3)')
        time.sleep(1)
        return call_gemini(productName, productDescription, productAdditional)
    except Exception as e:
        print(f'Unknown error: {e}')
        return "An unexpected error occurred while contacting Gemini."
