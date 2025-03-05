import { IPaymentProcessor, PaymentDto } from "./payment.dto";

export class BkashPayment implements IPaymentProcessor {
  constructor() {}

  pay(paymentDto: PaymentDto) {}
}
