
const express = require("express");

const app = express();


const db = require('./model');
 db.mongoose.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('connected to database');
    }).catch(err => {
        console.log('problem connecting to db', err); process.exit;
    });


app.use(express.urlencoded({ extended: true }));

app.use(express.json());

//Routes
require('./routes/profile.router')(app);

app.get("/", (req, res) => {
    res.status(200).json({ mesaage: "API working Welcome." });

});

//PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT} at http://localhost:${PORT}`);
})