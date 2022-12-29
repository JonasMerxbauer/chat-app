import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../server/db/client";


const message = async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>(async resolve => {
    switch (req.method) {
      case "POST": {
        const { username } = JSON.parse(req.body);
        console.log(req);
        const user = await prisma.user.create({
            data: {
                name: username,
            }
        });
        
        res.status(200).json(user);
        break;
      }
    }
  res.status(200).end();
  return resolve()
  })
};

export default message;
