const db = require('../config/database');

exports.procurarProva = async (req, res) => {
  const { professor, sigla, ano, semestre } = req.body;
  console.log("oie" + professor);
  // Verificar se pelo menos professor ou sigla foi informado
  if (!professor && !sigla) {
    return res.status(400).json({ error: 'Informe pelo menos o professor ou a sigla.' });
  }

  // Construir a query com os parâmetros dinâmicos
  let query = 'SELECT * FROM prova WHERE 1=1';
  const params = [];

  if (professor) {
    query += ` AND idprofessor = $${params.length + 1}`;
    params.push(professor);
  }

  if (sigla) {
    query += ` AND sigla = $${params.length + 1}`;
    params.push(sigla);
  }

  if (ano) {
    query += ` AND ano = $${params.length + 1}`;
    params.push(ano);
  }

  if (semestre) {
    query += ` AND semestre = $${params.length + 1}`;
    params.push(semestre);
  }


  try {
    // Executar a query no banco de dados
    const { rows } = await db.query(query, params);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Nenhuma prova encontrada com os critérios fornecidos.' });
    }

    res.status(200).json(rows); // Retornar as provas encontradas
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao procurar provas.' });
  }
};
