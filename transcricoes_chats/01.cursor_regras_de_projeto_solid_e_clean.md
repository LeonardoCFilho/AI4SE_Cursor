# Regras de projeto SOLID e Clean Code
_Exported on 2/2/2026 at 02:19:17 GMT-3 from Cursor (2.4.27)_

---

**User**

Crie uma Cursor Rule de projeto para:

1. Implemente os 5 princípios SOLID com exemplos práticos:
   - **S**ingle Responsibility: componentes com uma única responsabilidade
   - **O**pen/Closed: usar composição para extensibilidade
   - **L**iskov Substitution: subtipos devem ser substituíveis
   - **I**nterface Segregation: interfaces específicas
   - **D**ependency Inversion: depender de abstrações

2. Defina regras de Clean Code:
   - Funções com máximo 20 linhas
   - Máximo 3 parâmetros (usar objetos para mais)
   - Nomes descritivos (evitar data, temp, x)
   - Early returns ao invés de else
   - Sem números mágicos (usar constantes)
   - Evitar nested ternaries

3. Para cada princípio, forneça um exemplo BOM e um exemplo RUIM

4. Configure como "alwaysApply: true"


---

**Cursor**

Vou criar a Cursor Rule com os princípios SOLID e regras de Clean Code.

Cursor Rule criada com sucesso em `.cursor/rules/solid-clean-code.mdc`. A regra inclui:

**Princípios SOLID com exemplos:**
- **Single Responsibility**: Separação de `UserManager` em serviços focados
- **Open/Closed**: Strategy pattern para pagamentos extensíveis
- **Liskov Substitution**: Hierarquia correta de `Bird` com interfaces
- **Interface Segregation**: Interfaces `Workable`, `Feedable` em vez de `Worker` monolítica
- **Dependency Inversion**: Injeção de `Database` e `Mailer` abstratos

**Regras de Clean Code:**
- Funções com máximo 20 linhas
- Máximo 3 parâmetros (usar objetos)
- Nomes descritivos (evitar `data`, `temp`, `x`)
- Early returns em vez de else aninhados
- Constantes em vez de números mágicos
- Sem ternários aninhados

Cada princípio e regra tem exemplos `❌ RUIM` e `✅ BOM` para referência clara. A configuração `alwaysApply: true` garante que essas diretrizes sejam aplicadas em todas as conversas do projeto.

---

**User**

Crie uma Cursor Rule de projeto para:

1. Exija JSDoc/TSDoc para todas as funções, componentes e hooks exportados

2. Defina o template de documentação:
   - Descrição breve da função/componente
   - @param para cada parâmetro com tipo e descrição
   - @returns com tipo e descrição do retorno
   - @example com exemplo de uso prático
   - @throws se lança exceções

3. Exija comentários inline para:
   - Lógica de negócio complexa
   - Cálculos não-óbvios
   - Workarounds temporários (com FIXME/TODO)

4. Configure como "alwaysApply: true"


---

**Cursor**

Cursor Rule criada em `.cursor/rules/documentation-standards.mdc`. A regra inclui:

**Requisitos de Documentação:**
- JSDoc/TSDoc obrigatório para funções, componentes, hooks e classes exportadas

**Template Completo:**
- Descrição breve
- `@param` com tipo e descrição
- `@returns` com tipo e descrição
- `@throws` para exceções
- `@example` com código funcional

**Exemplos Práticos:**
- Função `calculateDiscount` com documentação completa
- Componente React `UserCard` com props documentadas
- Hook `useDebounce` com exemplo de uso

**Comentários Inline:**
- Lógica de negócio complexa (com contexto)
- Cálculos e fórmulas (com explicação matemática)
- Prefixos padronizados: `TODO`, `FIXME`, `HACK`, `NOTE`

**Checklist** para validação rápida da documentação.

Agora você tem 2 regras no projeto:
- `solid-clean-code.mdc` - Princípios SOLID e Clean Code
- `documentation-standards.mdc` - Padrões de documentação

---

**User**

Crie uma Cursor Rule de projeto para:

1. Defina estrutura modular para cada feature (ex: rooms/, guests/, reservations/):
   - api/           (chamadas de API)
   - components/    (componentes UI)
   - hooks/         (lógica de negócio)
   - types/         (tipos TypeScript)
   - schemas/       (validações)
   - index.ts       (exports públicos)

2. Estabeleça regras de dependência:
   - Módulos NÃO podem importar diretamente de outros módulos
   - Cada módulo exporta API pública via index.ts
   - Dependências fluem: components → hooks → api

3. Configure para aplicar em "src/modules/**/*" com "alwaysApply: false"


---

**Cursor**

Cursor Rule criada em `.cursor/rules/modular-architecture.mdc`. A regra inclui:

**Estrutura de Feature:**
```
src/modules/{feature}/
├── api/          # Chamadas de API
├── components/   # Componentes UI
├── hooks/        # Lógica de negócio
├── types/        # Tipos TypeScript
├── schemas/      # Validações
└── index.ts      # Exports públicos
```

**Regras de Dependência:**
- Fluxo: `components → hooks → api → types/schemas`
- Módulos importam de outros módulos **apenas** via `index.ts`
- Imports na direção inversa são proibidos

**Exemplos de Imports:**
- `✅` Componente importa hook: `import { useRooms } from '../hooks'`
- `✅` Entre módulos via API pública: `import { useGuests } from '@/modules/guests'`
- `❌` Import direto de outro módulo: `import { useGuests } from '../guests/hooks'`

**Comunicação Entre Módulos:**
- Via props/callbacks
- Via contexto compartilhado (`src/contexts/`)
- Via event bus (`src/lib/events.ts`)

**Configuração:** `globs: src/modules/**/*` com `alwaysApply: false` - ativa apenas ao trabalhar em arquivos dentro de `src/modules/`.

Agora você tem 3 regras no projeto:
- `solid-clean-code.mdc` - SOLID e Clean Code (sempre ativa)
- `documentation-standards.mdc` - Documentação JSDoc (sempre ativa)
- `modular-architecture.mdc` - Arquitetura modular (ativa em `src/modules/`)

---

**User**

Crie uma Cursor Rule de projeto para:

1. Exija TypeScript strict mode:
   - PROIBIDO usar 'any' (usar 'unknown' se necessário)
   - Tipos explícitos para retorno de funções
   - Usar type narrowing ao invés de type assertions
   - Preferir interfaces para objetos, types para unions

2. Exija tratamento de erros tipado com try-catch

3. Configure como "alwaysApply: true"


---

**Cursor**

Cursor Rule criada em `.cursor/rules/typescript-strict.mdc`. A regra inclui:

**Proibições e Alternativas:**
- `❌ any` → `✅ unknown` + type narrowing
- `❌ Type assertions` (`as Type`) → `✅ Type guards` (`instanceof`, `in`)
- `❌ Retorno inferido` → `✅ Retorno explícito` em funções exportadas

**Interface vs Type:**
- `interface` para objetos e classes (extensível)
- `type` para unions, tuples e tipos utilitários

**Tratamento de Erros Tipado:**
- Classes de erro customizadas (`ApiError`, `ValidationError`)
- Try-catch com verificação de tipo via `instanceof`
- Result Pattern como alternativa (`{ success: true, data }`)

**Exemplos práticos:**
- Type guard customizado `isUser(obj): obj is User`
- Catch tipado com fallback para erros desconhecidos
- Result pattern para erros esperados

Agora você tem 4 regras no projeto:

| Arquivo | Escopo | Descrição |
|---------|--------|-----------|
| `solid-clean-code.mdc` | Sempre | SOLID e Clean Code |
| `documentation-standards.mdc` | Sempre | JSDoc/TSDoc |
| `typescript-strict.mdc` | Sempre | TypeScript strict mode |
| `modular-architecture.mdc` | `src/modules/**/*` | Arquitetura modular |

---

**User**

Crie uma Cursor Rule de projeto para:

1. Defina a pirâmide de testes:
   - 70% Unit Tests
   - 20% Integration Tests
   - 10% E2E Tests

2. Estabeleça metas de cobertura mínima:
   - Statements: ≥ 80%
   - Branches: ≥ 75%
   - Functions: ≥ 80%
   - Lines: ≥ 80%

3. Defina critérios de entrada:
   - Dependências instaladas
   - Ambiente configurado
   - Dados de teste prontos

4. Defina critérios de saída:
   - Todos os testes passando
   - Cobertura mínima atingida
   - Sem bugs críticos

5. Especifique convenção de nomenclatura:
   describe('Component', () => {
     describe('when scenario', () => {
       it('should behavior', () => {});
     });
   });

6. Configure para aplicar em "**/*.test.ts", "**/*.test.tsx" com "alwaysApply: false"


---

**Cursor**

Cursor Rule criada em `.cursor/rules/testing-standards.mdc`. A regra inclui:

**Pirâmide de Testes:**
- 70% Unit Tests (funções, hooks, componentes)
- 20% Integration Tests (módulos, APIs)
- 10% E2E Tests (fluxos críticos)

**Metas de Cobertura:**
| Métrica | Mínimo |
|---------|--------|
| Statements | ≥ 80% |
| Branches | ≥ 75% |
| Functions | ≥ 80% |
| Lines | ≥ 80% |

**Critérios de Entrada/Saída:**
- Entrada: dependências, ambiente, dados de teste
- Saída: testes passando, cobertura atingida, sem bugs críticos

**Convenção de Nomenclatura:**
```typescript
describe('Component', () => {
  describe('when scenario', () => {
    it('should behavior', () => {});
  });
});
```

**Padrão AAA:** Arrange → Act → Assert

**Exemplos práticos** para cada tipo de teste (unit, integration, E2E).

**Configuração:** `globs: "**/*.test.{ts,tsx}"` com `alwaysApply: false` - ativa apenas ao trabalhar em arquivos de teste.

Agora você tem 5 regras no projeto:

| Arquivo | Escopo | Descrição |
|---------|--------|-----------|
| `solid-clean-code.mdc` | Sempre | SOLID e Clean Code |
| `documentation-standards.mdc` | Sempre | JSDoc/TSDoc |
| `typescript-strict.mdc` | Sempre | TypeScript strict mode |
| `modular-architecture.mdc` | `src/modules/**/*` | Arquitetura modular |
| `testing-standards.mdc` | `**/*.test.{ts,tsx}` | Padrões de testes |

---

**User**

Crie uma Cursor Rule de projeto para:

1. Defina padrão AAA (Arrange-Act-Assert) para todos os testes

2. Exija uso de fixtures/factories para dados de teste:
   export const createMock = (overrides?: Partial<Type>): Type => ({
     ...defaultData,
     ...overrides
   });

3. Defina cenários obrigatórios para cada feature:
   - Happy path (dados válidos)
   - Validação (dados inválidos)
   - Loading states
   - Error handling
   - Edge cases

4. Forneça templates para:
   - Testes de hooks (renderHook + waitFor)
   - Testes de componentes (render + userEvent)
   - Testes E2E (page.goto + page.click + expect)

5. Configure para aplicar em "**/*.test.ts", "**/*.test.tsx" com "alwaysApply: false"


---

**Cursor**

Cursor Rule criada em `.cursor/rules/testing-patterns.mdc`. A regra inclui:

**Padrão AAA:**
```typescript
// Arrange - preparar dados
// Act - executar ação
// Assert - verificar resultado
```

**Fixtures/Factories:**
```typescript
export const createUserMock = (overrides?: Partial<User>): User => ({
  ...defaultUser,
  ...overrides,
});
```

**Cenários Obrigatórios:**
- Happy path (dados válidos)
- Validação (dados inválidos)
- Loading states
- Error handling
- Edge cases (lista vazia, null, strings longas)

**Templates Completos:**
- **Hook Test**: `renderHook` + `waitFor` + `act`
- **Component Test**: `render` + `userEvent` + `screen`
- **E2E Test (Playwright)**: `page.goto` + `page.click` + `expect`

**Configuração:** `globs: "**/*.test.{ts,tsx}"` com `alwaysApply: false`

Agora você tem 6 regras no projeto:

| Arquivo | Escopo | Descrição |
|---------|--------|-----------|
| `solid-clean-code.mdc` | Sempre | SOLID e Clean Code |
| `documentation-standards.mdc` | Sempre | JSDoc/TSDoc |
| `typescript-strict.mdc` | Sempre | TypeScript strict mode |
| `modular-architecture.mdc` | `src/modules/**/*` | Arquitetura modular |
| `testing-standards.mdc` | `**/*.test.{ts,tsx}` | Pirâmide e cobertura |
| `testing-patterns.mdc` | `**/*.test.{ts,tsx}` | AAA, fixtures, templates |

---

**User**

Crie uma Cursor Rule de projeto para:

1. Defina checklist de verificação:
   - ✅ Funções têm máximo 20 linhas
   - ✅ Componentes têm máximo 200 linhas
   - ✅ Todos exports têm JSDoc/TSDoc
   - ✅ Sem 'any' types
   - ✅ Tratamento de erros implementado
   - ✅ Testes escritos (80% coverage)
   - ✅ Sem código duplicado

2. Para cada violação, forneça sugestão de refatoração com exemplo ANTES/DEPOIS

3. Configure como "alwaysApply: false" com description "code review and refactoring suggestions"


---

**Cursor**

Cursor Rule criada em `.cursor/rules/code-review-checklist.mdc`. A regra inclui:

**Checklist de Verificação:**
| Item | Limite | Ação |
|------|--------|------|
| Linhas por função | ≤ 20 | Extrair funções auxiliares |
| Linhas por componente | ≤ 200 | Extrair subcomponentes/hooks |
| Exports sem JSDoc | 0 | Adicionar documentação |
| Uso de `any` | 0 | Definir tipos ou `unknown` |
| Sem try-catch | 0 | Implementar error handling |
| Cobertura de testes | ≥ 80% | Escrever testes faltantes |
| Código duplicado | 0 | Extrair para utils/hooks |

**Exemplos ANTES/DEPOIS para cada violação:**
- Função longa → funções pequenas e focadas
- Componente monolítico → componentes compostos + hooks
- Sem JSDoc → documentação completa
- `any` → tipos definidos ou type guards
- Sem error handling → try-catch com erros tipados
- Sem testes → cobertura completa de cenários
- Código duplicado → utilitário reutilizável

**Configuração:** `alwaysApply: false` com description "Code review and refactoring suggestions" - pode ser referenciada manualmente quando necessário.

Agora você tem 7 regras no projeto:

| Arquivo | Escopo | Descrição |
|---------|--------|-----------|
| `solid-clean-code.mdc` | Sempre | SOLID e Clean Code |
| `documentation-standards.mdc` | Sempre | JSDoc/TSDoc |
| `typescript-strict.mdc` | Sempre | TypeScript strict mode |
| `modular-architecture.mdc` | `src/modules/**/*` | Arquitetura modular |
| `testing-standards.mdc` | `**/*.test.{ts,tsx}` | Pirâmide e cobertura |
| `testing-patterns.mdc` | `**/*.test.{ts,tsx}` | AAA, fixtures, templates |
| `code-review-checklist.mdc` | Manual | Code review e refatoração |

---

**User**

Crie uma Cursor Rule de projeto para:

1. Defina o stack tecnológico completo:
   - React 18+ com TypeScript (strict mode)
   - Material-UI para componentes
   - React Query para data fetching
   - React Hook Form + Zod para validação
   - Vitest + React Testing Library + Playwright para testes

2. Especifique estrutura de pastas raiz:
   src/
   ├── modules/       (features)
   ├── shared/        (código compartilhado)
   └── types/         (tipos globais)

3. Configure como "alwaysApply: true"


---

**Cursor**

Cursor Rule criada em `.cursor/rules/tech-stack.mdc`. A regra inclui:

**Stack Tecnológico:**

| Categoria | Tecnologias |
|-----------|-------------|
| Core | React 18+, TypeScript 5+ (strict), Vite 5+ |
| UI | Material-UI, @emotion/react |
| Data Fetching | React Query, Axios |
| Forms | React Hook Form + Zod |
| Testes | Vitest, Testing Library, MSW, Playwright |

**Estrutura de Pastas:**
```
src/
├── modules/     # Features (auth, users, rooms...)
├── shared/      # Componentes, hooks, utils compartilhados
├── types/       # Tipos globais
├── styles/      # Tema e estilos
└── test/        # Setup de testes
```

**Exemplos de Uso:**
- Material-UI com `sx` prop e theme
- React Query com `useQuery` e `useMutation`
- React Hook Form + Zod com `zodResolver`
- Configuração do Vitest com coverage thresholds

**Convenções de Import e Aliases:**
- `@/*` → `src/*`
- `@/modules/*` → `src/modules/*`
- `@/shared/*` → `src/shared/*`

Agora você tem 8 regras no projeto:

| Arquivo | Escopo | Descrição |
|---------|--------|-----------|
| `tech-stack.mdc` | Sempre | Stack e estrutura |
| `solid-clean-code.mdc` | Sempre | SOLID e Clean Code |
| `documentation-standards.mdc` | Sempre | JSDoc/TSDoc |
| `typescript-strict.mdc` | Sempre | TypeScript strict |
| `modular-architecture.mdc` | `src/modules/**/*` | Arquitetura modular |
| `testing-standards.mdc` | `**/*.test.{ts,tsx}` | Pirâmide e cobertura |
| `testing-patterns.mdc` | `**/*.test.{ts,tsx}` | AAA, fixtures, templates |
| `code-review-checklist.mdc` | Manual | Code review |

---

**User**

Crie uma Cursor Rule de projeto para:

Quando solicitado criar um novo módulo, gerar automaticamente:

1. **Código-fonte**:
   - types/ (interfaces TypeScript)
   - schemas/ (validações Zod)
   - api/ (funções de API)
   - hooks/ (custom hooks)
   - components/ (UI components)
   - index.ts (exports)

2. **Documentação**:
   - JSDoc em todas as funções exportadas
   - README.md do módulo
   - Exemplos de uso

3. **Testes**:
   - Testes unitários (hooks)
   - Testes de componentes
   - Testes E2E (fluxo completo)

4. Para cada artefato, aplicar padrões definidos nas outras rules (SOLID, Clean Code, TypeScript Strict)

5. Configure como "alwaysApply: false" com description "complete artifact generation for new features"


---

**Cursor**

Cursor Rule criada em `.cursor/rules/module-generator.mdc`. A regra inclui:

**Estrutura Completa de Módulo:**
```
src/modules/{moduleName}/
├── types/           # Interfaces TypeScript
├── schemas/         # Validações Zod
├── api/             # Funções de API
├── hooks/           # Custom hooks
├── components/      # UI components
├── __tests__/       # Testes organizados
├── README.md        # Documentação
└── index.ts         # Exports públicos
```

**Templates Prontos:**

| Artefato | Conteúdo |
|----------|----------|
| **Types** | `{ModuleName}`, `Create/Update Input`, `Filters`, `Status` |
| **Schemas** | Validação Zod com tipos inferidos |
| **API** | CRUD completo com JSDoc |
| **Hooks** | `use{ModuleName}s`, `useCreate/Update/Delete` |
| **Components** | `List`, `Form`, `Card` com MUI |
| **Tests** | Unit (hooks), Component (RTL), E2E (Playwright) |
| **README** | Documentação com exemplos de uso |
| **Index** | Exports organizados |

**Padrões Aplicados:**
- JSDoc em todas as funções exportadas
- Padrão AAA nos testes
- React Query para data fetching
- Zod + React Hook Form para validação
- Material-UI para componentes

Agora você tem 9 regras no projeto:

| Arquivo | Escopo | Descrição |
|---------|--------|-----------|
| `tech-stack.mdc` | Sempre | Stack e estrutura |
| `solid-clean-code.mdc` | Sempre | SOLID e Clean Code |
| `documentation-standards.mdc` | Sempre | JSDoc/TSDoc |
| `typescript-strict.mdc` | Sempre | TypeScript strict |
| `modular-architecture.mdc` | `src/modules/**/*` | Arquitetura modular |
| `testing-standards.mdc` | `**/*.test.{ts,tsx}` | Pirâmide e cobertura |
| `testing-patterns.mdc` | `**/*.test.{ts,tsx}` | AAA, fixtures, templates |
| `code-review-checklist.mdc` | Manual | Code review |
| `module-generator.mdc` | Manual | Geração de módulos |

