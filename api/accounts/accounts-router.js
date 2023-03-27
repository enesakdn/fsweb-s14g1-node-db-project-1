const router = require("express").Router();

const accountModel = require("./accounts-model");

const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
} = require("./accounts-middleware");

router.get("/", async (req, res, next) => {
  try {
    const AllRecords = await accountModel.getAll();
    res.json(AllRecords);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", checkAccountId, async (req, res, next) => {
  try {
    res.json(req.currentAccount);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  checkAccountNameUnique,
  checkAccountPayload,
  async (req, res, next) => {
    // KODLAR BURAYA
    try {
      const { name, budget } = req.body;
      const inserted = await accountModel.create({
        name: name,
        budget: budget,
      });
      res.json(inserted);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
  async (req, res, next) => {
    // KODLAR BURAYA
    try {
      const { name, budget } = req.body;
      let updateRecord = await accountModel.updateById(req.params.id, {
        name: name,
        budegt: budget,
      });
      res.status(200).json(updateRecord);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  checkAccountId,

  async (req, res, next) => {
    // KODLAR BURAYA
    try {
      await accountModel.deleteById(req.params.id);
      res.json({ message: `${req.params.id} ID'li kayıt silindi` });
    } catch (error) {
      next(error);
    }
  }
);

router.use((err, req, res, next) => {
  // eslint-disable-line
  // KODLAR BURAYA
  res.status(err.status || 400).json({
    customMessage: "Hata Oluştu",
    message: err.message,
  });
});

module.exports = router;
