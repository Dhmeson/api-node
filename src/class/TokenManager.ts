import jwt  from 'jsonwebtoken'
const SECRET_JWT="game"
export class TokenManager{
    generate(email:string){
        jwt.sign({
            data: email
          }, SECRET_JWT, { expiresIn: '1h' });
    }
    validate(token:string){
        try {
            var decoded = jwt.verify(token, SECRET_JWT);
            
          } catch(err) {
            // err
          }
    }
}