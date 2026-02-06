# Power Apps Code App (React/Vite) — Guia Completo
### Local Play + Environments + Connections + Migração de projetos externos

Este repositório é um projeto **React + Vite** configurado para ser executado como **Power Apps Code App (preview)**.

**Principais capacidades:**
- 🚀 Rodar localmente como um app web normal (`npm run dev`);
- 📱 Rodar **dentro do player do Power Apps** via **Local Play**;
- 🔗 Conectar em **Conexões** do Power Platform (SharePoint, Office 365 Users, Dataverse);
- ☁️ Publicar no ambiente via `pac code push`.

> **Nota:** Este guia é focado em desenvolvimento no Windows usando PowerShell e VS Code.

## 📑 Sumário
1. [Pré-requisitos](#1-pré-requisitos)
2. [Rodar como web normal (Vite)](#2-rodar-como-web-normal-vite)
3. [Conectar no Power Platform](#3-conectar-no-power-platform-login--environment)
4. [Descobrir o Environment ID](#4-descobrir-o-environment-id)
5. [Habilitar Local Play (Projetos externos/Lovable)](#5-habilitar-local-play-em-projetos-externos-lovable-etc)
6. [Gerenciar Conexões](#6-listar-conexões-e-pegar-apiname--connectionid)
7. [Adicionar Data Sources](#7-adicionar-data-sources-office-365--sharepoint)
8. [Publicar (Build + Push)](#8-publicar-no-power-apps-build--push)
9. [Troubleshooting](#9-troubleshooting)
10. [Checklist de Fluxo](#10-fluxo-recomendado-checklist)
11. [Cheat Sheet (Comandos Rápidos)](#anexo-comandos-úteis-cola-rápida)

---

## 1) Pré-requisitos

### 1.1 Ferramentas necessárias
Certifique-se de ter instalado:
- **Node.js LTS**
- **Git**
- **Power Platform CLI (`pac`)**
- **VS Code**

Verifique as versões no terminal:
```bash
node -v
npm -v
git --version
pac --version
```

### 1.2 Acesso no Power Platform
Você precisa conseguir logar (`pac auth create`) e ter permissão de criação no Environment alvo.
> **Aviso:** Code Apps é um recurso em **preview**. Alguns tenants ou environments podem não ter essa funcionalidade habilitada.

## 2) Rodar como web normal (Vite)
Antes de configurar o Power Apps, garanta que o app funciona como um site React padrão.

Na raiz do projeto (onde está o `package.json`):
```bash
npm install
npm run dev
```
Abra a URL mostrada (ex.: `http://localhost:8080/`).

✅ **Se isso não funcionar, resolva os erros do React/Vite antes de avançar.**

## 3) Conectar no Power Platform (Login + Environment)

### 3.1 Login no tenant
```bash
pac auth create
```
*Dica: Se tiver múltiplas contas, confirme a conta correta durante o login no navegador.*

### 3.2 Selecionar o environment
Primeiro, descubra o ID (veja seção 4), depois rode:
```bash
pac env select --environment <ENV_GUID>
```

### 3.3 Confirmar conexão
```bash
pac env who
```

## 4) Descobrir o Environment ID

Você precisa do GUID do ambiente. Escolha um método:

* **Opção A (Pela URL - Mais rápido):**
    Acesse `https://make.powerapps.com`. A URL será:
    `https://make.powerapps.com/environments/<ENV_GUID>/...`
    O código entre as barras é o seu ID.

* **Opção B (Via CLI):**
    ```bash
    pac env list
    ```

* **Opção C (Admin Center):**
    Acesse o Power Platform Admin Center -> Environments -> Clique no ambiente -> Copie o "Environment ID".

## 5) Habilitar Local Play em projetos externos (Lovable, etc.)

Projetos gerados externamente (ex: Lovable) são apenas apps Vite puros. O "Local Play" não aparece nativamente. Para ativar, siga estes passos:

### 5.1 Instalar dependências do Power Apps
Na raiz do projeto:
```bash
npm install @microsoft/power-apps
npm install -D @microsoft/power-apps-vite
```

### 5.2 Inicializar como Code App
Isso gera o arquivo `power.config.json` na raiz.
```bash
pac code init --displayname "Nome do App"
```
*Nota: Se falhar dizendo que o recurso não está habilitado, é problema do environment/tenant.*

### 5.3 Configurar o plugin no `vite.config.ts`
Edite seu arquivo de configuração do Vite para incluir o plugin do Power Apps:

```typescript
// 1. Importe o plugin no topo
import { powerApps } from "@microsoft/power-apps-vite/plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // ou "@vitejs/plugin-react"

export default defineConfig({
  plugins: [
    react(),
    // 2. Adicione o plugin na lista
    powerApps(), 
  ],
  // 3. (Recomendado) Evite popups de firewall forçando localhost
  server: {
    host: "localhost",
    port: 8080,
    strictPort: true,
  }
});
```

### 5.4 Rodar e testar
```bash
npm run dev
```
Agora o terminal deve exibir uma linha escrita **Local Play**. Copie essa URL e abra no navegador (deve estar logado no mesmo tenant).

## 6) Listar conexões e pegar apiName + connectionId

Para adicionar dados, você precisa do `API Name` e do `Connection ID`.

### 6.1 Via CLI
```bash
pac connection list
```
Saída esperada:
* **API Name:** ex: `shared_sharepointonline`, `shared_office365users`
* **Connection ID:** GUID da conexão.

### 6.2 Via URL (Maker Portal)
Vá em **Connections** no portal (make.powerapps.com). Clique na conexão desejada (se não existir, crie uma).
A URL será algo como:
`.../connections/shared_office365users/2d456ca.../details`
* `apiName` = `shared_office365users`
* `connectionId` = `2d456ca...`

## 7) Adicionar Data Sources (Office 365 / SharePoint)

> **IMPORTANTE:** Code Apps usam conexões já existentes. Crie a conexão no portal antes de rodar os comandos abaixo.

### 7.1 Conector Não-Tabular (Ações)
Exemplo: Office 365 Users.
```bash
pac code add-data-source -a shared_office365users -c <CONNECTION_ID>
```

### 7.2 Conector Tabular (SharePoint)
Para SharePoint, o fluxo é: **Conexão -> Dataset (Site) -> Tabela (Lista)**.

1.  **Listar Datasets (Sites):**
    ```bash
    pac code list-datasets -a shared_sharepointonline -c <CONNECTION_ID>
    ```
2.  **Listar Tabelas (Listas do Site):**
    ```bash
    pac code list-tables -a shared_sharepointonline -c <CONNECTION_ID> -d <DATASET_NAME>
    ```
3.  **Adicionar a Lista como Data Source:**
    ```bash
    pac code add-data-source -a shared_sharepointonline -c <CONNECTION_ID> -d <DATASET_NAME> -t <TABLE_NAME>
    ```

### 7.3 Uso no Código
Após adicionar, o `pac` gera arquivos em `src/generated`. Use os serviços gerados para CRUD:
* `Service.getAll()`
* `Service.create(payload)`
* `Service.update(id, payload)`
* `Service.delete(id)`

## 8) Publicar no Power Apps (Build + Push)

Quando estiver pronto para enviar para o ambiente:

1.  **Build do projeto:**
    ```bash
    npm run build
    ```
2.  **Push para o environment:**
    ```bash
    pac code push
    ```

O app estará disponível na lista de Apps do Maker Portal (make.powerapps.com).

## 9) Troubleshooting

### Não aparece a URL "Local Play"
* Verifique se `power.config.json` existe na raiz.
* Verifique se `powerApps()` está importado e listado nos `plugins` do `vite.config.ts`.
* Garanta que rodou `npm install`.

### `pac code init` falha
* O recurso pode não estar habilitado no seu Tenant/Environment.
* Tente em um Developer Environment ou Sandbox com preview ativado.

### Erro de permissão no PowerShell (npx.ps1)
Se o Windows bloquear a execução de scripts:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
```

### Prompt de Firewall ao rodar `npm run dev`
Edite o `vite.config.ts` e force o host para localhost (veja seção 5.3).

## 10) Fluxo Recomendado (Checklist)

### 🚀 Migrando projeto existente (Lovable/React Puro)
1.  [ ] `npm install` e garantir que `npm run dev` funciona.
2.  [ ] `pac auth create` (Login).
3.  [ ] `pac env select` (Selecionar ambiente).
4.  [ ] Instalar pacotes: `npm i @microsoft/power-apps` e `npm i -D @microsoft/power-apps-vite`.
5.  [ ] `pac code init --displayname "Meu App"` (Gera config).
6.  [ ] Adicionar plugin `powerApps()` no `vite.config.ts`.
7.  [ ] `npm run dev` -> Testar URL do **Local Play**.
8.  [ ] Adicionar dados com `pac code add-data-source`.
9.  [ ] Build e Push (`npm run build`, `pac code push`).

## Anexo: Comandos Úteis (Cola Rápida)

```bash
# --- Autenticação e Ambiente ---
pac auth create
pac env list
pac env select --environment <ENV_GUID>
pac env who

# --- Configuração Code App ---
pac code init --displayname "Nome do App"
pac code push

# --- Gerenciamento de Dados ---
# 1. Listar conexões disponíveis
pac connection list

# 2. Adicionar fonte simples (ex: Office 365)
pac code add-data-source -a <API_NAME> -c <CONNECTION_ID>

# 3. Fluxo SharePoint
# Listar Sites
pac code list-datasets -a shared_sharepointonline -c <CONNECTION_ID>
# Listar Listas
pac code list-tables -a shared_sharepointonline -c <CONNECTION_ID> -d <DATASET_NAME>
# Adicionar Lista
pac code add-data-source -a shared_sharepointonline -c <CONNECTION_ID> -d <DATASET_NAME> -t <TABLE_NAME>
```