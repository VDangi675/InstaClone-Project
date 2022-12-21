const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const postModal = require("./postmodal");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
mongoose.set("strictQuery", false);

app.use(express.json({ limit: "30mb", extended: true }));

app.use(cors());


const mongodb = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@project-1.vmb9zsr.mongodb.net/instagram?retryWrites=true&w=majority`;
//const mongoose = require("mongoose")
mongoose.connect("mongodb://0.0.0.0:27017/instaclone")

// mongoose.connect(
//   mongodb,
//   (data) => {
//     console.log("Successfully connect to db");
//   },
//   (err) => {
//     console.log(err);
//   }
// );

app.get("/data", async (req, res) => {
  try {
    const data = await postModal.find();
    res.send(data)
} catch (e) {
    res.json({ name: "error in loading data" })
}

  //  const data  = await postModal.find()
  //  res.json(data)
  //   // .then((data) => {
  //   //   res.status(200).send({ images: data });
  //   // })
  //   .catch((err) => {
  //     res.status(400).send(err);
  //   });
});

 app.post("/postdata",  async (req, res) => {
  //console.log(req.body);
  var today = new Date();
  var options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    time: "numeric",
  };
  var setday = today.toLocaleDateString("en-US", options);
  console.log(setday);
  try{
    const user = await postModal.create({
      author: req.body.author,
      location: req.body.location,
      image: req.body.image,
      likes: Math.round(Math.random() * 100),
      date: setday,
      description: req.body.description,
    })
    res.json({ok:"send"})
  } catch (e) {
    res.json({ error: e.message })
}
});
// .then((data) => {
    //   res.status(200).send(data);
    // })

app.listen(process.env.PORT || 3002, (err) => {
  if (!err) {
    console.log("Server is started at 3002");
  } else console.log(err);
});