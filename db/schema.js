const { sqliteTable, integer, text } = require("drizzle-orm/sqlite-core");
const { sql } = require("drizzle-orm");

const todos = sqliteTable("todos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  body: text("body"),
  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  done: integer("done").notNull().default(0),
});

module.exports = { todos };
