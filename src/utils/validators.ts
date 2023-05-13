import { Response } from "express";
import { setErrorResposne } from './functions'

function missingData(res: Response, fields: any[], fieldsMap?: { [key: string]: string }) {
  if(!fields.every(f=> typeof f != 'undefined')) {
    setErrorResposne(res, 'Missing data', 400, fieldsMap)
    return true
  }

  return false
}


export default {
  missingData
}