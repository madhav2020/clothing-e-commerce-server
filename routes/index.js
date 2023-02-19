const express = require("express");
const auth_routes = require("./auth.routes");
const products_routes = require("./products.route");
const multer = require("multer");
const os = require("os"); // os is the default module in the nodejs to get http https ip address etc.

const index_routes = express.Router();

index_routes.use("/auth", auth_routes);
index_routes.use("/products", products_routes);

// write the function to get the api of our server
const getIPAddress = () => {
  const interfaces = os.networkInterfaces();
  let ipAddress;

  Object.keys(interfaces).forEach((interfaceName) => {
    const interfaceData = interfaces[interfaceName];
    interfaceData.forEach((data) => {
      if (data.family === "IPv4" && !data.internal) {
        ipAddress = data.address;
      }
    });
  });

  return ipAddress;
};

// MULTER FILE UPLOAD FUNCTION
// multer is a function which accept object as arguments
const image_upload = multer({
  // inside the multer we have diskStorage as a function which accept two object as arguments 1st one is destination and 2nd one is fileName. both the arguments has access to req, file, callBack. in the callBack only we se the destination foldername and the filename
  storage: multer.diskStorage({
    // here we set the destination for the file to be uploaded
    destination: (req, file, callBack) => {
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
      ) {
        callBack(null, "uploads/"); // in this call back we set the destination folder name
      } else {
        callBack(null, false); // the false means the file will not be uploaded
      }
    },
    //here we set the filename to be uploaded remember it's not fileName
    filename: (req, file, callBack) => {
      const name = file.originalname.toLowerCase().split(" ").join("-"); //format the name of the original file
      const image_extension = file.mimetype.split("/")[1]; // get the extension of the uploaded image
      const fileName = `${name}-${Date.now()}.${image_extension}`; // create the file name using name and image_extension
      callBack(null, fileName); //finally set the file name
    },
  }),
});

// Routes for file upload
index_routes.post(
  "/upload-file",
  image_upload.single("image"),
  (req, res, next) => {
    try {
      const { file } = req;
      const { filename } = file;
      const IP = getIPAddress();
      const port = process.env.PORT || 5000;
      const url = `http://${IP}:${port}/${filename}`;
      //   console.log(req.file);
      res.json({
        status: "success",
        url: url,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = index_routes;
