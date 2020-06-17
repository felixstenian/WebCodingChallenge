import multer from "multer";
import path from "path";

module.exports = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
    },
    filename: (req, file, cb) => {
      return cb(null, file.originalname);
    },
  }),

  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname) !== ".txt") {
      return cb(new Error("Only txt are allowed"));
    }

    cb(null, true);
  },
};

export default {};
