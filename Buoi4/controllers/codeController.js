const asyncHandle = require("./../middlewares/asyncHandle");
const jwt = require("jsonwebtoken");

module.exports.encrypt = asyncHandle(async (req, res) => {
  const { doc } = req.body;
  const encoded = jwt.sign({ doc }, process.env.JWT_ACCESS_KEY, {
    expiresIn: "30m",
  });

  res.status(200).json({ encoded });
});

module.exports.decrypt = asyncHandle(async (req, res) => {
  const { doc } = req.body;

  if (!doc) {
    return res.status(404).json({ message: "Value not found" });
  }

  jwt.verify(doc, process.env.JWT_ACCESS_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Value is invalid" });
    }

    return res.status(200).json({ decoded: decoded.doc });
  });
});
