#!/usr/bin/env node
import { program } from "commander";
import chalkAnimation from "chalk-animation";
import fs from "fs-extra";
// import fs from "fs";
import * as path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

const getAllFiles = async (type, projectName) => {
  try {
    let sourceFolder;
    if (type === "nodejs") {
      sourceFolder = path.join(__dirname, "../codes/node");
      if (!fs.existsSync(sourceFolder)) {
        console.error("Source folder does not exist.");
        return;
      }
    } else {
      return;
    }
    const destinationFolder = process.cwd() + "/" + projectName;
    if (!fs.existsSync(destinationFolder)) {
      fs.mkdirSync(destinationFolder);
    }
    fs.copySync(sourceFolder, destinationFolder);
  } catch (e) {
    throw new Error(e);
  }
};

const copyCode = async (type, projectName) => {
  try {
    if (!fs.existsSync(path.join(process.cwd(), projectName))) {
      fs.mkdirSync(path.join(process.cwd(), projectName));
    }
    await getAllFiles(type, projectName);
  } catch (err) {
    console.error(err);
  }
};

const start = async (type, projectName) => {
  // const ani = chalkAnimation.rainbow("Starting...");
  await copyCode(type, projectName);
  console.log(`cd ${projectName} && npm install`);
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
