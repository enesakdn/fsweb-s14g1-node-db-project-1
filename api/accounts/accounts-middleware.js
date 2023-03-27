const accountModel = require("./accounts-model");
const yup = require("yup");

const accountShema = yup.object().shape({
  name: yup
    .string()
    .min(3, "name of account must be between 3 and 100")
    .max(100, "name of account must be between 3 and 100")
    .required("name and budget are required"),
  budget: yup
    .number()
    .min(0, "budget of account is too large or too small")
    .max(1000000, "budget of account is too large or too small")
    .required("budget of account must be a number"),
});

exports.checkAccountPayload = async (req, res, next) => {
  try {
    if (req.body && req.body.name) req.body.name = req.body.name.trim();

    await accountShema.validate(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    await accountShema.validate(req.body);
    const almostId = await accountModel.getByName(req.body.name);
    if (almostId) res.status(400).json({ message: "that name is taken" });
    else {
      next();
    }
  } catch (error) {
    res.status(400).json({ message: error.messages });
  }
};

exports.checkAccountId = async (req, res, next) => {
  try {
    const newid = await accountModel.getById(req.params.id);
    if (!newid) {
      res.status(404).json({ message: "account not found" });
    } else {
      req.currentAccount = existAccount;
      next();
    }
  } catch (error) {
    next(error);
  }
};
