import Jwt from "jsonwebtoken";
//generate token
export const createToken = (Id,role) => {
 const token = Jwt.sign(
    {
      id: Id,
      role: role,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.TOKEN_EXPIRATION_DATE }
  );
  return token
};

export default createToken;
