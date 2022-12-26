import { type NextApiRequest, type NextApiResponse } from "next";
import Pusher from "pusher";

import { env } from "../../env/server.mjs";


const message = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req)
  const { message } = JSON.parse(req.body);

  const pusher = new Pusher({
    appId: env.PUSHER_APP_ID,
    key: env.PUSHER_KEY,
    secret: env.PUSHER_SECRET,
    cluster: env.PUSHER_CLUSTER,
    useTLS: true
  });
  
  pusher.trigger("chat-app", "message", message);

  res.status(200);
};

export default message;
