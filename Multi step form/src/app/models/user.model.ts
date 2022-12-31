export class User {
  selectedPlanId: string = "";
  selectedAddOns: string[] = [];

  constructor(
    public name: string,
    public email: string,
    public phone: string,
    public period: string = 'monthly') { }
}
