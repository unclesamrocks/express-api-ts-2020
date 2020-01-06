import { body } from 'express-validator'

export const editValidator = body('productId').isMongoId()
