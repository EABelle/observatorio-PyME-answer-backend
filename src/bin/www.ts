const app = require('../app');
const mongoose = require('mongoose');

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {useNewUrlParser: true})
    .then(() => {
        console.log(`Connected to DB ${MONGODB_URI}`);
        app.default.listen(PORT, () => {
            console.log(`Server is listening on port: ${PORT}`);
        });
    })
    .catch((err: Error) => {
        console.log(err);
    });
