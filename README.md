# Pikky Assignment - Goa Food Data API

Hey there! This is a simple Node.js API I built for an assignment. It serves up information about delicious Goan foods, where you can find them, their nutrition facts, and any stockouts.

## What it does

The API provides a single endpoint that gives you comprehensive food data for Goa. It includes:

- List of authentic Goan dishes (seafood, vegetarian, non-veg)
- Locations where each food is available
- Nutritional information
- Stockout alerts
- Availability status

It simulates real-world delays to make it feel more authentic.

## Getting Started

First, clone this repo and install the dependencies:

```bash
npm install
```

Then, start the server:

```bash
node server.js
```

The server will run on port 5000 (or whatever you set in .env).

## API Usage

Hit the `/food-data` endpoint:

```bash
curl http://localhost:5000/food-data
```

You'll get a JSON response with all the food data, including availability at different locations in Goa.

## Data Structure

The response includes foods with their details, nutrition, stockout info, and where they're available.

Check out `mockdata.js` for the sample data.

## Tech Stack

- Node.js
- Express
- CORS for cross-origin requests
- dotenv for environment variables

That's it! Pretty straightforward. If you have questions, feel free to reach out.

And the response from the api will come after two minutes in postman, as one function has delay of 2 minutes

I have put an screenshot of response coming from the backend in the postman
