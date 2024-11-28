const pool = require('../config/database'); // Configuração do pool do banco

exports.registerExam = async (req, res) => {
  const { sigla, ano, semestre, resolvida_ou_nao, ra, idprofessor, url_prova } = req.body;
  // Verificação de preenchimento de todos os campos
  if (sigla == null || ano == null || semestre == null || ra ==null || idprofessor == null || url_prova == null) {
    return res.status(400).json({ error: 'Todos os campos devem ser preenchidos!' });
  }
  console.log(sigla+idprofessor);
  try {
    // Verificação se o aluno existe na tabela aluno
    const alunoQuery = 'SELECT * FROM aluno WHERE ra = $1';
    const alunoResult = await pool.query(alunoQuery, [ra]);

    if (alunoResult.rowCount === 0) {
      return res.status(400).json({ error: 'Aluno não registrado! Prova não registrada!' });
    }
    //Obter o maior valor atual de idprova na tabela prova
    const maxIdQuery = 'SELECT COALESCE(MAX(idprova), 0) AS max_id FROM prova';
    const maxIdResult = await pool.query(maxIdQuery);
    const newIdProva = maxIdResult.rows[0].max_id + 1;
    // Inserção na tabela prova com o novo idprova
    const insertQuery = `
      INSERT INTO prova (sigla, ano, semestre, resolvida_ou_nao, ra, idprofessor, url_prova, idprova)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
    `;
    const values = [sigla, ano, semestre, resolvida_ou_nao, ra, idprofessor, url_prova, newIdProva];
    const insertResult = await pool.query(insertQuery, values);

    res.status(201).json({ message: 'Prova registrada com sucesso!', prova: insertResult.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao registrar a prova.' });
  }
};
