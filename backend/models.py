from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class OrdemServico(BaseModel):
    id: Optional[int] = None
    numero: str
    assunto: str
    status: str  # pendente, em_andamento, concluida
    prioridade: str  # baixa, media, alta
    data_criacao: Optional[datetime] = None
    data_conclusao: Optional[datetime] = None
    responsavel: str
    sla_hours: int
    cumprimento_sla: bool
    descricao: Optional[str] = None

class SLAMetric(BaseModel):
    id: Optional[int] = None
    assunto: str
    quantidade: int
    cumprimento_percentual: float
    data_atualizacao: Optional[datetime] = None

class Usuario(BaseModel):
    id: Optional[int] = None
    nome: str
    email: str
    role: str  # admin, user, viewer
    ativo: bool = True

class Dashboard(BaseModel):
    total_os: int
    os_pendentes: int
    os_concluidas: int
    taxa_sla: float
    assuntos: dict
