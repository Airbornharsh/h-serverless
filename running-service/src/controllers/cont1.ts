import { RequestHandler } from 'express'
import { copyCode } from '../utils/code'
import { execFunction } from '../utils/exec'

export const APIHandler: RequestHandler = async (req, res) => {
  try {
    const projectId = req.url.split('/')[1]
    const route = req.url.split('/').slice(2).join('/')

    await copyCode(projectId)
    const response = await execFunction(
      projectId,
      route,
      req.url,
      req.method,
      req.params,
      req.query as { [key: string]: string },
      req.headers as { [key: string]: string },
    )

    response.headers &&
      Object.keys(response.headers).forEach((key) => {
        res.setHeader(key, response.headers![key])
      })
    return res.status(response.statusCode).json({
      body: response.body,
    })
  } catch (e: any) {
    console.error(e)
    res.status(500).json({
      message: e.message,
    })
  }
}

export const ApiPostHandler: RequestHandler = async (req, res) => {
  try {
    const projectId = req.url.split('/')[1]
    const route = req.url.split('/').slice(2).join('/')

    await copyCode(projectId)
    const response = await execFunction(
      projectId,
      route,
      req.url,
      req.method,
      req.params,
      req.query as { [key: string]: string },
      req.headers as { [key: string]: string },
    )

    response.headers &&
      Object.keys(response.headers).forEach((key) => {
        res.setHeader(key, response.headers![key])
      })
    return res.status(response.statusCode).json({
      body: response.body,
    })
  } catch (e: any) {
    console.error(e)
    res.status(500).json({
      message: e.message,
    })
  }
}

export const ApiGetHandler: RequestHandler = async (req, res) => {
  try {
    const projectId = req.url.split('/')[1].split('?')[0]
    const route = req.url.split('/').slice(2).join('/')

    await copyCode(projectId)
    const response = await execFunction(
      projectId,
      route,
      req.url,
      req.method,
      req.params,
      req.query as { [key: string]: string },
      req.headers as { [key: string]: string },
    )

    response.headers &&
      Object.keys(response.headers).forEach((key) => {
        res.setHeader(key, response.headers![key])
      })
    return res.status(response.statusCode).json({
      body: response.body,
    })
  } catch (e: any) {
    console.error(e)
    res.status(500).json({
      message: e.message,
    })
  }
}

export const ApiPutHandler: RequestHandler = async (req, res) => {
  try {
    const projectId = req.url.split('/')[1]
    const route = req.url.split('/').slice(2).join('/')

    await copyCode(projectId)
    const response = await execFunction(
      projectId,
      route,
      req.url,
      req.method,
      req.params,
      req.query as { [key: string]: string },
      req.headers as { [key: string]: string },
    )

    response.headers &&
      Object.keys(response.headers).forEach((key) => {
        res.setHeader(key, response.headers![key])
      })
    return res.status(response.statusCode).json({
      body: response.body,
    })
  } catch (e: any) {
    console.error(e)
    res.status(500).json({
      message: e.message,
    })
  }
}

export const ApiPatchHandler: RequestHandler = async (req, res) => {
  try {
    const projectId = req.url.split('/')[1]
    const route = req.url.split('/').slice(2).join('/')

    await copyCode(projectId)
    const response = await execFunction(
      projectId,
      route,
      req.url,
      req.method,
      req.params,
      req.query as { [key: string]: string },
      req.headers as { [key: string]: string },
    )

    response.headers &&
      Object.keys(response.headers).forEach((key) => {
        res.setHeader(key, response.headers![key])
      })
    return res.status(response.statusCode).json({
      body: response.body,
    })
  } catch (e: any) {
    console.error(e)
    res.status(500).json({
      message: e.message,
    })
  }
}

export const ApiDeleteHandler: RequestHandler = async (req, res) => {
  try {
    const projectId = req.url.split('/')[1]
    const route = req.url.split('/').slice(2).join('/')

    await copyCode(projectId)
    const response = await execFunction(
      projectId,
      route,
      req.url,
      req.method,
      req.params,
      req.query as { [key: string]: string },
      req.headers as { [key: string]: string },
    )

    response.headers &&
      Object.keys(response.headers).forEach((key) => {
        res.setHeader(key, response.headers![key])
      })
    return res.status(response.statusCode).json({
      body: response.body,
    })
  } catch (e: any) {
    console.error(e)
    res.status(500).json({
      message: e.message,
    })
  }
}
