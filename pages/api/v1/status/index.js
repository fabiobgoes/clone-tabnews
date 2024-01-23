function status(request, response) {
  response.status(200).json(
    "alunos do curso.dev são pessoas acima " +
    "da média_.");
}

export default status;