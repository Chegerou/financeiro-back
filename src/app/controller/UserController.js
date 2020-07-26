import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      res
        .status(400)
        .json({ message: 'Já existe um usuário cadstrado com esse email' });
    }

    const { id, name, email } = await User.create(req.body);
    return res.json({ id, name, email });
  }

  async delete(req, res) {
    const user = await User.findByPk(req.userId);

    if (!user) {
      res.status(400).json({
        mensagem: 'O usuário que você está tendo deletar não foi encontrado.',
      });
    }
    return user.destroy();
  }

  async update(req, res) {
    const user = await User.findByPk(req.userId);
    if (!user) {
      res.status(400).json({
        mensagem: 'O usuário que você está tendo atualizar não foi encontrado.',
      });
    }

    const { id, name, email } = await user.update(req.body);

    return res.json({ id, name, email });
  }
}

export default new UserController();
