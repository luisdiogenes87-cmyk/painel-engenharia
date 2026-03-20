# 🚀 Guia de Setup Completo

Siga este guia para colocar seu projeto no ar em menos de 30 minutos.

---

## 📋 Passo 1: Preparar o Repositório GitHub

### 1.1 Inicializar Git (se ainda não estiver feito)
```bash
cd "C:\Users\luisdiogenes\Documents\01 - Projetos\projeto sla_ Diego"
git config user.email "seu-email@example.com"
git config user.name "Seu Nome"
```

### 1.2 Adicionar todos os arquivos
```bash
git add .
git commit -m "chore: initial project setup with Next.js and Supabase"
```

### 1.3 Criar repositório no GitHub
1. Acesse https://github.com/new
2. Nome: `painel-engenharia`
3. Descrição: `Painel de Engenharia - Brasil Digital`
4. Clique em **Create repository**

### 1.4 Conectar e fazer push
```bash
git remote add origin https://github.com/seu-usuario/painel-engenharia.git
git branch -M main
git push -u origin main
```

---

## 🗄️ Passo 2: Configurar Supabase

### 2.1 Criar Projeto
1. Acesse https://app.supabase.com
2. Clique em **New project**
3. Preencha:
   - **Project name**: `painel-engenharia`
   - **Database Password**: Use uma senha forte (copie em um lugar seguro)
   - **Region**: Selecione `South America (São Paulo)` se disponível, ou a mais próxima
4. Clique em **Create new project**
5. Aguarde 3-5 minutos

### 2.2 Criar o Schema do Banco
1. No painel do Supabase, clique em **SQL Editor** (menu esquerdo)
2. Clique em **New Query**
3. Copie todo o conteúdo do arquivo `database.sql`
4. Cole na query do Supabase
5. Clique em **Run**

Se tudo correu bem, você verá mensagens de sucesso.

### 2.3 Obter Credenciais
1. Clique em **Settings** (ícone de engrenagem)
2. Clique em **API** no menu esquerdo
3. Copie:
   - **Project URL** (em `URL`)
   - **anon public** key (em `anon key`)

---

## 🌐 Passo 3: Deploy no Vercel

### 3.1 Conectar Vercel com GitHub
1. Acesse https://vercel.com
2. Faça login com sua conta GitHub
3. Clique em **Add New** → **Project**
4. Clique em **Import Git Repository**
5. Busque por `painel-engenharia`
6. Clique em **Import**

### 3.2 Configurar Environment Variables
1. Na página do projeto no Vercel, vá para **Settings**
2. Clique em **Environment Variables**
3. Adicione as seguintes variáveis:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Cole a URL do Supabase (ex: `https://xxxxx.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Cole a chave anônima do Supabase |

4. Clique em **Save**

### 3.3 Deploy
1. Clique em **Deploy**
2. Aguarde o build completar (2-3 minutos)
3. Seu site estará em: `https://seu-projeto.vercel.app`

---

## ✅ Verificação Final

### Testar o Site
1. Acesse sua URL do Vercel
2. Você deve ver o painel com o logo "SLA" e a hora do sistema

### Testar Conexão com Supabase
1. Abra o navegador DevTools (F12)
2. Vá para a aba **Console**
3. Você não deve ver erros relacionados ao Supabase

---

## 📝 Variáveis de Ambiente Locais

Para desenvolver localmente:

1. Crie um arquivo `.env.local` na raiz do projeto
2. Copie o conteúdo de `.env.local.example`
3. Preencha com suas credenciais do Supabase:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

---

## 🔄 Fluxo de Desenvolvimento

Para fazer mudanças:

```bash
# 1. Faça alterações no código
# 2. Teste localmente
npm run dev

# 3. Commit e push
git add .
git commit -m "feat: sua mudança aqui"
git push

# 4. Vercel fará deploy automaticamente!
```

---

## 🚨 Troubleshooting

### "Module not found: @supabase/supabase-js"
```bash
npm install @supabase/supabase-js
```

### Variáveis de ambiente não carregam
1. Certifique-se de usar `NEXT_PUBLIC_` para variáveis públicas
2. Reinicie o dev server após adicionar variáveis locais

### Erro de conexão com Supabase
1. Verifique se as credenciais estão corretas
2. Certifique-se de que o projeto Supabase está ativo
3. Teste a URL abrindo em uma nova aba

---

## 📚 Recursos Úteis

- **Next.js**: https://nextjs.org/docs
- **Supabase**: https://supabase.com/docs
- **Vercel**: https://vercel.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs/

---

## 💡 Próximos Passos

1. **Autenticação**: Configure Supabase Auth
2. **RLS Policies**: Customize as políticas de segurança
3. **UI Components**: Adicione componentes ao painel
4. **Data Fetching**: Conecte dados reais do banco

---

Parabéns! Seu projeto está no ar! 🎉
