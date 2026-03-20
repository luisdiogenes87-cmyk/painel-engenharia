# Sistema SLA Diego 🚀

Um sistema completo de monitoramento de SLA (Service Level Agreement) e Ordens de Serviço desenvolvido com **Python (FastAPI)**, **PostgreSQL (Supabase)** e **Frontend responsivo (HTML/CSS/JavaScript)**.

## 📋 Características

- ✅ **Dashboard em tempo real** com métricas SLA
- ✅ **Gerenciamento de Ordens de Serviço**
- ✅ **API RESTful completa**
- ✅ **Interface responsiva** (Desktop, Tablet, Mobile)
- ✅ **Integração com Supabase PostgreSQL**
- ✅ **Tema escuro moderno** com design futurista

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Framework Python moderno
- **Supabase** - PostgreSQL gerenciado
- **Pydantic** - Validação de dados
- **Uvicorn** - Servidor ASGI

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Design responsivo
- **Vanilla JavaScript** - Sem dependências
- **Fetch API** - Requisições HTTP

## 📁 Estrutura do Projeto

```
projeto-sla-diego/
├── backend/
│   ├── app.py              # Aplicação FastAPI principal
│   ├── config.py           # Configurações
│   ├── database.py         # Conexão Supabase
│   ├── models.py           # Modelos Pydantic
│   ├── routes/
│   │   ├── os_routes.py    # Rotas de Ordens de Serviço
│   │   └── sla_routes.py   # Rotas de SLA
│   └── requirements.txt
├── frontend/
│   ├── index.html          # Página principal
│   ├── css/
│   │   ├── styles.css      # Estilos principais
│   │   └── responsive.css  # Estilos responsivos
│   ├── js/
│   │   ├── app.js          # Lógica principal
│   │   └── api.js          # Cliente API
│   └── assets/             # Imagens, ícones, etc
├── .env                    # Variáveis de ambiente
└── README.md
```

## 🚀 Como Começar

### 1. **Pré-requisitos**
- Python 3.8+
- pip ou conda
- Conta Supabase

### 2. **Instalação**

```bash
# Navegar para a pasta backend
cd backend

# Instalar dependências
pip install -r requirements.txt
```

### 3. **Configurar Variáveis de Ambiente**

Editar `.env`:
```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua-chave-publica
DATABASE_URL=postgresql://usuario:senha@host:porta/banco
FLASK_ENV=development
DEBUG=True
```

### 4. **Criar Tabelas no Supabase**

Execute este SQL no Supabase:

```sql
-- Tabela de Ordens de Serviço
CREATE TABLE ordens_servico (
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
    descricao TEXT
);

-- Tabela de Métricas SLA
CREATE TABLE sla_metrics (
    id SERIAL PRIMARY KEY,
    assunto VARCHAR(255) NOT NULL,
    quantidade INTEGER DEFAULT 0,
    cumprimento_percentual FLOAT DEFAULT 0,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Usuários
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    role VARCHAR(20) DEFAULT 'user',
    ativo BOOLEAN DEFAULT true,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. **Iniciar Backend**

```bash
python app.py
```

Backend estará disponível em: `http://localhost:8000`

### 6. **Abrir Frontend**

Abrir o arquivo `frontend/index.html` no navegador ou servir via HTTP.

## 📚 API Endpoints

### Ordens de Serviço

```
GET    /api/os              # Listar todas as OS
GET    /api/os/{id}         # Obter uma OS específica
POST   /api/os              # Criar nova OS
PUT    /api/os/{id}         # Atualizar OS
DELETE /api/os/{id}         # Deletar OS
```

### SLA

```
GET    /api/sla/metrics          # Obter métricas SLA
GET    /api/sla/dashboard        # Dashboard SLA
GET    /api/sla/por-assunto      # SLA por assunto
```

### Saúde

```
GET    /api/health          # Health check
GET    /api               # Informações da API
```

## 📱 Responsividade

O sistema é totalmente responsivo:

- **Desktop** (1024px+): Layout completo com sidebar
- **Tablet** (768px - 1023px): Layout adaptado
- **Mobile** (480px - 767px): Menu colapsável
- **Small Mobile** (-479px): Interface otimizada

## 🎨 Design

- **Tema Escuro**: Reduz fadiga ocular
- **Cores Acentuadas**: Cyan, Green, Amber, Red para status
- **Animações Suaves**: Transições elegantes
- **Grid Background**: Efeito visual moderno

## 🔐 Segurança

⚠️ **Importante**: Esta é uma versão de desenvolvimento. Para produção:

- [ ] Implementar autenticação JWT
- [ ] Adicionar rate limiting
- [ ] Usar HTTPS
- [ ] Validação CORS adequada
- [ ] Secrets em variáveis de ambiente seguras

## 📊 Dados de Exemplo

Para testar, insira dados de exemplo no Supabase:

```sql
INSERT INTO ordens_servico (numero, assunto, status, prioridade, responsavel, sla_hours, cumprimento_sla)
VALUES
    ('OS001', 'Instalação de fibra óptica', 'concluida', 'alta', 'Diego Matias', 24, true),
    ('OS002', 'Manutenção de rede', 'em_andamento', 'media', 'Luis', 48, true),
    ('OS003', 'Upgrade de equipamento', 'pendente', 'baixa', 'João', 72, false);
```

## 🐛 Troubleshooting

### API não conecta
- Verificar se FastAPI está rodando em `http://localhost:8000`
- Confirmar credenciais do Supabase
- Verificar variáveis de ambiente

### Dados não carregam
- Abrir Console do Navegador (F12)
- Verificar erros na aba Network
- Confirmar tabelas criadas no Supabase

### CORS Error
- Adicionar origem no `app.py`
- Verificar `allow_origins` em CORS middleware

## 📞 Contato

Desenvolvido por **Diego Matias** - Brasil Digital

## 📄 Licença

MIT License - Sinta-se livre para usar e modificar!

---

**Última atualização**: 20/03/2026
