# 📋 CLAUDE.md - Documentação para Atualizações do Projeto

Este arquivo documenta toda a estrutura, configuração e instruções para atualizar o **Painel Engenharia - Brasil Digital** usando Claude Code.

---

## 🎯 Resumo do Projeto

**Nome:** Painel Engenharia - Brasil Digital
**URL ao Vivo:** https://painel-engenharia.vercel.app
**Repositório:** https://github.com/luisdiogenes87-cmyk/painel-engenharia
**Stack:** Next.js + Supabase + Vercel
**Status:** ✅ Em produção

---

## 🗂️ Estrutura do Projeto

```
projeto sla_ Diego/
├── app/
│   ├── layout.tsx              # Layout principal (Next.js)
│   ├── page.tsx                # Página raiz (carrega dashboard.html)
│   ├── page.module.css         # Estilos da página
│   └── api/
│       └── health/
│           └── route.ts        # Health check endpoint
├── public/
│   ├── dashboard.html          # Painel principal (HTML completo)
│   ├── index.html              # Versão alternativa
│   ├── logo-bd.svg             # Logo Brasil Digital
│   └── supabase-connect.js     # Script de conexão com Supabase
├── lib/
│   └── supabase.ts             # Cliente Supabase
├── package.json                # Dependências
├── next.config.js              # Configuração Next.js
├── tsconfig.json               # Configuração TypeScript
├── vercel.json                 # Configuração Vercel
├── database.sql                # Schema do banco de dados
├── .env.local.example          # Variáveis de exemplo
├── README.md                   # Documentação geral
├── SETUP.md                    # Guia de setup
├── SUPABASE_GUIDE.md           # Guia do Supabase
└── CLAUDE.md                   # Este arquivo
```

---

## 🔧 Configuração Atual

### Variáveis de Ambiente (Supabase)
```
NEXT_PUBLIC_SUPABASE_URL=https://kunymezqdhilyddibawt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1bnltZXpxZGhpbHlkZGliYXd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MzE3ODksImV4cCI6MjA4ODMwNzc4OX0.v_KbU6_XxuOMxeRmK7gVgK8DFk1VpDisIyoQVmZmNlQ
```

### Tabelas do Banco de Dados
- `users` - Usuários do sistema
- `projects` - Projetos de engenharia
- `tasks` - Tarefas e SLAs
- `metrics` - Métricas e indicadores
- `activity_logs` - Log de atividades

---

## 🚀 Como Atualizar o Projeto

### 1️⃣ Modificar o Dashboard (HTML/CSS)

O painel está em `/public/dashboard.html`. Para atualizar:

```bash
# 1. Editar o arquivo
C:\Users\luisdiogenes\Documents\01 - Projetos\projeto sla_ Diego\public\dashboard.html

# 2. Fazer commit
git add public/dashboard.html
git commit -m "feat: atualizar dashboard"

# 3. Push para GitHub (auto-deploy no Vercel)
git push
```

### 2️⃣ Modificar Estilos/Design

**CSS:** Está dentro do `<style>` tag em `dashboard.html`
**Logo:** `/public/logo-bd.svg` (arquivo SVG)

Para atualizar o logo:
```bash
# Editar logo-bd.svg e fazer push
git add public/logo-bd.svg
git commit -m "feat: atualizar logo"
git push
```

### 3️⃣ Adicionar Funcionalidades JavaScript

Adicione código em `/public/supabase-connect.js`:

```javascript
// Exemplo: Nova função para buscar dados
async function loadNewData() {
  try {
    const data = await db.query('sua_tabela');
    console.log('Dados carregados:', data);
    return data;
  } catch (error) {
    console.error('Erro:', error);
    return [];
  }
}
```

### 4️⃣ Modificar o Backend (Next.js)

- **API Routes:** Adicione em `/app/api/[rota]/route.ts`
- **Páginas:** Edite em `/app/page.tsx` ou crie novas em `/app/`
- **Layouts:** Modifique `/app/layout.tsx`

### 5️⃣ Atualizar Banco de Dados

**Adicionar nova tabela:**
```sql
CREATE TABLE nova_tabela (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**No Supabase:**
1. Vá para SQL Editor
2. Cole o SQL
3. Clique RUN

---

## 📝 Fluxo de Trabalho para Atualizações

### Opção A: Atualizações Simples (HTML/CSS)
```bash
# 1. Editar arquivo localmente
# 2. Testar no navegador (abrir arquivo ou npm run dev)
# 3. Fazer commit e push
cd "C:\Users\luisdiogenes\Documents\01 - Projetos\projeto sla_ Diego"
git add .
git commit -m "feat: descrição da mudança"
git push

# Vercel faz deploy automaticamente em 2-3 minutos!
```

### Opção B: Atualizações com Banco de Dados
```bash
# 1. Atualizar SQL no Supabase
# 2. Atualizar código JavaScript em supabase-connect.js
# 3. Fazer commit
git add public/supabase-connect.js database.sql
git commit -m "feat: adicionar nova funcionalidade"
git push
```

### Opção C: Atualizações de Produção
```bash
# Sempre testar antes!
npm run dev
# Abra http://localhost:3000

# Se tudo OK:
git add .
git commit -m "feat: mudança para produção"
git push origin main
```

---

## 🐛 Troubleshooting

### Site não atualiza após push
- Aguarde 2-3 minutos (Vercel está fazendo build)
- Limpe cache do navegador (Ctrl+Shift+Del)
- Verifique em https://vercel.com/dashboard

### Supabase não conecta
- Verifique as variáveis de ambiente no Vercel
- Abra DevTools (F12) → Console
- Veja se há erro de conexão

### Arquivo HTML não aparece
- Certifique-se de que está em `/public/`
- Reinicie o dev server: `npm run dev`
- Verifique o nome do arquivo em `page.tsx`

---

## 📚 Arquivos Importantes

| Arquivo | Função | Quando Editar |
|---------|--------|---------------|
| `dashboard.html` | Painel visual | Design, layout, estrutura |
| `supabase-connect.js` | Conexão BD | Carregar/salvar dados |
| `logo-bd.svg` | Logo marca | Mudar identidade visual |
| `database.sql` | Schema BD | Adicionar/modificar tabelas |
| `app/page.tsx` | Página raiz | Mudar estrutura do site |

---

## 🔑 Credenciais e Configurações

**GitHub:** https://github.com/luisdiogenes87-cmyk/painel-engenharia
**Vercel:** https://vercel.com/dashboard
**Supabase:** https://app.supabase.com

### Conectar Novo Ambiente
Se precisar clonar o projeto em outro lugar:
```bash
git clone https://github.com/luisdiogenes87-cmyk/painel-engenharia.git
cd painel-engenharia
npm install
npm run dev
```

---

## 📋 Checklist para Atualizações

- [ ] Editar arquivo(s)
- [ ] Testar localmente (`npm run dev`)
- [ ] Fazer commit com mensagem clara
- [ ] Push para GitHub
- [ ] Verificar deploy no Vercel (2-3 min)
- [ ] Acessar URL e confirmar mudanças

---

## 🆘 Suporte Rápido

**Para adicionar:**
- Nova seção no painel → Edite `dashboard.html`
- Nova tabela no BD → Execute SQL no Supabase
- Nova função JS → Adicione em `supabase-connect.js`
- Novo endpoint API → Crie em `app/api/`

**Para remover:**
- Seção do painel → Delete HTML
- Tabela do BD → `DROP TABLE nome;` no SQL
- Função JS → Delete do arquivo
- Arquivo estático → Delete de `/public/`

**Próximo deploy:** `git push` → ~2-3 minutos no ar!

---

## 📞 Informações Úteis

- **Node version:** v18+
- **npm:** v9+
- **Next.js:** v16+
- **Supabase:** PostgreSQL 14+

---

**Última atualização:** 20 de Março de 2026
**Atualizado por:** Claude Code
**Status:** ✅ Projeto em produção e funcionando

---

## 🎓 Exemplos Rápidos

### Adicionar nova métrica ao painel
```html
<!-- Em dashboard.html, dentro de uma seção -->
<div class="kpi">
  <div class="kpi-lbl">Sua Métrica</div>
  <div class="kpi-val g">Valor</div>
  <div class="kpi-sub">subtítulo</div>
</div>
```

### Carregar dados do Supabase
```javascript
// Em supabase-connect.js
async function minhaFuncao() {
  const dados = await db.query('nome_tabela');
  console.log('Dados:', dados);
}
```

### Criar novo endpoint API
```typescript
// Em app/api/meu-endpoint/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ mensagem: 'Olá!' });
}
```

---

**Bom trabalho! Qualquer dúvida, essa documentação está aqui para ajudar! 🚀**
