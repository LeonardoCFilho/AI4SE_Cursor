/**
 * Interface genérica de repositório para operações CRUD.
 * Segue o princípio de Inversão de Dependência (DIP) do SOLID.
 *
 * @template T - Tipo da entidade que deve ter um campo 'id' string
 *
 * @example
 * ```typescript
 * // Uso com StorageService
 * const userRepo: Repository<User> = new StorageService<User>('users');
 *
 * // Uso com API (futura implementação)
 * const userRepo: Repository<User> = new ApiRepository<User>('/users');
 * ```
 */
export interface Repository<T extends { id: string }> {
  /**
   * Retorna todos os itens.
   */
  getAll(): T[];

  /**
   * Busca um item pelo ID.
   *
   * @param id - ID único do item
   * @returns O item encontrado ou undefined
   */
  getById(id: string): T | undefined;

  /**
   * Cria um novo item.
   *
   * @param item - Dados do item sem o ID
   * @returns O item criado com ID
   */
  create(item: Omit<T, 'id'>): T;

  /**
   * Atualiza um item existente.
   *
   * @param id - ID do item a ser atualizado
   * @param updates - Campos a serem atualizados
   * @returns O item atualizado
   * @throws {Error} Se o item não for encontrado
   */
  update(id: string, updates: Partial<Omit<T, 'id'>>): T;

  /**
   * Remove um item pelo ID.
   *
   * @param id - ID do item a ser removido
   * @throws {Error} Se o item não for encontrado
   */
  delete(id: string): void;

  /**
   * Limpa todos os itens.
   */
  clear(): void;
}

/**
 * Factory para criar repositórios.
 * Permite trocar a implementação facilmente (LocalStorage, API, etc.).
 *
 * @template T - Tipo da entidade
 *
 * @example
 * ```typescript
 * // Registro da factory
 * const createGuestRepo = () => new StorageService<Guest>('guests');
 *
 * // Uso
 * const guestRepo = createGuestRepo();
 * ```
 */
export type RepositoryFactory<T extends { id: string }> = () => Repository<T>;
