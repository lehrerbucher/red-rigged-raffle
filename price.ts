export class Price {
  constructor(
    private description: string,
    private amount: number,
  ) {}

  public get name(): string {
    return this.description;
  }

  public get units(): number {
    return this.amount;
  }

  public set units(neuerHase: number) {
    this.amount = neuerHase;
  }
}
