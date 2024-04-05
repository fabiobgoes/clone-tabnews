import database from "infra/database.js";

// implementar:
//   versão do postgres
//   conexões máximas
//   conexões usadas
async function status(request, response) {
  const updatedAt = new Date().toISOString();
  response.status(200).json({
    updated_at: updatedAt,
  });
}

export default status;
