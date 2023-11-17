import express from 'express';
import { UserController } from './user.controller';
const router = express.Router();

router.post(
  '/create-user',UserController.createUser
);
router.get(
    '/',UserController.getAllFromDB
  );

  router.get(
    '/:id',UserController.getById
  );
  router.patch(
    '/:id',UserController.updateIntoDB
  );
  router.delete(
    '/:id',UserController.deleteFromDB
  );



export const UserRoutes = router;
