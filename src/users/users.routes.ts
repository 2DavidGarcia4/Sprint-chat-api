import express from 'express'
import usersServices from './users.services'
import passport from 'passport'
import authMiddleware from '../middlewares/auth.middleware'
import usersControllers from './users.controllers'

const router = express()

authMiddleware(passport)

router.route('/@me')
.get( 
  passport.authenticate('jwt', { session: false }),
  usersServices.getMyUser, 
)

router.route('/:id')
.get(
  passport.authenticate('jwt', { session: false }),
  usersServices.getUser
)
.patch(
  passport.authenticate('jwt', { session: false }),
  usersServices.updateUser
)
.delete(
  passport.authenticate('jwt', { session: false }),
  usersControllers.deleteUser
)

export default router