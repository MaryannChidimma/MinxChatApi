import { NotFoundError } from "../../lib/appError";
import UserModel from "../models/userModel";
import { AUser} from "../interfaces/UserInterfaces"
import constants from "../config/constants";
import { encryptData} from "../utility/dataCrypto"
const { MESSAGES } = constants


class UserServices {
  async addUser(data: AUser) {
    let newUser: any;

      const existingUser = await UserModel.findOne({ email: data.email });
      if (existingUser) throw new NotFoundError(MESSAGES.USER_EXIST);

      newUser = await UserModel.create(data);
      
      // Genrate token
      const token = encryptData( {id: data._id, email: data.email, }, );
      console.log(token)

     let dataToSend = {
      ...newUser._doc,
      token
    };

    // Delete the password field before sending to the backend
    delete dataToSend.password;

    return dataToSend;
  }

  
  
}

export default new UserServices();
