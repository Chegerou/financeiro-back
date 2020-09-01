import fs from 'fs';
import Receipt from '../models/Receipt';

class ReceiptController {
  async store(req, res) {
    const { destination, filename } = req.file;
    const { valor, dataDePagamento } = req.query;

    if (!destination || !valor || !dataDePagamento) {
      res.status(401).json({ message: 'você deve preencher todos os dados' });
    }

    const receipt = await Receipt.create({
      path: destination,
      original_name: filename,
      valor,
      data_de_pagamento: dataDePagamento,
      id_usuario: req.userId,
    });

    res.json(receipt);
  }

  async delete(req, res) {
    const { id } = req.body;

    const imagem = await Receipt.findByPk(id);

    if (!imagem) {
      res
        .status(401)
        .json({ message: 'Imagem não existe no banco para ser deletada.' });
    }
    await fs.unlinkSync(`${imagem.path}/${imagem.original_name}`);
    imagem.destroy();
    return res
      .status(200)
      .json({ message: 'comprovante deletado com sucesso.' });
  }

  async index(req, res) {
    const imagens = await Receipt.findAll({
      where: { id_usuario: req.userId },
    });
    return res.status(200).json({ imagens });
  }
}

export default new ReceiptController();
