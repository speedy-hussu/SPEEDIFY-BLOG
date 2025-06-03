const config = {
  appWriteUrl: String(
    (import.meta.env.VITE_APPWRITE_URL = "https://fra.cloud.appwrite.io/v1")
  ),
  appWriteProjectId: String(
    (import.meta.env.VITE_APPWRITE_PROJECT_ID = "682cbd47002276e46a04")
  ),
  appWriteDatabaseId: String(
    (import.meta.env.VITE_APPWRITE_DATABASE_ID = "682cbde7003de4774f49")
  ),

  appWriteCollectionId: String(
    (import.meta.env.VITE_APPWRITE_COLLECTION_ID = "682cbe0a00300200c58f")
  ),
  appWriteBucketId: String(
    (import.meta.env.VITE_APPWRITE_BUCKET_ID = "682cbf81000882969578")
  ),
};
export default config;
