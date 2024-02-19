#!/usr/bin/env node
import { program } from "commander";
import { initializeApp } from "firebase/app";
import "firebase/storage";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import fs from "fs-extra";
import * as path from "path";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyC0U5hWEi23sCWIJF6oRckdGwJNC3trpGs",
  authDomain: "h-serverless.firebaseapp.com",
  projectId: "h-serverless",
  storageBucket: "h-serverless.appspot.com",
  messagingSenderId: "516438777143",
  appId: "1:516438777143:web:334f942df83cecc8420eb2",
  measurementId: "G-MCR0BWPBH6",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function uploadFolder(localFolderPath, remoteFolderPath, id) {
  const files = fs.readdirSync(localFolderPath);

  for (const fileName of files) {
    const localFilePath = path.join(localFolderPath, fileName);
    const remoteFilePath = path.join(remoteFolderPath, fileName);

    const storageRef = ref(storage, `${remoteFilePath.replace(__dirname, "")}`);

    const fileFoler = localFilePath.split("/").pop();
    if (fileFoler === "node_modules") {
      continue;
    }
    if (fs.lstatSync(localFilePath).isDirectory()) {
      await uploadFolder(localFilePath, remoteFilePath, id);
    } else {
      const file = fs.readFileSync(localFilePath);
      await uploadBytes(storageRef, file);

      console.log(`Uploaded ${localFilePath} to ${remoteFilePath}`);
    }
  }
}

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

    const hjson = fs.readFileSync(
      path.join(destinationFolder, "h.json"),
      "utf-8"
    );
    const hjsonObj = JSON.parse(hjson);
    hjsonObj.name = projectName;
    hjsonObj.id = projectName + v4();
    fs.writeFileSync(
      path.join(destinationFolder, "h.json"),
      JSON.stringify(hjsonObj, null, 2)
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
    await getAllFiles(type, projectName);
  } catch (err) {
    console.error(err);
  }
};

const start = async (type, projectName) => {
  await copyCode(type, projectName);
  console.log(`cd ${projectName} && npm install`);
};

const deploy = async () => {
  console.log("Deploying the project...");
  const hjson = fs.readFileSync(path.join(process.cwd(), "h.json"), "utf-8");
  const { name, id } = JSON.parse(hjson);
  console.log(`Deploying project ${name} with id ${id}...`);

  try {
    const HJsonRef = ref(storage, `projects/${id}/h.json`);
    const hjsonURL = await getDownloadURL(HJsonRef);
    const response = await fetch(hjsonURL);
    const hjsonContent = await response.text();
    const parsedHjson = JSON.parse(hjsonContent);
    parsedHjson.latestVersion += 1;
    await uploadBytes(
      HJsonRef,
      Buffer.from(JSON.stringify(parsedHjson, null, 2))
    );
    fs.writeFileSync(
      path.join(process.cwd(), "h.json"),
      JSON.stringify(parsedHjson, null, 2)
    );
  } catch (e) {}

  await uploadFolder(process.cwd(), `projects/${id}`, id);
};

const main = async () => {
  const val = program
    .version("1.3.0")
    .description("CLI for asking about a feature name and name")
    .option("-d, --deploy <deploy>", "Deploy the project")
    .option("-f, --type <type>", "Specify the feature name")
    .option("-n, --name <name>", "Specify the name")
    .parse(process.argv)
    .opts();

  const type = val.type;
  const projectName = val.name;

  if (!type || !projectName) {
    if (deploy) {
      await deploy();
    } else {
      console.error("Please specify both the feature name and the name");
      return;
    }
  } else {
    await start(type, projectName);
  }
};

main();
