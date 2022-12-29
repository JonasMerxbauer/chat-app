import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";


const userId = async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>(async resolve => {
    switch (req.method) {
      case "GET": {
        const {userId} = req.query
        if (typeof userId === "string") {
          const user = await prisma.user.findFirst({
              where: {
                  name: userId,
              }
          });
          res.status(200).json(user);
          break;
        }
        res.status(200);
        break;
      }
    }
  res.status(200).end();
  return resolve()
  })
};

export default userId;
