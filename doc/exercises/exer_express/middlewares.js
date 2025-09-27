app.use(express.json()); // global JSON parser
app.use(loggerMiddleware); // global logger

// Middleware is run by order and stack and finally it arrives to "validateProfile" and run it

// Route with validation middleware
app.post("/profile", validateProfile, profileHandler);

// Error must be after all routes
app.use((err, req, res, next) => {});
