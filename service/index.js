const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function runCommand(command) {
  try {
    const { stdout, stderr } = await exec(command);
    console.log(stdout);
    console.error(stderr);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

async function installDocker() {
  try {
    await runCommand('curl -fsSL https://get.docker.com -o get-docker.sh');
    await runCommand('sh get-docker.sh');
    await runCommand('rm get-docker.sh');
    await runCommand(`sudo usermod -aG docker $USER`);
    await runCommand('sudo systemctl enable docker');
    await runCommand('sudo systemctl start docker');
    await runCommand('sudo docker compose up -d');

    console.log('Docker installed successfully!');
  } catch (error) {
    console.error(`Error installing Docker: ${error}`);
  }
}

installDocker();
