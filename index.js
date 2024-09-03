const axios = require("axios");
const fs = require("fs");
const path = require("path");

const angle = ["front", "top", "sliced"];

const shapes = [
  "mini_standard",
  "standard",
  "heart",
  "mini_heart",
  "classic_round",
  "classic_square",
  "sheet",
  "double_barrel",
];

const flavors = [
  "chocolate_crunch",
  "cinnamon",
  "fruits",
  "nutella",
  "red_velvet",
  "pistachio",
  "vanilla",
];

const toppings = [
  "hearts_red_white_piping",
  "pink_butterflies",
  "pinkberry_piping",
];

const getShapes = () => {
  try {
    shapes.forEach((shape) => {
      angle.forEach((angle) => {
        const url = `https://file.lola.do/content/cakes/shapes/${shape}/${angle}.png`;
        const saveLoc = path.join(
          __dirname,
          "cakes",
          "shapes",
          shape,
          angle + ".png"
        );
        downloadImage(url, saveLoc);
      });
    });
  } catch (error) {
    console.error("Error downloading the shape:", error.message);
  }
};

const getFlavors = () => {
  try {
    flavors.forEach((flavor) => {
      shapes.forEach((shape) => {
        angle.forEach((angle) => {
          const url = `https://file.lola.do/content/cakes/flavors/${flavor}/${shape}_${angle}.png`;
          const saveLoc = path.join(
            __dirname,
            "cakes",
            "flavors",
            flavor,
            shape,
            shape + "_" + angle + ".png"
          );
          downloadImage(url, saveLoc);
        });
      });
    });
  } catch (error) {
    console.error("Error downloading the flavor:", error.message);
  }
};

const getToppings = () => {
  try {
    toppings.forEach((topping) => {
      shapes.forEach((shape) => {
        angle.forEach((angle) => {
          const url = `https://file.lola.do/content/cakes/toppings/${topping}/${shape}_${angle}.png`;
          const saveLoc = path.join(
            __dirname,
            "cakes",
            "topping",
            topping,
            shape,
            shape + "_" + angle + ".png"
          );
          downloadImage(url, saveLoc);
        });
      });
    });
  } catch (error) {
    console.error("Error downloading the flavor:", error.message);
  }
};

const downloadImage = async (url, savePath) => {
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });

    // Ensure the directory exists
    const dir = path.dirname(savePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Create a write stream and pipe the response to it
    const writer = fs.createWriteStream(savePath);
    response.data.pipe(writer);

    // Return a promise that resolves when the file is fully written
    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (error) {
    console.error("Error downloading the image:", error);
  }
};

getShapes();
getFlavors();
getToppings();
