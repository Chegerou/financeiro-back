import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/authentication';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(401).json({ message: 'Usuário não existe.' });
    }
    if (!(await user.verificarSenha(password))) {
      res.status(401).json({ message: 'senha incorreta.' });
    }
    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
