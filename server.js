const express = require("express");
const { eq } = require("drizzle-orm");
const { db, sqlite } = require("./db/database");
const { todos } = require("./db/schema");

const app = express();

app.use(express.json());

app.get("/todos", (req, res) => {
  try {
    const result = db.select().from(todos).all();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/todos/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    const todo = db
      .select()
      .from(todos)
      .where(eq(todos.id, id))
      .get();

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/todos", (req, res) => {
  try {
    const { title, body } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const result = db
      .insert(todos)
      .values({ title, body })
      .returning()
      .get();

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.patch("/todos/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, body, done } = req.body;

    const updates = {};
    if (title !== undefined) updates.title = title;
    if (body !== undefined) updates.body = body;
    if (done !== undefined) updates.done = done ? 1 : 0;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    const result = db
      .update(todos)
      .set(updates)
      .where(eq(todos.id, id))
      .returning()
      .get();

    if (!result) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch("/todos/:id/toggle", (req, res) => {
  try {
    const id = Number(req.params.id);

    const todo = db
      .select()
      .from(todos)
      .where(eq(todos.id, id))
      .get();

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    const result = db
      .update(todos)
      .set({ done: todo.done ? 0 : 1 })
      .where(eq(todos.id, id))
      .returning()
      .get();

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/todos/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    const result = db
      .delete(todos)
      .where(eq(todos.id, id))
      .returning()
      .get();

    if (!result) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({
      message: "Todo deleted successfully",
      todo: result
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
