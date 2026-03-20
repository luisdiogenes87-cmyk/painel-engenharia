// API Configuration
const API_URL = 'http://localhost:8000/api';

class API {
    // OS Routes
    static async getOSList() {
        try {
            const response = await fetch(`${API_URL}/os/`);
            if (!response.ok) throw new Error('Erro ao buscar OS');
            return await response.json();
        } catch (error) {
            console.error('Erro:', error);
            return [];
        }
    }

    static async getOS(id) {
        try {
            const response = await fetch(`${API_URL}/os/${id}`);
            if (!response.ok) throw new Error('Erro ao buscar OS');
            return await response.json();
        } catch (error) {
            console.error('Erro:', error);
            return null;
        }
    }

    static async createOS(data) {
        try {
            const response = await fetch(`${API_URL}/os/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Erro ao criar OS');
            return await response.json();
        } catch (error) {
            console.error('Erro:', error);
            return null;
        }
    }

    static async updateOS(id, data) {
        try {
            const response = await fetch(`${API_URL}/os/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Erro ao atualizar OS');
            return await response.json();
        } catch (error) {
            console.error('Erro:', error);
            return null;
        }
    }

    static async deleteOS(id) {
        try {
            const response = await fetch(`${API_URL}/os/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Erro ao deletar OS');
            return await response.json();
        } catch (error) {
            console.error('Erro:', error);
            return null;
        }
    }

    // SLA Routes
    static async getSLAMetrics() {
        try {
            const response = await fetch(`${API_URL}/sla/metrics`);
            if (!response.ok) throw new Error('Erro ao buscar métricas SLA');
            return await response.json();
        } catch (error) {
            console.error('Erro:', error);
            return [];
        }
    }

    static async getSLADashboard() {
        try {
            const response = await fetch(`${API_URL}/sla/dashboard`);
            if (!response.ok) throw new Error('Erro ao buscar dashboard SLA');
            return await response.json();
        } catch (error) {
            console.error('Erro:', error);
            return null;
        }
    }

    static async getSLAPorAssunto() {
        try {
            const response = await fetch(`${API_URL}/sla/por-assunto`);
            if (!response.ok) throw new Error('Erro ao buscar SLA por assunto');
            return await response.json();
        } catch (error) {
            console.error('Erro:', error);
            return {};
        }
    }

    // Health check
    static async healthCheck() {
        try {
            const response = await fetch(`${API_URL}/health`);
            if (!response.ok) throw new Error('API offline');
            return await response.json();
        } catch (error) {
            console.error('Erro:', error);
            return null;
        }
    }

    static async getAPIInfo() {
        try {
            const response = await fetch(`${API_URL}`);
            if (!response.ok) throw new Error('Erro ao buscar info da API');
            return await response.json();
        } catch (error) {
            console.error('Erro:', error);
            return null;
        }
    }
}

// Export para uso global
window.API = API;
