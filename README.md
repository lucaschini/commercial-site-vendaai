# 🚀 VendaAI - Frontend

Sistema de gestão de vendas com IA integrada. Interface moderna construída com Next.js 15 e TypeScript.

> **Backend:** [https://github.com/lucaschini/vendaai](https://github.com/lucaschini/vendaai)

---

## 🎯 Sobre

VendaAI é uma plataforma completa para gestão de vendas B2B e B2C com assistente de IA integrado. O sistema oferece:

- Dashboard com métricas em tempo real
- Gestão de clientes e leads
- Controle de vendas e conversões
- Análise de chamadas com IA
- Histórico de interações
- Sugestões inteligentes durante vendas

---

## 🏗️ Arquitetura

### Padrão de Comunicação
```
┌─────────────┐      ┌──────────────┐      ┌──────────────┐
│  Next.js    │ ───> │  API Routes  │ ───> │   FastAPI    │
│  Frontend   │ <─── │  (Proxy)     │ <─── │   Backend    │
└─────────────┘      └──────────────┘      └──────────────┘
     │                      │
     │                      │
     └──────────────────────┘
            │
     HttpOnly Cookies
       (Autenticação)
```

### Padrões Utilizados

- **API Routes**: Proxy seguro entre frontend e backend
- **Context API**: Gerenciamento de estado global (autenticação)
- **Custom Hooks**: Reutilização de lógica (useAuth)
- **Middleware**: Proteção de rotas autenticadas
- **Dual Client**: Suporte para Web App e Chrome Extension

---

## 🛠️ Tecnologias

- **Framework:** Next.js 15 (App Router)
- **Linguagem:** TypeScript
- **Estilo:** Tailwind CSS
- **Gráficos:** Recharts
- **Autenticação:** HttpOnly Cookies
- **Requisições:** Fetch API nativa

---

## 📦 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Backend rodando ([ver repositório](https://github.com/lucaschini/vendaai))

---

## 🚀 Instalação
```bash
# Clonar repositório
git clone https://github.com/lucaschini/commercial-site-vendaai.git
cd commercial-site-vendaai

# Instalar dependências
npm install
```

---

## ⚙️ Configuração

Crie o arquivo `.env.local` na raiz:
```env
BACKEND_API_URL=http://localhost:8000
```

---

## ▶️ Execução

### Desenvolvimento
```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## 📁 Estrutura do Projeto
```
src/
├── app/
│   ├── api/                    # API Routes (proxy para backend)
│   │   ├── auth/              # Autenticação
│   │   ├── clientes/          # CRUD de clientes
│   │   ├── vendas/            # CRUD de vendas
│   │   ├── chamadas/          # CRUD de chamadas
│   │   ├── historico-chat/    # Chat com IA
│   │   └── sugestoes/         # Sugestões da IA
│   │
│   ├── dashboard/             # Páginas do sistema
│   │   ├── page.tsx           # Dashboard principal
│   │   ├── clientes/          # Gestão de clientes
│   │   ├── vendas/            # Gestão de vendas
│   │   ├── chamadas/          # Lista de chamadas
│   │   └── historico/         # Histórico de chat
│   │
│   ├── login/                 # Página de login
│   ├── register/              # Página de registro
│   └── page.tsx               # Landing page
│
├── components/                # Componentes reutilizáveis
│   └── Loading.tsx
│
├── contexts/                  # Context API
│   └── AuthContext.tsx        # Contexto de autenticação
│
├── lib/                       # Bibliotecas e utilitários
│   └── api-dual.ts            # Cliente API (Web + Extension)
│
├── types/                     # Tipos TypeScript
│   └── api.ts                 # Interfaces do backend
│
└── middleware.ts              # Proteção de rotas
```
---

## 🤝 Relacionamento com Backend

### API Routes (Next.js)
Todas as rotas do frontend fazem proxy para o backend:
```typescript
// Frontend: /api/clientes
// Backend: http://localhost:8000/clientes

// Frontend: /api/vendas
// Backend: http://localhost:8000/vendas
```

### Autenticação
1. Login no frontend
2. Backend retorna token JWT
3. Frontend salva em HttpOnly Cookie
4. Cookie enviado automaticamente em requisições
5. API Routes extraem token e repassam ao backend

---
