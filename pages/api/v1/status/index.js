import database from "infra/database.js";

// implementar:
//   versão do postgres
//   conexões máximas
//   conexões usadas

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const databaseVersion = await database.query(
    `select
    current_setting('server_version') as server_version,
    current_setting('max_connections') as max_connections;
    `,
  );

  const databaseName = process.env.POSTGRES_DB;
  const database_current_connections = await database.query({
    text: "select count(*) as current_connections from pg_stat_activity where state = 'active' and datname = $1;",
    values: [databaseName],
  });

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: parseFloat(databaseVersion.rows[0].server_version),
        max_connections: parseInt(databaseVersion.rows[0].max_connections),
        opened_connections: parseInt(
          database_current_connections.rows[0].current_connections,
        ),
      },
    },
  });
  // console.log(databaseVersion.rows[0]);
  console.log(response.json);
}

export default status;
