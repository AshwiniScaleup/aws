// server.js

const express = require("express");
const searchRoutes = require("./routers/searchRoutes"); // Import the search routes

const app = express();
const port = 4000;

// Use the router for search-related requests
app.use("/api", searchRoutes);

app.get("/test",(req,res)=>{
  res.send("welcome")
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
