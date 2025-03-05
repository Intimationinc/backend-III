export interface IPaymentProcessor {
  pay(paymentDto: PaymentDto): void;
}

export enum PAYMENT {
  SSL = "ssl",
  BKASH = "bkash",
  BANK = "bank",
}

export interface PaymentDto {
  type: PAYMENT;
}
