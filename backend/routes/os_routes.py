from fastapi import APIRouter, HTTPException
from database import db
from models import OrdemServico
from typing import List

router = APIRouter(prefix="/api/os", tags=["Ordens de Serviço"])

@router.get("/", response_model=List[OrdemServico])
def listar_os():
    """Listar todas as ordens de serviço"""
    resultado = db.get_os_list()
    if "error" in resultado:
        raise HTTPException(status_code=500, detail=resultado["error"])
    return resultado

@router.get("/{os_id}")
def obter_os(os_id: int):
    """Obter uma OS específica"""
    try:
        response = db.client.table('ordens_servico').select('*').eq('id', os_id).execute()
        if response.data:
            return response.data[0]
        raise HTTPException(status_code=404, detail="OS não encontrada")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/")
def criar_os(os: OrdemServico):
    """Criar nova ordem de serviço"""
    resultado = db.create_os(os.dict(exclude_unset=True))
    if "error" in resultado:
        raise HTTPException(status_code=500, detail=resultado["error"])
    return resultado

@router.put("/{os_id}")
def atualizar_os(os_id: int, os: OrdemServico):
    """Atualizar ordem de serviço"""
    resultado = db.update_os(os_id, os.dict(exclude_unset=True))
    if "error" in resultado:
        raise HTTPException(status_code=500, detail=resultado["error"])
    return resultado

@router.delete("/{os_id}")
def deletar_os(os_id: int):
    """Deletar ordem de serviço"""
    resultado = db.delete_os(os_id)
    if "error" in resultado:
        raise HTTPException(status_code=500, detail=resultado["error"])
    return {"message": "OS deletada com sucesso"}
