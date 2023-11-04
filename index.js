const express = require("express")
const app = express()
const cors = require("cors")
const fileUpload = require("express-fileupload")
const bodyParser = require('body-parser');
const filyalRouter = require('./routes/filyalRouter.js');
const categoryRouter = require('./routes/categoryRouter.js');
const filyal_imageRouter = require('./routes/filyal_imageRouter.js');
const filyal_markRouter = require('./routes/filyal_markRouter.js');
const mutahasisRouter = require('./routes/mutahasisRouter.js');
const mutahasis_imageRouter = require('./routes/mutahasis_imageRouter.js');
const mutahasis_timeRouter = require('./routes/mutahasis_timeRouter.js');
const userSchemaRouter = require('./routes/userSchemaRouter.js');
const xususiyat_filyalRouter = require('./routes/xususiyat_filyalRouter.js');
const xususiyat_mutahasisRouter = require('./routes/xususiyat_mutahasisRouter.js');
const xususiyatlarRouter = require('./routes/xususiyatlarRouter.js');
const zakazRouter = require('./routes/zakazRouter.js');







app.use(fileUpload())
app.use(cors())
app.use(express.static('./media'))

app.use(bodyParser.json());
app.get('/',(req,res)=>{
    res.send({message:"welcome to our api"})
})

app.use('/api', filyalRouter);
app.use('/api', categoryRouter);
app.use('/api', filyal_imageRouter);
app.use('/api', mutahasisRouter);
app.use('/api', mutahasis_imageRouter);
app.use('/api', mutahasis_timeRouter);
app.use('/api', userSchemaRouter);
app.use('/api', xususiyat_filyalRouter);
app.use('/api', xususiyat_mutahasisRouter);
app.use('/api', xususiyatlarRouter);
app.use('/api', zakazRouter);
app.listen(5001, () => {
    console.log("Localhost is Running");
})
