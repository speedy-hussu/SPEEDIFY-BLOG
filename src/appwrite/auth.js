import config from "../config/config";
import { Client, Account, ID } from "appwrite";
export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)
      .setProject(config.appWriteProjectId);
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (e) {
      console.log(e);
    }
  }
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (e) {
      console.log(e);
    }
  }
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (e) {
      console.log(e);
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (e) {
      console.log(e);
    }
    return null;
  }
}
const authService = new AuthService();
export default authService;
