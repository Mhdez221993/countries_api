"use strict";

var _express = _interopRequireDefault(require("express"));

var _routes = require("./routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const port = process.env.PORT;
const app = (0, _express.default)();
app.use(_express.default.json()); // all API routes are prefixed with /api/v1

app.use("/api/v1", (0, _routes.getRoutes)());
app.listen(port, () => console.log(`Listening on port ${port}`));
module.exports = app;