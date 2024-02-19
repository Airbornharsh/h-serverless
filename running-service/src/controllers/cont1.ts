import { RequestHandler } from 'express'
import { copyCode } from '../utils/code'

export const ApiPostHandler: RequestHandler = async (req, res) => {
  try {
    const projectId = req.url.split('/')[1]
    const path = req.url.split('/').slice(2).join('/')
    await copyCode(projectId)
    res.status(200).json({
      message: 'Running',
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
    console.log(req.url)
    res.status(200).json({
      message: 'Running',
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
    console.log(req.url)
    res.status(200).json({
      message: 'Running',
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
    console.log(req.url)
    res.status(200).json({
      message: 'Running',
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
    console.log(req.url)
    res.status(200).json({
      message: 'Running',
    })
  } catch (e: any) {
    console.error(e)
    res.status(500).json({
      message: e.message,
    })
  }
}
