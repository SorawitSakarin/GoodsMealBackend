const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const menuRoutes = require("./routes/menu-routes");
const suppliersRoutes = require("./routes/suppliers-routes");
const dailyMenuRoutes = require("./routes/daily-menu-routes");
const customerRoutes = require("./routes/customers-routes");
const locationRoutes = require("./routes/location-routes");
const arealeaderRoutes = require("./routes/arealeader-routes");
const HttpError = require("./models/http-error");


const app = express();

app.use(bodyParser.json());

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin',`${process.env.CLIENT_DOMAIN}`);  //allow every domain to access here
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    next();
  });
  
app.use("/api/menus", menuRoutes);
app.use("/api/suppliers", suppliersRoutes);
app.use("/api/dailymenus", dailyMenuRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/arealeaders", arealeaderRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route by HttpError", 404);
  throw error;
});


app.use((error, req, res, next) => {
    // First: Check that the response has already been sent >> Response can not sent more than 1 time
    // if(req.file){
    //   fs.unlink(req.file.path, err =>{
    //     console.log(err);
    //   }); 
    // }
    if (res.headerSent) {
      next(error);
    }
    res.status(error.code || 500);
    console.log(error);
    res.json({ message: error.message || "An unknown error occured" });
  });
  

mongoose
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@clustergoodsmeal.ahcbn.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(process.env.PORT || 4000);
    console.log('Server connected success');
  })
  .catch(err =>{
    console.log(err);
  });
 