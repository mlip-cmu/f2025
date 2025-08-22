# Lab 1: Calling, Building, and Securing APIs
In homework I1 you will use third-party LLM APIs, and in the group project you will develop your own APIs. In this lab you will experiment with both: connecting to one such LLM's (Gemini) API, and providing your own API endpoint. 
To receive credit for this lab, show your work to the TA during recitation.

## Deliverables
- [ ] Retrieve an API Key for Gemini and implement the call to the Gemini API to have the LLM analyze the image in some way. 
- [ ] Run the API endpoint with the Gemini API call implemented and demonstrate that it works using an example invocation.
- [ ] Commit your code without committing your credentials. Explain to the TA why hard-coding credentials is a bad idea, and explain any remedial steps you might take should credentials accidentally be leaked. 

## Getting started
Clone the starter code from this Git repository: https://github.com/KaushikKoirala/mlip-api-lab

The code implements a flask web application that receives API requests to analyze an image and return information about the image. To analyze the image and return information about this image, you should implement a call to the [Gemini API](https://ai.google.dev/gemini-api/docs). We use the Gemini Developer API and its provided [Python libraries](https://pypi.org/project/google-genai/) to abstract the lower level protocol details when making the API calls. 

Install the dependencies in the `requirements.txt` file with pip or similar. Replace the API key with your own in [analyze.py](./analyze.py). To set up the flask server, just run `python3 app.py`. The system should try to analyze an example image and report the results when you send a POST request with an attached binary of the image to http://localhost:3000/api/v1/analyze

## Generate a Gemini API Key
1. Sign into your Google Account and navigate to https://aistudio.google.com/apikey

2. Generate an API key (it's free)

3. Update the code in [analyze.py](./analyze.py) with the API key retrieved from Gemini and test it.

## Secure your Credentials
The starter code hardcodes credentials in the code. This is a bad practice. 

Research and discuss best practices, such as never hard-code credentials, never commit credentials to Git, rotate secrets regularly, encrypt your secrets at rest/in-transit if possible, practice least-access privilege on machines where your credentials are stored as environment variables or within local files.

Rewrite the code to load credentials from a file or an environment variable and commit the code without the credentials to GitHub.

## Implement the call to the Gemini API
Read the [Gemini API docs](https://ai.google.dev/gemini-api/docs/text-generation) and implement code in the `get_llm_response` function in [analyze.py](./analyze.py) to analyze the image in some way using the Gemini LLM. We will leave how you analyze and extract information about the image up to you but a couple of  options may include: 

1. Image Captioning - Coming up with a caption or some other equivalent form (e.g., haiku, poem, limerick) to describe the image.
2. Object Detection - Counting the number of objects generally or specifically (e.g., number of trees) in an image

Feel free to get creative! The input images you use to test your API and the call to the LLM are entirely up to you.

## Calling your own API
The starter code comes with a flask server that serves the website at http://localhost:3000/ but also exposes an API endpoint at http://localhost:3000/api/v1/analyze accepting a POST request expecting the raw binary data of the image to analyze in the payload.

Identify how to call your own API with the image binary as part of the payload using a tool like [curl](https://curl.se/docs/manpage.html#--data-binary) or [Postman](https://learning.postman.com/docs/sending-requests/create-requests/parameters/#binary-data).

Optionally extend the API or document it with [Swagger](https://swagger.io).

## Additional resources 
- [Redhat article on API](https://www.redhat.com/en/topics/api/what-are-application-programming-interfaces)
- [Google GenAI SDK Documentation](https://googleapis.github.io/python-genai/)
- [API Design Best Practices](https://blog.stoplight.io/crud-api-design?_ga=2.223919515.1813989671.1674077556-1488117179.1674077556)
- [API Endpoint Best Practices](https://www.telerik.com/blogs/7-tips-building-good-web-api)
- The file [mlip-api-lab-collection.json](./mlip-api-lab-collection.json) has a sample request to test calls to your API with Postman.
