// importing required library
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const database = require("./Database/DatabaseConnection");

// initializing express
const app = express();
dotenv.config({ path: "./.env" });
app.use(cors());
// configuring dotenv file for environment variables means it will read the .env file for environment variables and store them in process.env object and it used for security purposes. because it is not recommended to use environment variables in production directly in code.

database();
// example of environment variable how you can use it or access it from .env file
const PORT = process.env.PORT;

// using express.json() middleware for parsing (means it convert JSON string to JavaScript object) JSON data in request body
app.use(express.json());

// importing storemodule routes
// '/storemodule' is the root path means it will be http://localhost:5000/storemodule/apiname for example http://localhost:5000/storemodule/register , http://localhost:5000/storemodule/login
app.use("/storemodule", require("./Routes/StoreRoutes/StoreRegistrationRoutes"));
app.use("/storemodule", require("./Routes/StoreRoutes/StoreProductRoutes"));
app.use("/storemodule", require("./Routes/StoreRoutes/StoreProfileRoutes"));

// importing usermodule routes
// '/usermodule' is the root path means it will be http://localhost:5000/usermodule/apiname for example http://localhost:5000/usermodule/register , http://localhost:5000/usermodule/login
app.use("/usermodule", require("./Routes/UserRoutes/UserRoutes"));

// We have to use listen function in express to start the backend server in specific port number here we have used 5000 port number.
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
