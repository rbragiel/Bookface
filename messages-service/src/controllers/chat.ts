import { QueryOrder } from "@mikro-orm/core";
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Router } from "express";
import { auth } from "../middleware/auth";
import { DI } from "../index";
import { getRoomByUserIds } from "../db/entities/room";
import { asyncHandler } from "../middleware/asyncHandler";
import { HttpError } from "../common/errors";
import { HttpErrorStatusCode, HttpStatusCode } from "../common/constants";

const router = Router();

const messagesOffset = 15;
const messagesLimit = 16;

router.get(
  "/:receiverId/:skip",
  auth,
  asyncHandler(async (req, res, next) => {
    const { receiverId, skip } = req.params;
    const { userId } = req.user!;

    const room = await getRoomByUserIds(DI.em, userId, receiverId);

    if (!room) {
      return next(
        new HttpError(
          "There is no such room for those users",
          HttpErrorStatusCode.BAD_REQUEST
        )
      );
    }

    const offset = (parseInt(skip) || 0) * messagesOffset;

    const messages = await DI.messageRepository.find(
      { roomId: room.id },
      {
        limit: messagesLimit,
        offset,
        fields: ["createdAt", "content", "userId", "image"],
        orderBy: { createdAt: QueryOrder.DESC },
      }
    );

    res.status(HttpStatusCode.OK).json({
      messages: messages.slice(0, messagesOffset),
      hasMore: messages.length === messagesLimit,
    });
  })
);

export { router as ChatController };
