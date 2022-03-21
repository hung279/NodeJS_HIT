const Url = require("./../models/urlModel");
const asyncHandle = require("./../middlewares/asyncHandle");

const urlController = {
  getUrl: asyncHandle(async (req, res) => {
    const url = await Url.findOne({ urlCode: req.params.code });
    //console.log(url);
    res.redirect(url.orgUrl);
  }),

  creatUrl: asyncHandle(async (req, res) => {
    const url = await Url.create(req.body);

    if (!url.isUrl(url.orgUrl)) {
      return res.status(400).json({ message: "Invalid URL" });
    }

    res.status(201).json(url);
  }),
};

module.exports = urlController;
