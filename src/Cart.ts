export interface PurchasableItem {
  readonly price: number;
  getFullInfo(): string;
}

export class Cart {
  private items: PurchasableItem[] = [];

  addItem(item: PurchasableItem): void {
    this.items.push(item);
  }

  removeItem(item: PurchasableItem): boolean {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }

  getItems(): readonly PurchasableItem[] {
    return [...this.items];
  }

  clear(): void {
    this.items = [];
  }

  getCount(): number {
    return this.items.length;
  }
}
