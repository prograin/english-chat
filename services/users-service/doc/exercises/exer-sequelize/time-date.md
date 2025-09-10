✅ Summary Table

| Option  | Column Type        | Stored Value          | Notes                                                |
| ------- | ------------------ | --------------------- | ---------------------------------------------------- |
| JS Date | `DataTypes.DATE`   | `new Date(unix*1000)` | Works with Sequelize & Joi.date()                    |
| UNIX    | `DataTypes.BIGINT` | `unix` (seconds)      | Lightweight, numeric comparison, less human-readable |
