from supabase import create_client, Client
from config import config

# Inicializar cliente Supabase
supabase: Client = create_client(config.SUPABASE_URL, config.SUPABASE_KEY)

def get_supabase():
    return supabase

# Funções auxiliares para operações CRUD
class Database:
    def __init__(self):
        self.client = supabase

    def get_os_list(self):
        """Obter lista de Ordens de Serviço"""
        try:
            response = self.client.table('ordens_servico').select('*').execute()
            return response.data
        except Exception as e:
            return {"error": str(e)}

    def create_os(self, data):
        """Criar nova OS"""
        try:
            response = self.client.table('ordens_servico').insert(data).execute()
            return response.data
        except Exception as e:
            return {"error": str(e)}

    def update_os(self, os_id, data):
        """Atualizar OS"""
        try:
            response = self.client.table('ordens_servico').update(data).eq('id', os_id).execute()
            return response.data
        except Exception as e:
            return {"error": str(e)}

    def delete_os(self, os_id):
        """Deletar OS"""
        try:
            response = self.client.table('ordens_servico').delete().eq('id', os_id).execute()
            return {"success": True}
        except Exception as e:
            return {"error": str(e)}

    def get_sla_metrics(self):
        """Obter métricas SLA"""
        try:
            response = self.client.table('sla_metrics').select('*').execute()
            return response.data
        except Exception as e:
            return {"error": str(e)}

db = Database()
