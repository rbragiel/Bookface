import { S3 } from "aws-sdk";

const endpoint = "fra1.digitaloceanspaces.com";

const storage = new S3({
  endpoint,
  accessKeyId: process.env.SPACES_KEY,
  secretAccessKey: process.env.SPACES_SECRET,
});

const Bucket = "chat-app-to";

export { storage, Bucket };
