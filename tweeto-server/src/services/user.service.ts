import axios from "axios";
import { prismaClient } from "../clients/db";
import JWTService from "./jwt";

interface GoogleTokenResult {
  iss?: string; // Issuer
  azp?: string; // Authorized party
  aud?: string; // Audience
  sub?: string; // Subject (user ID)
  email?: string; // User email
  email_verified?: string; // Email verification status (could be boolean, but in string form here)
  nbf?: string; // Not before (timestamp)
  name?: string; // User full name
  picture?: string; // User profile picture URL
  given_name?: string; // User first name
  family_name?: string; // User last name
  iat?: string; // Issued at (timestamp)
  exp?: string; // Expiry (timestamp)
  jti?: string; // JWT ID
  alg?: string; // Algorithm used (RS256)
  kid?: string; // Key ID
  typ?: string; // Type (JWT)
}

class UserService {
  public static async verifyGoogleAuthToken(token: string) {
    const goggleToken = token;
    const goggleOAuthUrl = new URL("https://oauth2.googleapis.com/tokeninfo");
    goggleOAuthUrl.searchParams.set("id_token", goggleToken);
    const { data } = await axios.get<GoogleTokenResult>(
      goggleOAuthUrl.toString(),
      {
        responseType: "json",
      }
    );

    const user = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      await prismaClient.user.create({
        data: {
          email: data.email || "",
          firstName: data.given_name || "",
          lastName: data.family_name || " ",
          profileImageURL: data.picture,
        },
      });
    }

    const userInDb = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!userInDb) {
      throw new Error("User With Email Not Found");
    }

    const userToken = await JWTService.genrateTokenForUser(userInDb);

    return userToken;
  }

  public static getUserById(id: string) {
    return prismaClient.user.findUnique({ where: { id } });
  }
}

export default UserService;
