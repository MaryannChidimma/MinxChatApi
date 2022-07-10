"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Imported the mongoose module and constants file
var mongoose_1 = __importDefault(require("mongoose"));
var constants_1 = __importDefault(require("../config/constants"));
/*
  database function to connect to mongoDB
  takes in the DB URI  in the .connect method
*/
function databse() {
    mongoose_1.default.connect(constants_1.default.DATABASE_URI, {})
        .then(function () {
        console.log("::: Connected to database");
    })
        .catch(function (err) {
        console.log("There was an error, could not connect to database.");
    });
}
exports.default = databse;
