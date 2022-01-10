import {
  Entity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";

@Entity()
export class Message {
  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  content!: string;

  @Property()
  userId!: string;

  @Property()
  roomId!: string;

  @Property()
  createdAt = new Date();

  @Property({ nullable: true })
  image?: string;

  constructor({
    content,
    userId,
    roomId,
    image,
  }: {
    content: string;
    userId: string;
    roomId: string;
    image?: string;
  }) {
    this.content = content;
    this.userId = userId;
    this.roomId = roomId;
    this.image = image;
  }
}
