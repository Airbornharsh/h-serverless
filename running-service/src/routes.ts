import { Router } from 'express'
import {
  APIHandler,
  ApiDeleteHandler,
  ApiGetHandler,
  ApiPatchHandler,
  ApiPostHandler,
  ApiPutHandler,
} from './controllers/cont1'

const router = Router()

router.get('/', (req, res) => {
  res.send('Running')
})

router.post('*', ApiPostHandler)
router.put('*', ApiPutHandler)
router.get('*', ApiGetHandler)
router.patch('*', ApiPatchHandler)
router.delete('*', ApiDeleteHandler)

export default router
