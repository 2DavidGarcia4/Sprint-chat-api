import bcrypt from 'bcrypt'
import { Response } from 'express';
import { Model } from 'sequelize';

export class DefaultModel extends Model{
  public createdAt!: Date 
  public updatedAt!: Date
}

export function hashPassword(plainPassword: string) {
  return bcrypt.hashSync(plainPassword, 10);
};

export function comparePassword(plainPassword: string, hashPass: string) {
  return bcrypt.compareSync(plainPassword, hashPass);
};

export function setErrorResposne(res: Response, message: string, status=400, fields?: { [key: string]: string }) {
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