import express from 'express'
import usersServices from './users.services'
import passport from 'passport'
import authMiddleware from '../middlewares/auth.middleware'

const router = express()

authMiddleware(passport)

router.route('/@me')
.get( 
  passport.authenticate('jwt', { session: false }),
  usersServices.getMyUser, 
)

router.get('/loged', 
  passport.authenticate('jwt', { session: false }),
  usersServices.logedUser, 
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
  usersServices.deleteUser
)

export default router