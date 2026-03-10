import os
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt

security = HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    secret = os.getenv("SUPABASE_JWT_SECRET", "placeholder-secret")
    
    # In a real scenario, verify the JWT signature.
    # For now, we decode without verification if secret is placeholder, 
    # but in production, verify=True is crucial.
    
    try:
        # Assuming HS256 algorithm as standard for Supabase
        payload = jwt.decode(token, secret, algorithms=["HS256"], options={"verify_signature": False} if secret == "placeholder-secret" else {})
        return payload
    except jwt.PyJWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Could not validate credentials: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )
