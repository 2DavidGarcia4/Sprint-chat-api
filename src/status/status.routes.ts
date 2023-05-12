import express from 'express'
import statusServices from './status.services'
import passport from 'passport'
import authMiddleware from '../middlewares/auth.middleware'

const router = express()

authMiddleware(passport)

router.route('/uses')
.get(
  passport.authenticate('jwt', { session: false }),
  statusServices.getUserUses
)
.post(
  passport.authenticate('jwt', { session: false }),
  statusServices.handleUse
)

router.get('/uses/all',
  passport.authenticate('jwt', { session: false }),
  statusServices.getAllUses
)

router.route('/sessions')
.get(
  passport.authenticate('jwt', { session: false }),
  statusServices.getUserSessions
)
.post(
  passport.authenticate('jwt', { session: false }),
  statusServices.addNewSession
)
.patch(
  passport.authenticate('jwt', { session: false }),
  statusServices.closeSession
)

router.get('/sessions/all',
  passport.authenticate('jwt', { session: false }),
  statusServices.getAllSessions
)

export default router