const fs = require("fs-extra");
const path = require("path");
const timeStamp = new Date().toLocaleString("fr-FR", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
});
console.log("timeStamp", timeStamp);
const filePath = path.join(
  "C:",
  "Users",
  "David",
  "Downloads",
  "Programming",
  "wildcodeSchool_project",
  "server"
);

const errorHandler = (err, req, res, next) => {
  console.error(err);
  let errStatus, errMsg;
  switch (err.statusCode) {
    case 500:
      errStatus = 500;
      errMsg = err.message || "Erreur interne du serveur";
      break;
    case 502:
      errStatus = 502;
      errMsg = err.message || "Bad Gateway";
      break;
    case 503:
      errStatus = 503;
      errMsg = err.message || "Service indisponible";
      break;
    case 504:
      errStatus = 504;
      errMsg = err.message || "Temps d'attente écoulé";
      break;
    default:
      errStatus = 500;
      errMsg = err.message || "Erreur interne du serveur";
      break;
  }
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: err ? errMsg : "Le serveur ne réponds pas",
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });

  const errorText = `[${timeStamp}] ${err.stack}\n`;
  if (err.statusCode === 401 && err.statusCode === 403) {
    return false; // On eclue d'écrire dans le journal les érreurs critiques et sensibles
  } else {
    fs.ensureDir(path.dirname(filePath))
      .then(() => {
        fs.appendFile("Error.txt", errorText, (error) => {
          if (!error) {
            console.log("L'erreur avec timestamp st dans le fichier Error.txt");
          } else {
            console.log("Impossible d'écrire l'erreur avec timeStamp");
          }
        })
          .then(() => {
            console.log("Les traces de stack est écrt au fichier Error.txt");
          })
          .catch((err) => {
            console.error(
              "Impossible d'écrire, il y a une erreur dans le fichier error.txt",
              err
            );
          });
      })
      .catch((error) => {
        console.error("Impossible de trouver l'emplacement exact", error);
      });
  }
};

module.exports = errorHandler;
