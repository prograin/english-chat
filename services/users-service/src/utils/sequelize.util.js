import sequelize from "../config/postgres.js";
export async function removeAllContraints(table) {
  const constraints = await sequelize.query(
    `SELECT conname 
    FROM pg_constraint 
    WHERE conrelid = '${table}'::regclass;`,
    { type: sequelize.QueryTypes.SELECT }
  );

  for (const c of constraints) {
    try {
      await sequelize.query(`ALTER TABLE ${table} DROP CONSTRAINT "${c.conname}"`);
      console.log(`Dropped constraint: ${c.conname}`);
    } catch (err) {
      console.error(`Failed to drop constraint ${c.conname}:`, err.message);
    }
  }
}
