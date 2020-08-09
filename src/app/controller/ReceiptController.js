import Receipt from '../models/Receipt';

class ReceiptController {
  async store(req, res) {
    const { destination } = req.file;
    const { valor, dataDePagamento } = req.body;

    if (destination || valor || dataDePagamento) {
      res.status(401).json({ message: 'você deve preencher todos os dados' });
    }

    const receipt = await Receipt.create({
      path: destination,
      valor,
      data_de_pagamento: dataDePagamento,
    });

    res.json(receipt);
  }
}

export default new ReceiptController();
