import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/authentication';

export default async (req, res, next) => {
  const headerAuth = req.headers.authorization;

  if (!headerAuth) {
    res
      .status(401)
      .json({ message: 'Token de autenticação não foi fornecido.' });
  }
  const [, token] = headerAuth.split(' ');

  try {
    const decodedToken = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decodedToken.id;

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token não é valido.' });
  }
};
