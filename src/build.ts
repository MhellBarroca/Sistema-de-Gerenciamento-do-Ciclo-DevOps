import fs from "node:fs";
import path from "node:path";
import { exec } from "node:child_process";
import React from "react";
import ReactDOMServer from "react-dom/server";
import DevOpsLandingPage from "./DevOpsLandingPage.js";

const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>pipeline.ops — O ciclo DevOps explicado</title>
</head>
<body>
  ${ReactDOMServer.renderToStaticMarkup(React.createElement(DevOpsLandingPage))}
</body>
</html>`;

const outPath = path.join(process.cwd(), "dist", "index.html");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, html, "utf-8");

console.log(`✔ HTML gerado em ${outPath}`);

const abrirComando =
  process.platform === "darwin"
    ? `open "${outPath}"`
    : process.platform === "win32"
      ? `start "" "${outPath}"`
      : `xdg-open "${outPath}"`;

exec(abrirComando, (err) => {
  if (err) {
    console.log("Não consegui abrir o navegador automaticamente.");
    console.log(`Abra manualmente: ${outPath}`);
  } else {
    console.log("✔ Abrindo no navegador...");
  }
});
