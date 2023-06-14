import express from 'express'
import authMiddleware from '../middlewares/auth.middleware'
import passport from 'passport'
import friendsServices from './friends.services'

const router = express()

authMiddleware(passport)

router.route('/')
.get(
  passport.authenticate('jwt', { session: false }),
  friendsServices.getFriends
)

router.patch('/add/:userId',
  passport.authenticate('jwt', { session: false }),
  friendsServices.addFriend
)

router.patch('/remove/:userId',
  passport.authenticate('jwt', { session: false }),
  friendsServices.removeFriend
)


router.route('/requests')
.get(
  passport.authenticate('jwt', { session: false }),
  friendsServices.getFriendsRequests
)
.post(
  passport.authenticate('jwt', { session: false }),
  friendsServices.createFriendsRequest
)

router.delete('/requests/:id', 
  passport.authenticate('jwt', { session: false }),
  friendsServices.deleteFriendsRequest
)

export default router