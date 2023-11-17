import express from 'express';
import { InstallmentRoutes } from '../modules/installment/installment.route';
import { UserRoutes } from '../modules/user/user.route';




const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/installments',
    route: InstallmentRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;