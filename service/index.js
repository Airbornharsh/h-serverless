const exec = require("child_process");

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

    console.log(stdout);
    console.error(stderr);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

async function installDocker() {
  try {
    await runCommand("curl -fsSL https://get.docker.com -o get-docker.sh");
    await runCommand("sh get-docker.sh");
    await runCommand("rm get-docker.sh");
    await runCommand(`usermod -aG docker root`);
    await runCommand("systemctl enable docker");
    await runCommand("systemctl start docker");
    await runCommand("docker compose up -d");

    console.log("Docker installed successfully!");
  } catch (error) {
    console.error(`Error installing Docker: ${error}`);
  }
}

installDocker();
