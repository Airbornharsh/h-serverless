#!/usr/bin/env node
import { program } from "commander";
import chalkAnimation from "chalk-animation";
import fs from "fs";
import * as path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

const getAllFiles = async (bucketId, projectName) => {
  try {
    const data = await fetch(
      `https://s3.harshkeshri.com/api/get-files/${bucketId}`
    );
    const parsedData = await data.json();
    await Promise.all(
      parsedData.files.map(async (file) => {
        let url = "";
        file.url
          .split("node/")[1]
          .split("/")
          .forEach(async (part) => {
            url += part + "/";
            const dir = path.join(process.cwd(), projectName, url);
            if (!part.includes(".")) {
              if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
              }
              if (fs.statSync(dir).isDirectory()) {
              }
            } else {
              const res = await fetch(file.url);
              const parsedData = await res.arrayBuffer();
              fs.writeFileSync(
                path.join(process.cwd(), projectName, url.slice(0, -1)),
                Buffer.from(parsedData)
              );
            }
          });
        return "";
      })
    );
  } catch (e) {
    throw new Error(e);
  }
};

const copyCode = async (type, projectName) => {
  try {
    if (!fs.existsSync(path.join(process.cwd(), projectName))) {
      fs.mkdirSync(path.join(process.cwd(), projectName));
    }
    await getAllFiles("82cb49a9-0c33-4434-a2d7-8eb0e20990ea", projectName);
  } catch (err) {
    console.error(err);
  }
};

const start = async (type, projectName) => {
  // const ani = chalkAnimation.rainbow("Starting...");
  await copyCode(type, projectName);
  // await sleep();
  // ani.stop();
};

const main = async () => {
  const val = program
    .version("1.0.0")
    .description("CLI for asking about a feature name and name")
    .option("-f, --type <type>", "Specify the feature name")
    .option("-n, --name <name>", "Specify the name")
    .parse(process.argv)
    .opts();

  const type = val.type;
  const projectName = val.name;

  if (!type || !projectName) {
    console.error("Please specify both the feature name and the name");
    return;
  }

  await start(type, projectName);
};

main();
