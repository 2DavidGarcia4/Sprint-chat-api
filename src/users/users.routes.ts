import express from 'express'
import usersServices from './users.services'
import passport from 'passport'
import authMiddleware from '../middlewares/auth.middleware'
import userStatusServices from '../userStatus/userStatus.services'

const router = express()

authMiddleware(passport)

router.get('/',
  passport.authenticate('jwt', { session: false }),
  usersServices.getAllUsers, 
)

router.get('/@me', 
  passport.authenticate('jwt', { session: false }),
  usersServices.getMyUser, 
)

router.post('/@me/password',
  passport.authenticate('jwt', { session: false }),
  usersServices.verifyPassword,
)

router.route('/@me/status')
.get(
  passport.authenticate('jwt', { session: false }),
  userStatusServices.getUserStatus
)
.patch(
  passport.authenticate('jwt', { session: false }),
  userStatusServices.updateUserStatus
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

router.get('/@me/blocked', 
  passport.authenticate('jwt', { session: false }),
  usersServices.getBlockedUsers
)

export default router