import passport from "passport";
import { RequestHandler } from "express";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { Request } from "express";

const clientID = process.env.GOOGLE_CLIENT_ID!
const clientSecret = process.env.GOOGLE_CLIENT_SECRET!
export const googleAuthStrategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID,
        clientSecret,
        callbackURL: "http://localhost:3000/auth/api/session/oauth/google",
        passReqToCallback: true,
      },
      function (
        req: Request,
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (error: any, user?: any, info?: any) => void
      ) {
        req.user = {
          email: profile.emails?.[0]?.value || "No email available",
          username: profile.displayName,
          picture: profile._json.picture,
        };
        return done(null, profile);
      }
    )
  );
};
