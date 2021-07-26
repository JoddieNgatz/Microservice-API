const express = require('express');

const cors = require('cors');

const app = express();

// var corsOptions = {
//     origin: "http://localhost:8081"
// };

const db = require('./models/');
db.mongoose.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connected to database');
}).catch(err => {
    console.log('problem connecting to db', err); process.exit;
});

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ mesaage: "API working Welcome." });

})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT} at http://localhost:${PORT}`);
})