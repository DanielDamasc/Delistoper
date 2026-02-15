# 📋 deLISToper

Um sistema de gerenciamento de projetos e tarefas baseado em Kanban. Desenvolvido com uma arquitetura moderna, separando o Frontend em React e o Backend em NestJS, focado em uma excelente UI/UX e performance.

## 🚀 Tecnologias Utilizadas

**Frontend:**
* **React** (com React Router DOM)
* **Tailwind CSS** (Estilização responsiva e design system)
* **@hello-pangea/dnd** (Drag and Drop para os cards do Kanban)
* **Lucide React** (Icons)
* **Axios** (Integração otimizada com a API)

**Backend:**
* **NestJS** (Framework Node.js com arquitetura modular)
* **Prisma ORM** (Modelagem de dados e migrations na versão 7+)
* **PostgreSQL** (Banco de dados relacional com `@prisma/adapter-pg`)
* **Bcrypt** (Criptografia segura de senhas)
* **JWT** (Autenticação e proteção de rotas via AuthGuard)

## ✨ Principais Funcionalidades

* **Autenticação Segura:** Login de usuários com validação de dados via DTOs e senhas em hash.
* **Gestão de Projetos:** Criação, listagem e exclusão de projetos.
* **Quadro Kanban Interativo:** Arraste e solte (Drag & Drop) de tarefas entre as colunas "A Fazer", "Em Andamento" e "Concluído".
* **Gestão de Tarefas:** Cards detalhados com título, descrição, tags de prioridade visuais (Alta, Média, Baixa) e formatação precisa de datas.
