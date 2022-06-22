//Imported the mongoose module and constants file
import mongoose from "mongoose";
import constants from "../config/constants";
/*
  database function to connect to mongoDB
  takes in the DB URI  in the .connect method
*/
function databse() {
  mongoose.connect(constants.DATABASE_URI!, {})
    .then(() => {
      console.log("::: Connected to database");
    })
    .catch((err: Error) => {
      console.log("There was an error, could not connect to database.");
    });
}

export default databse;
