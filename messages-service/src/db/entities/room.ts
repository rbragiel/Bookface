import {
  Entity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { EntityManager } from "@mikro-orm/core";

@Entity()
export class Room {
  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  userIdOne!: string;

  @Property()
  userIdTwo!: string;

  constructor(userIdOne: string, userIdTwo: string) {
    this.userIdOne = userIdOne;
    this.userIdTwo = userIdTwo;
  }
}

export const getRoomByUserIds = (
  em: EntityManager,
  userIdOne: string,
  userIdTwo: string
) => {
  return em.findOne(Room, {
    $or: [
      { userIdOne, userIdTwo },
      { userIdOne: userIdTwo, userIdTwo: userIdOne },
    ],
  });
};
