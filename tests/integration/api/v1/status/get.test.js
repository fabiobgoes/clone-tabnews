// implementar:
//   versão do postgres
//   conexões máximas
//   conexões usadas

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parseUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parseUpdatedAt);

  const dependencies_database = responseBody.dependencies.database;
  expect(dependencies_database.version).toEqual(expect.any(Number));
  expect(dependencies_database.version).toEqual(16.2);
  expect(dependencies_database.max_connections).toEqual(expect.any(Number));
  expect(dependencies_database.opened_connections).toEqual(expect.any(Number));
  expect(dependencies_database.opened_connections).toEqual(1);
});
