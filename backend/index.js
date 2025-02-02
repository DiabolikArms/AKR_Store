const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoute.js");
const productRoutes = require("./routes/productRoute.js");
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();

const app = express();
mongoose.connect(process.env.URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
);

mongoose.connection.once("open", () => console.log('Now connected to the cloud.'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.listen(process.env.PORT || 4000, () => {
  console.log(`API is now online on the port ${process.env.PORT || 4000}`);
});

app.use("/users", userRoutes);
app.use("/products", productRoutes);