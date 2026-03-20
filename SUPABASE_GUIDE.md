# 📚 Guia de Uso do Supabase

Este documento mostra como usar o Supabase na sua aplicação.

---

## 1️⃣ Fetching de Dados (GET)

### Exemplo: Buscar todos os projetos

```typescript
import { supabase } from '@/lib/supabase';

// Em um componente React
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ProjectsList() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*');

      if (error) {
        console.error('Erro:', error);
      } else {
        setProjects(data || []);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <ul>
      {projects.map(project => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  );
}
```

---

## 2️⃣ Inserir Dados (INSERT)

### Exemplo: Criar um novo projeto

```typescript
const { data, error } = await supabase
  .from('projects')
  .insert([
    {
      name: 'Meu Novo Projeto',
      description: 'Descrição do projeto',
      owner_id: 'uuid-do-usuario',
      status: 'active'
    }
  ])
  .select();

if (error) console.error('Erro:', error);
else console.log('Projeto criado:', data);
```

---

## 3️⃣ Atualizar Dados (UPDATE)

### Exemplo: Atualizar status de um projeto

```typescript
const { data, error } = await supabase
  .from('projects')
  .update({ status: 'completed' })
  .eq('id', 'id-do-projeto')
  .select();

if (error) console.error('Erro:', error);
else console.log('Projeto atualizado:', data);
```

---

## 4️⃣ Deletar Dados (DELETE)

### Exemplo: Deletar um projeto

```typescript
const { error } = await supabase
  .from('projects')
  .delete()
  .eq('id', 'id-do-projeto');

if (error) console.error('Erro:', error);
else console.log('Projeto deletado');
```

---

## 5️⃣ Queries Avançadas

### Com Filtros

```typescript
// Buscar tarefas concluídas
const { data } = await supabase
  .from('tasks')
  .select('*')
  .eq('status', 'completed')
  .gte('created_at', '2024-01-01');
```

### Com Joins (Relacionamentos)

```typescript
// Buscar projetos com suas tarefas
const { data } = await supabase
  .from('projects')
  .select(`
    *,
    tasks (
      id,
      title,
      status
    )
  `);
```

### Ordenação e Limite

```typescript
const { data } = await supabase
  .from('tasks')
  .select('*')
  .order('due_date', { ascending: true })
  .limit(10);
```

---

## 🔐 Autenticação (Futuro)

### Exemplo: Login com Email/Senha

```typescript
// Função para fazer login
const handleLogin = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Erro no login:', error);
  } else {
    console.log('Logado como:', data.user.email);
  }
};

// Função para logout
const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.error('Erro no logout:', error);
};

// Obter sessão atual
const { data: { session } } = await supabase.auth.getSession();
```

---

## 🔔 Real-time Subscriptions (Futuro)

### Exemplo: Escutar mudanças em tempo real

```typescript
const subscription = supabase
  .from('tasks')
  .on('*', payload => {
    console.log('Mudança detectada:', payload);
  })
  .subscribe();

// Para desinscrever
subscription.unsubscribe();
```

---

## ⚙️ Operadores de Filtro

| Operador | Exemplo | Descrição |
|----------|---------|-----------|
| `eq` | `.eq('status', 'active')` | Igual |
| `neq` | `.neq('status', 'deleted')` | Não igual |
| `gt` | `.gt('priority', 5)` | Maior que |
| `gte` | `.gte('priority', 5)` | Maior ou igual |
| `lt` | `.lt('priority', 5)` | Menor que |
| `lte` | `.lte('priority', 5)` | Menor ou igual |
| `like` | `.like('name', '%Diego%')` | Like SQL |
| `in` | `.in('status', ['active', 'pending'])` | Em lista |
| `is` | `.is('deleted_at', null)` | É nulo |

---

## 📊 Exemplo Completo: CRUD de Tarefas

```typescript
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Buscar tarefas
  const loadTasks = async () => {
    const { data } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    setTasks(data || []);
  };

  // Criar tarefa
  const createTask = async (title: string) => {
    const { data } = await supabase
      .from('tasks')
      .insert([{ title, status: 'pending', priority: 'medium' }])
      .select();

    if (data) setTasks([...tasks, data[0]]);
  };

  // Atualizar tarefa
  const updateTask = async (id: string, updates: any) => {
    const { data } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select();

    setTasks(tasks.map(t => t.id === id ? data?.[0] : t));
  };

  // Deletar tarefa
  const deleteTask = async (id: string) => {
    await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    setTasks(tasks.filter(t => t.id !== id));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div>
      <button onClick={() => createTask('Nova Tarefa')}>
        + Adicionar Tarefa
      </button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => deleteTask(task.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 🆘 Troubleshooting

### Erro: "Policies missing" ou "permission denied"
- Verifique se as políticas RLS estão configuradas no banco
- Certifique-se de que o usuário tem permissão para acessar os dados

### Erro: "Column not found"
- Verifique se a coluna existe na tabela
- Use `.select('*')` para listar todas as colunas disponíveis

### Erro: "Invalid foreign key"
- Certifique-se de que o ID referenciado existe
- Use IDs válidos ao inserir dados

---

## 📖 Recursos

- [Documentação Supabase JS](https://supabase.com/docs/reference/javascript)
- [Documentação PostgreSQL](https://www.postgresql.org/docs/)

---

Happy Coding! 🚀
