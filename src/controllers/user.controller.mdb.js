import userModel from "../models/users.model.js";

export class UserController {
  constructor() {}

  async getUsers() {
    try {
      const users = await userModel.find().lean();
      //const users = await userModel.find().explain('executionStats');
      return users;
    } catch (err) {
      return err.message;
    }
  }

  async getUsersPaginated(offset) {
    try {
      return await userModel.paginate(
        { gender: "female" },
        { offset: offset, limit: 100, lean: true }
      );
    } catch (err) {
      return err.message;
    }
  }
}
