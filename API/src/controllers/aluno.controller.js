const db = require("../config/database");

// ==> Método responsável por criar um novo 'Professor':

exports.createAluno = async (req, res) => {
  const { curso, ingresso, ra, nome} = req.body;

  if (curso == null || ingresso == null || ra == null || nome == null) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }
  const { rows } = await db.query(
    "INSERT INTO aluno (curso, ingresso, ra, nome) VALUES ($1, $2, $3, $4)",
    [curso, ingresso, ra, nome]
  );

  res.status(201).send({
    message: "Aluno added successfully!",
    body: {
      aluno: { curso, ingresso, ra, nome }
    },
  });
};