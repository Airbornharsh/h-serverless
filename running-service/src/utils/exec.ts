import fs from 'fs'
import path from 'path'
import { HResponse } from '../types/func'

export const execFunction = async (
  projectId: string,
  funcRoute: string,
  url: string,
  method: string,
  params: { [key: string]: string },
  query: { [key: string]: string },
  headers: { [key: string]: string },
) => {
  const hJson = fs.readFileSync(
    path.join(__dirname, `../../temp/${projectId}/h.json`),
    'utf8',
  )
  const parsedHJson = JSON.parse(hJson)
  const func = Object.keys(parsedHJson.functions).find((key) => {
    return (
      parsedHJson.functions[key].route === funcRoute &&
      parsedHJson.functions[key].method === method
    )
  })

  let funct
  try {
    funct = require(
      `../../temp/${projectId}/${parsedHJson.functions[func!].path}`,
    )
  } catch (e) {}

  try {
    if (!func || !funct) {
      throw new Error('Function not found')
    }
  } catch (e) {
    return {
      statusCode: 404,
      body: 'Not Found',
    }
  }

  const response: HResponse = funct[parsedHJson.functions[func!].handler]({
    url,
    method,
    params,
    query,
    headers,
  })
  return response
}
