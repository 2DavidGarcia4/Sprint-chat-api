import { PassportStatic } from "passport";
import { jwtSecret } from "../config";
import usersControllers from "../users/users.controllers";

import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'

export default (passport: PassportStatic) => {
  const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: jwtSecret 
  }

  passport.use(
    new Strategy(options, async (decoded, done) => {
      try {
        const response = await usersControllers.getUserById(decoded.id)
        if(!response){
          return done(null, false)
        }

        return done(null, decoded)

      } catch (error) {
        return done(error, false)
      }
    })
  )
}