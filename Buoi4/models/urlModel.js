const mongoose = require("mongoose");
const shortid = require("shortid");
const validUrl = require("valid-url");

const urlScheme = new mongoose.Schema(
  {
    urlCode: String,
    orgUrl: {
      type: String,
      required: true,
    },
    shortUrl: String,
  },
  {
    timestamps: true,
  }
);

urlScheme.pre("save", function (next) {
  const url = this;
  url.urlCode = shortid.generate();
  url.shortUrl = `http://localhost:3000/${url.urlCode}`;
  next();
});

urlScheme.methods.isUrl = function (url) {
  return validUrl.isUri(url);
};

module.exports = mongoose.model("Url", urlScheme);
