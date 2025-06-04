import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";
export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)
      .setProject(config.appWriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, content, image, status, userId }) {
    try {
      return await this.databases.createDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        ID.unique(),
        {
          title,
          content,
          image,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  async updatePost(DocId, { title, content, image, status, userId }) {
    try {
      return await this.databases.updateDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        DocId,
        {
          title,
          content,
          image,
          status,
          userId,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async deletePost(DocId) {
    try {
      return await this.databases.deleteDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        DocId
      );
    } catch (error) {
      throw e;
    }
  }
  async getPost(DocId) {
    try {
      return await this.databases.getDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        DocId
      );
    } catch (error) {
      throw error;
    }
  }
  async getPosts(query = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        query
      );
    } catch (error) {
      throw error;
    }
  }
  //upload FIle
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appWriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      throw error;
    }
  }
  //delete File
  async deleteFile(id) {
    try {
      return await this.bucket.deleteFile(config.appWriteBucketId, id);
    } catch (error) {
      throw error;
    }
  }
  filePreview(id) {
    return this.bucket.getFileView(config.appWriteBucketId, id);
  }
}
const service = new Service();
export default service;
