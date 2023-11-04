const express = require("express")
const app = express()
const cors = require("cors")
const fileUpload = require("express-fileupload")
const bodyParser = require('body-parser');
const filyalRouter = require('./routes/filyalRouter.js');
const categoryRouter = require('./routes/categoryRouter.js');
const filyal_imageRouter = require('./routes/filyal_imageRouter.js');



app.use(fileUpload())
app.use(cors())
app.use(express.static('./media'))

app.use(bodyParser.json());


app.use('/api', filyalRouter);
app.use('/api', categoryRouter);
app.use('/api', filyal_imageRouter);






app.listen(5000, () => {
    console.log("Localhost is Running");
})
