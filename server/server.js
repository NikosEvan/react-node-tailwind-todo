const express = require('express');
const app = express();
const cors = require('cors');

// const corsOptions = {
//     origin: ['http://localhost:5173'],
// };

app.use(cors({
    origin: 'http://localhost:5173' // επετρεψε μονο requests απο αυτη τη διευθυνση
  }));

app.get("/api", (req, res) => {
    res.json({fruits: ["apple", "strawberry", "orange"]});
});

app.listen(8080, () => {
    console.log("Server is running on port http://localhost:8080/api");
});