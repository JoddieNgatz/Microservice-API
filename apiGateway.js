const express = require('express');
const app = express();
const router = require('./routers/router');
const cors = require('cors');

const corsOptions = {
    origin: "http://localhost:8081"//for frontEnd
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: "Simple API Gateway" });
})

app.use(router)

const PORT = process.env.PORT || 8079;

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT} at http://localhost:${PORT}`);
});