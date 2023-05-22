import express from 'express'
import userStatusServices from './userStatus.services'
import passport from 'passport'
import authMiddleware from '../middlewares/auth.middleware'

const router = express()

authMiddleware(passport)

router.route('/:id')
.get(
  passport.authenticate('jwt', { session: false }),
  userStatusServices.getUserStatus
)
.patch(
  passport.authenticate('jwt', { session: false }),
  userStatusServices.updateUserStatus
)

export default router