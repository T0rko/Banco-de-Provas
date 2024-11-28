const db = require('../config/database');

exports.registerSolution = async (req, res) => {
  const { idprova, idprofessor, url_resposta } = req.body;

  // Verifica se os campos obrigatórios estão preenchidos
  if (!idprova || !idprofessor || !url_resposta) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    // Insere a solução na tabela "resposta"
    const { rows } = await db.query(
      `INSERT INTO resposta (idprova, idprofessor, url_resposta) VALUES ($1, $2, $3) RETURNING *`,
      [idprova, idprofessor, url_resposta]
    );

    res.status(201).json({
      message: 'Solução registrada com sucesso!',
      solution: rows[0],
    });
  } catch (error) {
    console.error('Erro ao registrar solução:', error);
    res.status(500).json({ error: 'Erro ao registrar a solução.' });
  }
};
