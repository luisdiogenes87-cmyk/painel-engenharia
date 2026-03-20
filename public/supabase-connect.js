// Configuração do Supabase
const SUPABASE_URL = 'https://kunymezqdhilyddibawt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1bnltZXpxZGhpbHlkZGliYXd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MzE3ODksImV4cCI6MjA4ODMwNzc4OX0.v_KbU6_XxuOMxeRmK7gVgK8DFk1VpDisIyoQVmZmNlQ';

// Classe para conectar com Supabase
class SupabaseClient {
  constructor(url, key) {
    this.url = url;
    this.key = key;
  }

  async query(table, query = '') {
    const endpoint = `${this.url}/rest/v1/${table}${query}`;
    const response = await fetch(endpoint, {
      headers: {
        'apikey': this.key,
        'Authorization': `Bearer ${this.key}`,
      },
    });
    return await response.json();
  }

  async getProjects() {
    return await this.query('projects');
  }

  async getTasks() {
    return await this.query('tasks');
  }

  async getMetrics() {
    return await this.query('metrics');
  }

  async getUsers() {
    return await this.query('users');
  }

  async insertProject(data) {
    const response = await fetch(`${this.url}/rest/v1/projects`, {
      method: 'POST',
      headers: {
        'apikey': this.key,
        'Authorization': `Bearer ${this.key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  }

  async insertTask(data) {
    const response = await fetch(`${this.url}/rest/v1/tasks`, {
      method: 'POST',
      headers: {
        'apikey': this.key,
        'Authorization': `Bearer ${this.key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  }
}

// Inicializar cliente
const db = new SupabaseClient(SUPABASE_URL, SUPABASE_KEY);

// Função para testar conexão
async function testConnection() {
  try {
    const users = await db.getUsers();
    console.log('✅ Conectado ao Supabase!', users);
    return true;
  } catch (error) {
    console.error('❌ Erro ao conectar:', error);
    return false;
  }
}

// Função para carregar projetos
async function loadProjects() {
  try {
    const projects = await db.getProjects();
    console.log('📊 Projetos:', projects);
    return projects;
  } catch (error) {
    console.error('Erro ao carregar projetos:', error);
    return [];
  }
}

// Função para carregar tarefas
async function loadTasks() {
  try {
    const tasks = await db.getTasks();
    console.log('✓ Tarefas:', tasks);
    return tasks;
  } catch (error) {
    console.error('Erro ao carregar tarefas:', error);
    return [];
  }
}

// Função para carregar métricas
async function loadMetrics() {
  try {
    const metrics = await db.getMetrics();
    console.log('📈 Métricas:', metrics);
    return metrics;
  } catch (error) {
    console.error('Erro ao carregar métricas:', error);
    return [];
  }
}

// Testar conexão ao carregar a página
document.addEventListener('DOMContentLoaded', async () => {
  console.log('🔄 Iniciando conexão com Supabase...');
  const connected = await testConnection();

  if (connected) {
    console.log('✅ Sistema pronto para usar!');
    // Carregar dados do banco
    await loadProjects();
    await loadTasks();
    await loadMetrics();
  } else {
    console.warn('⚠️ Banco de dados indisponível - modo offline');
  }
});
