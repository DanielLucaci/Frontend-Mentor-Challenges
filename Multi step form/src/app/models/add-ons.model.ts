export class AddOn {
  constructor(
    public id: string,
    private name: string,
    private description: string,
    public price: {
      monthly: number,
      yearly: number
    }) { }
}
