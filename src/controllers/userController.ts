import express from "express";
import appResponse from "../../lib/appResponse";
import constants from "../config/constants";
import { passwordHash} from "../utility/dataCrypto"
import userService from "../services/userService";

class UserCtrl {
  async addUser(req: express.Request, res: express.Response) {

    let userData = req.body;
     userData.password = await passwordHash(userData.password)

    const response = await userService.addUser(userData);
    res.status(201).send(appResponse(constants.MESSAGES.USER_CREATED, response));
  }
 
}

export default new UserCtrl();
