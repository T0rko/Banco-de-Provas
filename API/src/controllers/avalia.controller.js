const pool = require('../config/database'); // Importa a configuração do banco

// Método para registrar uma avaliação
exports.createAvalia = async (req, res) => {
  const { avaliacao, idProva, ra } = req.body;

  // Verifica se todos os campos estão preenchidos
  if (avaliacao == null || idProva == null || ra == null) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
  }
  console.log(idProva);
  try {
    // Verifica se a prova existe
    const provaQuery = 'SELECT * FROM prova WHERE idprova = $1';
    const provaResult = await pool.query(provaQuery, [idProva]);
    
    if (provaResult.rowCount === 0) {
      return res.status(400).json({ error: 'Prova não encontrada!' });
    }

    // Insere a avaliação na tabela Avalia
    const insertQuery = `
      INSERT INTO avalia (avaliacao, idProva, ra)
      VALUES ($1, $2, $3) RETURNING *
    `;
    const values = [avaliacao, idProva, ra];
    const insertResult = await pool.query(insertQuery, values);

    res.status(201).json({ message: 'Avaliação registrada com sucesso!', avaliacao: insertResult.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao registrar a avaliação.' });
  }
};

// Método para buscar avaliações de uma prova específica
exports.getAvaliacoesByProva = async (req, res) => {
  const { idProva } = req.params;

  try {
    const query = 'SELECT * FROM avalia WHERE idProva = $1';
    const result = await pool.query(query, [idProva]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Nenhuma avaliação encontrada para esta prova.' });
    }

    res.status(200).json({ avaliacoes: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar as avaliações.' });
  }
};
