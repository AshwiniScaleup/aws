// const axios = require('axios');
// const Joi = require('joi');

// // // Your Google API key
// const googleApiKey = 'AIzaSyBNv69bV2LkyOM7ZOvwRBcrbSgwNj4mq1Y';

// // // Function to validate a venue using the Places API
// // const validateVenue = async (venueName) => {
// //   const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`;
// //   const params = {
// //     input: venueName,
// //     inputtype: 'textquery',
// //     fields: 'place_id,name,formatted_address',
// //     key: googleApiKey
// //   };

// //   try {
// //     const response = await axios.get(url, { params });
// //     console.log('Response:', response.data);

// //     // const candidates = response.data;
// //     const candidates = response.data.candidates;
// //     if (candidates.length > 0) {
// //       return candidates[0];
// //     } else {
// //       throw new Error('No matching venue found');
// //     }
// //   } catch (error) {
// //     console.error('Error validating venue:', error);
// //     throw error;
// //   }
// // };

// // // Example usage
// // validateVenue('music concert').then(venue => {
// //   // console.log('Validated Venue:', venue);
// // }).catch(err => {
// //   console.error('Error:', err);
// // });




// // // const axios = require('axios');
// let ticketmasterApiKey = "FxBLTr9KUgXHZ5wzaVMXDIGfM9MGzGWT"

// // const fetchEvents = async (keyword) => {
// //     const url = `https://app.ticketmaster.com/discovery/v2/events.json`;
// //     const params = {
// //       keyword: keyword,
// //       apikey: ticketmasterApiKey
// //     };
  
// //     try {
// //       const response = await axios.get(url, { params });
  
// //       if (response.data._embedded && response.data._embedded.events) {
// //         return response.data._embedded.events;
// //       } else {
// //         console.log('No events found for the keyword:', keyword);
// //         return []; 
// //       }
// //     } catch (error) {
// //       console.error('Error fetching events:', error);
// //       throw error;
// //     }
// //   };
  
  
// //   fetchEvents('music concert').then(events => {
// //     console.log(events,444)
// //   }).catch(err => {
// //     console.error('Error:', err);
// //   });

// // // const AWS = require('aws-sdk');

// // // const comprehend = new AWS.Comprehend({
// // //     accessKeyId: 'your_access_key',          
// // //     secretAccessKey: 'your_secret_key',      
// // //     region: 'us-east-1'                      
// // //   });
// // // const text = "Amazon Comprehend is a natural language processing service that uses machine learning to find insights and relationships in text.";

// // // const params = {
// // //   LanguageCode: 'en',
// // //   Text: text
// // // };

// // // comprehend.detectKeyPhrases(params, (err, data) => {
// // //   if (err) {
// // //     console.error('Error:', err);
// // //   } else {
// // //     console.log('Key Phrases:', data.KeyPhrases.map(phrase => phrase.Text));
// // //   }
// // // });




// // const searchFunction = async(search)=>{
// //   try {
// //     // for ticketmaster 




// //   } catch (error) {
    
// //   }
// // }





// const fetchVenues = async (keyword) => {
//   const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`;
//   const params = {
//     input: keyword,
//     inputtype: 'textquery',
//     fields: 'place_id,name,formatted_address',
//     key: googleApiKey
//   };

//   const response = await axios.get(url, { params });
//   return response.data.candidates || [];
// };

// // Function to fetch events from Ticketmaster API
// const fetchEvents = async (keyword) => {
//   const url = `https://app.ticketmaster.com/discovery/v2/events.json`;
//   const params = {
//     keyword: keyword,
//     apikey: ticketmasterApiKey
//   };

//   const response = await axios.get(url, { params });
//   return response.data._embedded ? response.data._embedded.events : [];
// };

// // Joi schema for validation
// const schema = Joi.object({
//   keyword: Joi.string().min(3).max(100).required().messages({
//     'string.min': 'Keyword should be at least 3 characters long.',
//     'string.max': 'Keyword should not exceed 100 characters.',
//     'any.required': 'Keyword is required.'
//   }),
//   page: Joi.number().integer().min(1).default(1).messages({
//     'number.min': 'Page must be greater than or equal to 1.',
//     'number.integer': 'Page must be an integer.'
//   })
// });

// // API route to search and merge results
// app.get('/search', async (req, res) => {
//   const { error, value } = schema.validate(req.query);

//   if (error) {
//     return res.status(400).json({
//       error: error.details[0].message
//     });
//   }

//   const { keyword, page } = value;
//   const pageSize = 10;

//   try {
//     const venues = await fetchVenues(keyword);
//     const events = await fetchEvents(keyword);

//     // Merge and paginate results
//     const mergedResults = [...venues, ...events];
//     const totalResults = mergedResults.length;
//     const paginatedResults = mergedResults.slice((page - 1) * pageSize, page * pageSize);

//     res.json({
//       keyword: keyword,
//       totalResults,
//       page,
//       pageSize,
//       totalPages: Math.ceil(totalResults / pageSize),
//       results: paginatedResults
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch results', details: error.message });
//   }
// });


