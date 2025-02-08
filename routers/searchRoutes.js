// routes/searchRoutes.js

const express = require("express");
const axios = require("axios");
const Joi = require("joi");

// Your API keys
const googleApiKey = "AIzaSyBNv69bV2LkyOM7ZOvwRBcrbSgwNj4mq1Y";
const ticketmasterApiKey = "FxBLTr9KUgXHZ5wzaVMXDIGfM9MGzGWT";

const router = express.Router();

// Function to fetch venues from Google Places API
const fetchVenues = async (keyword) => {
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`;
  const params = {
    input: keyword,
    inputtype: "textquery",
    fields: "place_id,name,formatted_address",
    key: googleApiKey,
  };

  const response = await axios.get(url, { params });
  return response.data.candidates || [];
};

// Function to fetch events from Ticketmaster API
const fetchEvents = async (keyword) => {
  const url = `https://app.ticketmaster.com/discovery/v2/events.json`;
  const params = {
    keyword: keyword,
    apikey: ticketmasterApiKey,
  };

  const response = await axios.get(url, { params });
  return response.data._embedded ? response.data._embedded.events : [];
};

// Joi schema for validation
const schema = Joi.object({
  keyword: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.min": "Keyword should be at least 3 characters long.",
      "string.max": "Keyword should not exceed 100 characters.",
      "any.required": "Keyword is required.",
    }),
  page: Joi.number()
    .integer()
    .min(1)
    .default(1)
    .messages({
      "number.min": "Page must be greater than or equal to 1.",
      "number.integer": "Page must be an integer.",
    }),
});

// API route to search and merge results
router.get("/search", async (req, res) => {
  const { error, value } = schema.validate(req.query);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  const { keyword, page } = value;
  const pageSize = 10;

  try {
    const venues = await fetchVenues(keyword);
    const events = await fetchEvents(keyword);

    // Merge and paginate results
    const mergedResults = [...venues, ...events];
    const totalResults = mergedResults.length;
    const paginatedResults = mergedResults.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

    res.json({
      keyword: keyword,
      totalResults,
      page,
      pageSize,
      totalPages: Math.ceil(totalResults / pageSize),
      results: paginatedResults,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch results", details: error.message });
  }
});

module.exports = router;



async function getData(keyword) {
    try {
      const venues = await fetchVenues(keyword);
      const events = await fetchEvents(keyword);
  
      // Map venues to the desired format
      const formattedVenues = venues.map(venue => ({
        name: venue.name,
        address: venue.formatted_address,
        latitude: venue.geometry?.location.lat || 'Latitude not available',
        longitude: venue.geometry?.location.lng || 'Longitude not available'
      }));
  
      // Map events to the desired format
      const formattedEvents = events.map(event => ({
        name: event.name,
        address: event._embedded?.venues[0]?.address?.line1 || 'Address not available',
        latitude: event._embedded?.venues[0]?.location?.latitude || 'Latitude not available',
        longitude: event._embedded?.venues[0]?.location?.longitude || 'Longitude not available'
      }));
  
      // Merge results
      const mergedResults = [...formattedVenues, ...formattedEvents];
  
      return mergedResults;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  
  // Example of usage
  (async () => {
    try {
      const data = await getData("music");
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  })();
  
  
  