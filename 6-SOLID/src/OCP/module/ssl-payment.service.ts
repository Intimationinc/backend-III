import { IPaymentProcessor, PaymentDto } from "./payment.dto";

export class SSLPayment implements IPaymentProcessor {
  constructor() {}

  pay(paymentDto: PaymentDto) {}
}
