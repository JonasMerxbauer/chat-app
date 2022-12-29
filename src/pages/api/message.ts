import { type NextApiRequest, type NextApiResponse } from "next";
import Pusher from "pusher";
import { prisma } from "../../server/db/client";

import { env } from "../../env/server.mjs";


const message = async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>(async resolve => {
    switch (req.method) {
      case "GET": {
        
        const messages = await prisma.message.findMany({
          include: {
            user: true
          }
        });
        res.status(200).json(messages);
        break;
      }
      case "POST": {

        const message = JSON.parse(req.body);

        const pusher = new Pusher({
          appId: env.PUSHER_APP_ID,
          key: env.PUSHER_KEY,
          secret: env.PUSHER_SECRET,
          cluster: env.PUSHER_CLUSTER,
          useTLS: true
        });
        
        pusher.trigger("chat-app", "message", message);

        const newMessage = await prisma.message.create({
          data: {
            body: message.message,
            timestamp: message.timestamp,
            user: {
              connectOrCreate: {
                where: {
                  name: message.user.username
                },
                create: {
                  name: message.user.username
                }
              }
            },
          }
        });

        res.status(200).json(newMessage);
        break;
      }
    }
  res.status(200).end();
  return resolve()
  })
};

export default message;
