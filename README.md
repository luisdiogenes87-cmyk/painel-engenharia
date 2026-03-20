# Painel Engenharia — Brasil Digital

Dashboard moderno para gestão de SLA e engenharia.

## 🚀 Deploy no Vercel

### Pré-requisitos
- Conta no [Vercel](https://vercel.com)
- Repositório GitHub com este projeto

### Passos para Deploy

1. **Push seu projeto para GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

2. **Importe seu repositório no Vercel**
   - Acesse https://vercel.com/new
   - Conecte sua conta GitHub
   - Selecione o repositório `projeto sla_ Diego`
   - Clique em **Import**

3. **Configure as variáveis de ambiente**
   - No painel do Vercel, vá para **Settings** → **Environment Variables**
   - Adicione:
     - `NEXT_PUBLIC_SUPABASE_URL` - URL do seu projeto Supabase
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Chave anônima do Supabase

4. **Deploy automático**
   - Vercel fará o build automaticamente
   - Seu site estará disponível em: `https://seu-projeto.vercel.app`

---

## 🗄️ Configurar Banco de Dados no Supabase

### Passo 1: Criar Projeto no Supabase

1. Acesse https://supabase.com
2. Clique em **New Project**
3. Preencha:
   - **Project name**: `painel-engenharia`
   - **Database password**: Crie uma senha forte
   - **Region**: Selecione a região mais próxima
4. Aguarde o projeto ser criado (2-3 minutos)

### Passo 2: Executar o Schema SQL

1. No painel do Supabase, vá para **SQL Editor**
2. Clique em **New Query**
3. Cole o conteúdo do arquivo `database.sql`
4. Clique em **Run**

### Passo 3: Obter as Credenciais

1. Vá para **Settings** → **API**
2. Copie:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Passo 4: Adicionar ao seu `.env.local`

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

---

## 💻 Desenvolver Localmente

```bash
# Instalar dependências
npm install

# Rodar dev server
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start
```

Acesse http://localhost:3000

---

## 📁 Estrutura do Projeto

```
projeto sla_ Diego/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página inicial
│   └── page.module.css     # Estilos
├── package.json            # Dependências
├── next.config.js          # Config Next.js
├── tsconfig.json           # Config TypeScript
├── vercel.json             # Config Vercel
├── database.sql            # Schema do BD
├── .env.local.example      # Variáveis de exemplo
└── README.md               # Este arquivo
```

---

## 🔑 Variáveis de Ambiente

| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave pública do Supabase |

---

## 📊 Tabelas do Banco de Dados

### users
- Usuários do sistema
- Campos: `id`, `email`, `name`, `role`, `created_at`, `updated_at`

### projects
- Projetos gerenciados
- Campos: `id`, `name`, `description`, `status`, `owner_id`, `created_at`, `updated_at`

### tasks
- Tarefas/SLAs
- Campos: `id`, `project_id`, `title`, `description`, `status`, `priority`, `assigned_to`, `due_date`, `created_at`, `updated_at`

### metrics
- Métricas e indicadores
- Campos: `id`, `project_id`, `metric_name`, `value`, `unit`, `recorded_at`, `created_at`

### activity_logs
- Log de atividades
- Campos: `id`, `user_id`, `action`, `description`, `entity_type`, `entity_id`, `created_at`

---

## 🔐 Row Level Security (RLS)

O banco de dados tem RLS habilitado para segurança. As policies já estão configuradas para:
- Usuários verem apenas seus próprios dados
- Donos de projetos gerenciarem suas tarefas
- Usuários acessarem tarefas atribuídas a eles

---

## 🆘 Suporte

Dúvidas? Verifique:
- [Documentação Next.js](https://nextjs.org)
- [Documentação Supabase](https://supabase.com/docs)
- [Documentação Vercel](https://vercel.com/docs)

---

**Criado com ❤️ para Brasil Digital**
