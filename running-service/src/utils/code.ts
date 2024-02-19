import fs from 'fs-extra'
import { exec } from 'child_process'
import { FbStorage } from '../config/Firebase.config'

const storageBucket = FbStorage.bucket()

export const copyCode = async (projectId: string) => {
  const localFolderPath = `temp/${projectId}`
  const remoteFolderPath = `projects/${projectId}/`
  try {
    if (!fs.existsSync('temp')) fs.mkdirSync('temp')
    const [HJson] = await storageBucket
      .file(`${remoteFolderPath}h.json`)
      .download()
    const hJson = Buffer.from(HJson).toString('utf-8')
    const projectExist = fs.existsSync(localFolderPath)

    if (projectExist) {
      const hjsonLocal = fs.readFileSync(`${localFolderPath}/h.json`, 'utf-8')
      if (
        JSON.parse(hJson).latestVersion === JSON.parse(hjsonLocal).latestVersion
      ) {
        console.log('No new version')
        return
      }
    }
    if (projectExist) {
      await fs.remove(localFolderPath)
    }
    const [files] = await storageBucket.getFiles({
      prefix: remoteFolderPath,
    })
    if (!fs.existsSync(localFolderPath)) fs.mkdirSync(localFolderPath)
    await Promise.all(
      files.map(async (file) => {
        const localFilePath = `${localFolderPath}/${file.name.split(remoteFolderPath).pop()}`
        localFilePath
          .split('/')
          .slice(0, -1)
          .forEach((dir, index, splits) => {
            const parent = splits.slice(0, index + 1).join('/')
            if (!fs.existsSync(parent)) fs.mkdirSync(parent)
          })
        await file.download({ destination: localFilePath })
        console.log(
          `File ${file.name} downloaded successfully to ${localFilePath}`,
        )
      }),
    )

    const execRes = await new Promise((resolve, reject) => {
      exec(`cd ${localFolderPath} && npm install`, (err, stdout, stderr) => {
        if (err) {
          console.error(err)
          reject(err)
        }
        resolve(stdout)
      })
    })

    console.log(execRes)
    console.log('Folder downloaded successfully.')
  } catch (e: any) {
    // console.error(e)
  }
}
