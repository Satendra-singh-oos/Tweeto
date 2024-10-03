import { User } from "@prisma/client";

import JWT from "jsonwebtoken";
import { JWTUser } from "../interface";
class JWTService {
  public static async genrateTokenForUser(user: User) {
    const payload: JWTUser = {
      id: user?.id,
      email: user?.email,
    };

    const token = JWT.sign(payload, process.env.JWT_SECRET || "");
    return token;
  }

  public static decodeToken(token: string) {
    try {
      return JWT.verify(token, process.env.JWT_SECRET as string) as JWTUser;
    } catch (error) {
      return null;
    }
  }
}

export default JWTService;
