//❌ Not recommended for more than 2–3 IDs.
app.get("/addresses/:id1/:id2/:id3?", async (req, res) => {
  const { id1, id2, id3 } = req.params;
  const ids = [id1, id2];
  if (id3) ids.push(id3);

  // Fetch from DB
});

//GET / addresses / 123 / 456 / 789;
