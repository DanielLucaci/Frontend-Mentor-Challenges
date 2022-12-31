export class Plan {
  constructor(
    public id: string,
    public name: string,
    public price: {
      monthly: number,
      yearly: number
    }) { }
}
