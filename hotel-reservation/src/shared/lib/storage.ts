/**
 * Serviço genérico para persistência de dados no LocalStorage.
 * Simula operações CRUD para entidades com ID único.
 *
 * @template T - Tipo da entidade que deve ter um campo 'id' string
 *
 * @example
 * ```typescript
 * interface User { id: string; name: string; }
 * const userStorage = new StorageService<User>('users');
 * const user = userStorage.create({ name: 'João' });
 * ```
 */
export class StorageService<T extends { id: string }> {
  private readonly key: string;

  constructor(key: string) {
    this.key = key;
  }

  /**
   * Retorna todos os itens armazenados.
   *
   * @returns Array de itens do tipo T
   */
  getAll(): T[] {
    const data = localStorage.getItem(this.key);
    if (!data) return [];

    try {
      return JSON.parse(data) as T[];
    } catch {
      return [];
    }
  }

  /**
   * Busca um item pelo ID.
   *
   * @param id - ID único do item
   * @returns O item encontrado ou undefined
   */
  getById(id: string): T | undefined {
    const items = this.getAll();
    return items.find((item) => item.id === id);
  }

  /**
   * Cria um novo item com ID gerado automaticamente.
   *
   * @param item - Dados do item sem o ID
   * @returns O item criado com ID
   */
  create(item: Omit<T, 'id'>): T {
    const items = this.getAll();
    const newItem = {
      ...item,
      id: crypto.randomUUID(),
    } as T;

    items.push(newItem);
    this.save(items);

    return newItem;
  }

  /**
   * Atualiza um item existente.
   *
   * @param id - ID do item a ser atualizado
   * @param updates - Campos a serem atualizados
   * @returns O item atualizado
   * @throws {Error} Se o item não for encontrado
   */
  update(id: string, updates: Partial<Omit<T, 'id'>>): T {
    const items = this.getAll();
    const index = items.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error(`Item with id ${id} not found`);
    }

    const updatedItem = { ...items[index], ...updates };
    items[index] = updatedItem;
    this.save(items);

    return updatedItem;
  }

  /**
   * Remove um item pelo ID.
   *
   * @param id - ID do item a ser removido
   * @throws {Error} Se o item não for encontrado
   */
  delete(id: string): void {
    const items = this.getAll();
    const index = items.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error(`Item with id ${id} not found`);
    }

    items.splice(index, 1);
    this.save(items);
  }

  /**
   * Limpa todos os itens do storage.
   */
  clear(): void {
    localStorage.removeItem(this.key);
  }

  private save(items: T[]): void {
    localStorage.setItem(this.key, JSON.stringify(items));
  }
}
