# 🚀 Guia de Instalação Detalhado

## Passo 1: Preparar o Ambiente Python

### Windows

```powershell
# Verificar Python instalado
python --version

# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
.\venv\Scripts\Activate.ps1

# Se houver erro de permissão, executar:
# Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### macOS/Linux

```bash
# Criar ambiente virtual
python3 -m venv venv

# Ativar ambiente virtual
source venv/bin/activate
```

## Passo 2: Instalar Dependências

```bash
# Navegar para pasta backend
cd backend

# Instalar requirements
pip install -r requirements.txt

# Verificar instalação
pip list
```

## Passo 3: Configurar Supabase

### 3.1 Criar Projeto Supabase

1. Ir para [supabase.com](https://supabase.com)
2. Clicar em "New Project"
3. Preencher dados do projeto
4. Criar projeto

### 3.2 Obter Credenciais

1. No dashboard Supabase, ir para **Settings > API**
2. Copiar:
   - **API URL** (SUPABASE_URL)
   - **Public Key/Anonymous Key** (SUPABASE_KEY)
3. Ir para **Database > Connection Strings**
4. Copiar PostgreSQL URL

### 3.3 Atualizar .env

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua-chave-publica-aqui
DATABASE_URL=postgresql://postgres:[senha]@db.seu-projeto.supabase.co:5432/postgres
FLASK_ENV=development
DEBUG=True
```

## Passo 4: Criar Tabelas no Banco

### Via Supabase Console

1. Abrir [Supabase Console](https://app.supabase.com)
2. Ir para **SQL Editor**
3. Clicar **New Query**
4. Copiar e executar este SQL:

```sql
-- Criar tabela de Ordens de Serviço
CREATE TABLE IF NOT EXISTS ordens_servico (
    id SERIAL PRIMARY KEY,
    numero VARCHAR(50) NOT NULL UNIQUE,
    assunto VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'pendente',
    prioridade VARCHAR(20) DEFAULT 'media',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_conclusao TIMESTAMP,
    responsavel VARCHAR(100),
    sla_hours INTEGER DEFAULT 24,
    cumprimento_sla BOOLEAN DEFAULT true,
    descricao TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de Métricas SLA
CREATE TABLE IF NOT EXISTS sla_metrics (
    id SERIAL PRIMARY KEY,
    assunto VARCHAR(255) NOT NULL UNIQUE,
    quantidade INTEGER DEFAULT 0,
    cumprimento_percentual FLOAT DEFAULT 0,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de Usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    role VARCHAR(20) DEFAULT 'user',
    ativo BOOLEAN DEFAULT true,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_os_status ON ordens_servico(status);
CREATE INDEX IF NOT EXISTS idx_os_assunto ON ordens_servico(assunto);
CREATE INDEX IF NOT EXISTS idx_os_responsavel ON ordens_servico(responsavel);

-- Habilitar RLS (Row Level Security) para segurança
ALTER TABLE ordens_servico ENABLE ROW LEVEL SECURITY;
ALTER TABLE sla_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

-- Criar políticas públicas de leitura (para desenvolvimento)
CREATE POLICY "Allow public read" ON ordens_servico
    FOR SELECT USING (true);

CREATE POLICY "Allow public read" ON sla_metrics
    FOR SELECT USING (true);

CREATE POLICY "Allow public read" ON usuarios
    FOR SELECT USING (true);
```

## Passo 5: Iniciar Backend

```bash
# Certifique-se de estar na pasta backend
cd backend

# Iniciar servidor FastAPI
python app.py

# Ou usar uvicorn diretamente
uvicorn app:app --reload

# Saída esperada:
# INFO:     Uvicorn running on http://0.0.0.0:8000
# INFO:     Application startup complete
```

## Passo 6: Testar API

### Via Browser

Abrir: `http://localhost:8000/docs`

Você verá a documentação interativa Swagger!

### Via Terminal

```bash
# Health check
curl http://localhost:8000/api/health

# Listar OS (vazio no início)
curl http://localhost:8000/api/os

# Criar OS
curl -X POST http://localhost:8000/api/os \
  -H "Content-Type: application/json" \
  -d '{
    "numero": "OS001",
    "assunto": "Teste",
    "status": "pendente",
    "prioridade": "alta",
    "responsavel": "Diego",
    "sla_hours": 24
  }'
```

## Passo 7: Abrir Frontend

### Opção A: Arquivo Local (Simples)

```bash
# Navegar até frontend
cd frontend

# Abrir index.html no navegador
# Windows:
start index.html

# macOS:
open index.html

# Linux:
xdg-open index.html
```

### Opção B: Servidor Local (Melhor)

```bash
# Usar Python HTTP Server
cd frontend
python -m http.server 3000

# Abrir: http://localhost:3000
```

### Opção C: Live Server (VS Code)

1. Instalar extensão "Live Server"
2. Clicar direito no `index.html`
3. "Open with Live Server"

## 🧪 Inserir Dados de Teste

### Via Supabase Console

```sql
INSERT INTO ordens_servico (numero, assunto, status, prioridade, responsavel, sla_hours, cumprimento_sla, descricao) VALUES
('OS-001', 'Instalação Fibra Óptica', 'concluida', 'alta', 'Diego Matias', 24, true, 'Instalação de fibra óptica no setor 14'),
('OS-002', 'Manutenção de Rede', 'em_andamento', 'media', 'Luis Carlos', 48, true, 'Manutenção preventiva de equipamentos'),
('OS-003', 'Upgrade de Servidor', 'pendente', 'alta', 'João Silva', 72, false, 'Upgrade de processador no servidor principal'),
('OS-004', 'Reparo de Cabo', 'concluida', 'media', 'Diego Matias', 12, true, 'Reparo de cabo de comunicação'),
('OS-005', 'Instalação de Switch', 'em_andamento', 'media', 'Luis Carlos', 48, true, 'Instalação de novo switch no prédio B');

INSERT INTO sla_metrics (assunto, quantidade, cumprimento_percentual) VALUES
('Instalação Fibra Óptica', 5, 100),
('Manutenção de Rede', 3, 85),
('Upgrade de Servidor', 2, 50),
('Reparo de Cabo', 10, 95),
('Instalação de Switch', 4, 75);
```

### Via Dashboard

1. Abrir aplicação no navegador
2. Clicar em "Ordens de Serviço"
3. Clicar "+ Nova OS"
4. Preencher formulário

## ⚙️ Configurações Avançadas

### CORS (Para múltiplos domínios)

Editar `backend/app.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:8080",
        "https://seu-dominio.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Conectar com Domínio Remoto

Editar `frontend/js/api.js`:

```javascript
const API_URL = 'https://seu-api.com/api';  // Ao invés de localhost
```

### Deploy no Vercel (Frontend)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel
```

### Deploy no Heroku (Backend)

```bash
# Instalar Heroku CLI
# Fazer login
heroku login

# Criar app
heroku create seu-app-nome

# Deploy
git push heroku main
```

## 🔍 Debugging

### Ver logs do Servidor

O servidor mostra logs em tempo real no terminal.

### Abrir Console do Navegador

Pressionar `F12` ou `Ctrl+Shift+I`

### Network Inspection

1. Abrir Dev Tools (`F12`)
2. Ir para aba **Network**
3. Fazer requisição
4. Ver detalhes da requisição/resposta

### Erro 500 no Backend

Verificar:
- Terminal onde server está rodando
- Variáveis de ambiente (.env)
- Credenciais Supabase

### Erro CORS

Verificar:
- `allow_origins` em app.py
- URL do frontend está na lista?

## ✅ Checklist Final

- [ ] Python 3.8+ instalado
- [ ] Ambiente virtual criado e ativado
- [ ] Dependências instaladas (`pip install -r requirements.txt`)
- [ ] Credenciais Supabase em `.env`
- [ ] Tabelas criadas no Supabase
- [ ] Backend rodando em `http://localhost:8000`
- [ ] Frontend aberto e conectando
- [ ] Dados de teste inseridos
- [ ] API respondendo requisições
- [ ] Dashboard carregando dados

## 🆘 Precisa de Ajuda?

Se encontrar problemas:

1. Verificar `.env` - credenciais estão corretas?
2. Verificar Network tab - API está respondendo?
3. Verificar Console - há erros JavaScript?
4. Verificar Backend logs - há erros Python?
5. Reconstruir virtual env - `pip install -r requirements.txt --force-reinstall`

---

**Sistema pronto para usar!** 🎉
