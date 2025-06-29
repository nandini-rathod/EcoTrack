from flask import Flask, request, jsonify
import google.generativeai as palm  # You may need to import this from the correct package/module
import pandas as pd
import numpy as np

app = Flask(__name__)

# Configure the generative AI API key
palm.configure(api_key='AIzaSyATRWBWwqP1AYY1gNJEHvKPKSBWorFABv8')  # Replace 'YOUR_API_KEY' with your actual API key

# List available models and select one that supports text generation
available_models = palm.list_models()
text_generation_models = [m for m in available_models if 'generateText' in m.supported_generation_methods]

# Check if there are any text generation models available
if text_generation_models:
    # Select the first available text generation model (you can modify this selection logic as needed)
    selected_model = text_generation_models[0].name
else:
    # Handle the case where no text generation models are available
    selected_model = None

# Load your data
df = pd.read_csv("datafinal.csv")

# Define emission factors (example values, replace with accurate data)
EMISSION_FACTORS = {
    "Default": {
        "Transportation": 0.40935,  # kgCO2/km
        "Waste": 0.1,  # kgCO2/kg
        "Electricity": 0.0  # Fill in the correct value
    }
}

@app.route('/calculate_recommendations/transportation', methods=['POST'])
def calculate_transportation_recommendations():
    data = request.json  # Get input data from the POST request
    transportation_emissions = data.get("transportation")

    # Calculate personalized recommendations for transportation emissions
    prompt = f"""
        Pretend you are an expert environmentalist and lifestyle analyst.
        I have emissions of {transportation_emissions} tons CO2 per year from transportation.
        Provide detailed actionable suggestions to reduce my carbon footprint related to transportation.
        Make sure to include suggestions and provide a detailed explanation for each recommendation.
        """

    recommendations = generate_recommendations(prompt)

    result = {
        "transportation_recommendations": recommendations
    }

    return jsonify(result)

@app.route('/calculate_recommendations/electricity', methods=['POST'])
def calculate_electricity_recommendations():
    data = request.json  # Get input data from the POST request
    electricity_emissions = data.get("electricity")

    # Calculate personalized recommendations for electricity emissions
    prompt = f"""
        Pretend you are an expert environmentalist and lifestyle analyst.
        I have emissions of {electricity_emissions} tons CO2 per year from electricity.
        Provide detailed actionable suggestions to reduce my carbon footprint related to electricity.
        Make sure to include suggestions and provide a detailed explanation for each recommendation.
        """

    recommendations = generate_recommendations(prompt)

    result = {
        "electricity_recommendations": recommendations
    }

    return jsonify(result)

@app.route('/calculate_recommendations/waste', methods=['POST'])
def calculate_waste_recommendations():
    data = request.json  # Get input data from the POST request
    waste_emissions = data.get("waste")

    # Calculate personalized recommendations for waste emissions
    prompt = f"""
        Pretend you are an expert environmentalist and lifestyle analyst.
        I have emissions of {waste_emissions} tons CO2 per year from waste.
        Provide detailed actionable suggestions to reduce my carbon footprint related to waste.
        Make sure to include suggestions and provide a detailed explanation for each recommendation.
        """

    recommendations = generate_recommendations(prompt)

    result = {
        "waste_recommendations": recommendations
    }

    return jsonify(result)

def generate_recommendations(prompt):
    if selected_model:
        with app.app_context():
            # Start generating the text
            completion = palm.generate_text(
                model=selected_model,
                prompt=prompt,
                temperature=0.1,  # You can adjust the temperature for more diverse responses
                max_output_tokens=1024,  # You can adjust the length of the response
            )

            # Extract the generated text from the completion
            generated_text = completion.result

            return generated_text
    else:
        return "No text generation models are available. Please configure your models."

if __name__ == '__main__':
    app.run(debug=True)