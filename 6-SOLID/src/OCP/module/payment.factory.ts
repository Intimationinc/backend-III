import { BkashPayment } from "./bkash-payment.service";
import { PAYMENT, PaymentDto } from "./payment.dto";
import { SSLPayment } from "./ssl-payment.service";

export class PaymentFactory {
  constructor() {}

  paymentProcess(paymentDto: PaymentDto) {
    if (paymentDto.type === PAYMENT.SSL) {
      return new SSLPayment().pay(paymentDto);
    } else if (paymentDto.type === PAYMENT.BKASH) {
      return new BkashPayment().pay(paymentDto);
    }
  }
}
