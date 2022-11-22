const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://Sahil:Sahil@cluster0.cwcbzq3.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
