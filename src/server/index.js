import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import next from "next";

admin.initializeApp();

const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
  // the absolute directory from the package.json file that initialises this module
  // IE: the absolute path from the root of the Cloud Function
  conf: { distDir: "dist/client" },
});
const handle = app.getRequestHandler();

const server = functions.https.onRequest((request, response) => {
  return app.prepare().then(() => handle(request, response));
});

const nextjs = {
  server,
};

export { nextjs };
