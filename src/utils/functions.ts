import bcrypt from 'bcrypt'
import { Response } from 'express';

export function hashPassword(plainPassword: string) {
  return bcrypt.hashSync(plainPassword, 10);
};

export function comparePassword(plainPassword: string, hashPass: string) {
  return bcrypt.compareSync(plainPassword, hashPass);
};

const uuid = () => {
  let arr = []
  arr[8] = '-', arr[13] = '-', arr[18] = '-', arr[23] = '-'
  
  for(let i=0; i<36; i++){
    let el = arr[i], random = (Math.floor(Math.random()*16)+1)
    if(!el) arr[i] = random.toString(17)
  }

  return arr.join('')
}

export function setErrorResposne(res: Response, message: string, status=400, fields=undefined) {
  if(fields){
    res.status(status).json({
      status,
      message: message,
      fields
    })

  }else{
    res.status(status).json({
      status,
      message: message,
    })
  }
}