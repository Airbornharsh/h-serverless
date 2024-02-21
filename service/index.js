const { exec } = require("child_process");

async function runCommand(command) {
  try {
    const { stdout, stderr } = await new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        resolve({ stdout, stderr });
      });
    });

    console.log(command, " -> ", stdout);
    console.error(stderr);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

async function installDocker() {
  try {
    await runCommand("ls");
    await runCommand("sh get-docker.sh");
    await runCommand("ls");
    await runCommand("rm get-docker.sh");
    await runCommand("ls");
    await runCommand(`usermod -aG docker root`);
    await runCommand("ls");
    await runCommand("systemctl enable docker");
    await runCommand("ls");
    await runCommand("systemctl start docker");
    await runCommand("ls");
    await runCommand("docker compose up -d");
    await runCommand("ls");
    await runCommand("docker --version");

    console.log("Docker installed successfully!");
  } catch (error) {
    console.error(`Error installing Docker: ${error}`);
  }
}

installDocker();
