import usersControllers from "../users/users.controllers";
import { comparePassword } from "../utils/functions";

export async function loginUser(email: string, password: string) {
  try {
    const user = await usersControllers.getUserByEmail(email)
    
    if(user){
      const verifyPassword = comparePassword(password, user.password)

      if(verifyPassword) return user

      return false
    }
    return false

  } catch (error) {
    return false
  }
}