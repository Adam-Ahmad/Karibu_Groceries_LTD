const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const basicAuth = require("express-basic-auth");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Swagger documentation
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "KGL API",
    version: "1.0.0",
    description: "KGL API Documentation",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
};
// Swagger options
const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};
// Swagger authentication
const swaggerAuth = basicAuth({
  users: { admin: "123456" },
  challenge: true,
  realm: "Swagger Documentation",
});
// Swagger specs
const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerAuth, swaggerUi.serve, swaggerUi.setup(specs));

require("dotenv").config();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

// Mongo DB conection
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected Successfuly");
    //   Server Coneection
    app.listen(
      PORT,
      ("/",
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Server Running Successfuly on Port ${PORT}`);
        }
      }),
    );
  })
  .catch((err) => console.log(err));

// Routes
const { route: procurementRoute } = require("./routes/procurement");
const { route: usersRoute } = require("./routes/users");
const { route: cashSalesRoute } = require("./routes/cashSales");
const { route: creditSalesRoute } = require("./routes/creditSales");
const { route: reportRoute } = require("./routes/reports");
const { route: stockRoute } = require("./routes/stock");

app.use(procurementRoute);
app.use(usersRoute);
app.use(cashSalesRoute);
app.use(creditSalesRoute);
app.use(reportRoute);
app.use(stockRoute);
