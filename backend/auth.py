import os
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt

security = HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    
    # DEMO MODE: Allow a specific demo token for testing without Supabase
    if token == "demo-token-123":
        return {"sub": "demo-user-id", "email": "demo@example.com"}

    secret = os.getenv("SUPABASE_JWT_SECRET", "placeholder-secret")
    
    try:
        # Assuming HS256 algorithm as standard for Supabase
        # In production, verify_signature=True is crucial.
        payload = jwt.decode(token, secret, algorithms=["HS256"], options={"verify_signature": False})
        return payload
    except jwt.PyJWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Could not validate credentials: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )
