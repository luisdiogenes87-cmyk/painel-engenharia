from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routes.os_routes import router as os_router
from routes.sla_routes import router as sla_router
import os

app = FastAPI(
    title="Sistema SLA Diego",
    description="Sistema de monitoramento de SLA e Ordens de Serviço",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rotas
app.include_router(os_router)
app.include_router(sla_router)

# Servir arquivos estáticos do frontend
frontend_path = os.path.join(os.path.dirname(__file__), "..", "frontend")
if os.path.exists(frontend_path):
    app.mount("/", StaticFiles(directory=frontend_path, html=True), name="static")

@app.get("/api/health")
def health_check():
    """Health check da API"""
    return {"status": "ok", "message": "API está rodando"}

@app.get("/api")
def api_info():
    """Informações da API"""
    return {
        "nome": "Sistema SLA Diego",
        "versao": "1.0.0",
        "endpoints": {
            "os": "/api/os",
            "sla": "/api/sla",
            "health": "/api/health"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
