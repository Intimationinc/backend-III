import { PaymentDto } from "./payment.dto";
import { PaymentFactory } from "./payment.factory";

export class Payment {
  private paymentFactory: PaymentFactory;

  constructor() {
    this.paymentFactory = new PaymentFactory();
  }

  paymentProcess(paymentDto: PaymentDto) {
    return this.paymentFactory.paymentProcess(paymentDto);
  }
}
