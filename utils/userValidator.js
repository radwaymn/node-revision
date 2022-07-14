const Ajv = require("ajv");
const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
    age: { type: "number" },
    phone: { type: "string" }
  },
  required: ["name", "email", "password", "phone"],
  additionalProperties: false,
};

module.exports = ajv.compile(schema);
