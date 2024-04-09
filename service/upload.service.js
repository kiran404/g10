const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// cofigs for cloudinary
cloudinary.config({
  cloud_name: "do7zg7jmv",
  api_key: "161235919186648",
  api_secret: "6STv64yOq7t5MZ8oueSUbTRc70o",
});

const cloudinaryImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "whiteboard",
    format: async (req, file) => file.mimetype.split("/")[1],
    public_id: (req, file) => Date.now(),
  },
});

function myfileFilter(req, file, cb) {
  var mimeType = file.mimetype.split("/")[0];
  if (mimeType == "image") {
    cb(null, true);
  } else {
    req.fileError = true;
    cb(null, false);
  }
}

const upload = multer({
  storage: cloudinaryImageStorage,
  fileFilter: myfileFilter,
});

module.exports = upload;
