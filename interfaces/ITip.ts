import { IPaymentMethod } from "./IPaymentMethod";
import { IShift } from "./IShift";

export interface ITip {
  idTip: number;
  amount: string;
  paymentMethod: IPaymentMethod;
  shift: IShift;
}
