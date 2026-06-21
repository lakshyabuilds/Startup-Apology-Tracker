import appPromiseModule from "../dist/server.cjs";

export default async function handler(req, res) {
  try {
    const app = await (appPromiseModule.default || appPromiseModule);
    app(req, res);
  } catch (err) {
    console.error("Initialization error:", err);
    res.status(500).send(`Server initialization error: ${err.message}\n${err.stack}`);
  }
}


