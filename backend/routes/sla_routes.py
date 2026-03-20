from fastapi import APIRouter, HTTPException
from database import db
from models import SLAMetric
from typing import List

router = APIRouter(prefix="/api/sla", tags=["SLA"])

@router.get("/metrics", response_model=List[SLAMetric])
def obter_metricas_sla():
    """Obter métricas SLA"""
    resultado = db.get_sla_metrics()
    if "error" in resultado:
        raise HTTPException(status_code=500, detail=resultado["error"])
    return resultado

@router.get("/dashboard")
def dashboard_sla():
    """Dashboard SLA com estatísticas gerais"""
    try:
        # Obter todas as OS
        os_response = db.client.table('ordens_servico').select('*').execute()
        os_list = os_response.data

        # Calcular métricas
        total = len(os_list)
        cumpridas = sum(1 for os in os_list if os.get('cumprimento_sla', False))
        pendentes = sum(1 for os in os_list if os.get('status') == 'pendente')
        concluidas = sum(1 for os in os_list if os.get('status') == 'concluida')

        taxa_sla = (cumpridas / total * 100) if total > 0 else 0

        return {
            "total_os": total,
            "os_cumpridas": cumpridas,
            "os_pendentes": pendentes,
            "os_concluidas": concluidas,
            "taxa_sla_percentual": round(taxa_sla, 2)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/por-assunto")
def sla_por_assunto():
    """SLA agrupado por assunto"""
    try:
        response = db.client.table('ordens_servico').select('assunto, cumprimento_sla').execute()

        assuntos = {}
        for os in response.data:
            assunto = os.get('assunto', 'Sem assunto')
            if assunto not in assuntos:
                assuntos[assunto] = {'total': 0, 'cumpridas': 0}

            assuntos[assunto]['total'] += 1
            if os.get('cumprimento_sla'):
                assuntos[assunto]['cumpridas'] += 1

        # Calcular percentuais
        resultado = {}
        for assunto, dados in assuntos.items():
            percentual = (dados['cumpridas'] / dados['total'] * 100) if dados['total'] > 0 else 0
            resultado[assunto] = {
                'total': dados['total'],
                'cumpridas': dados['cumpridas'],
                'percentual': round(percentual, 2)
            }

        return resultado
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
