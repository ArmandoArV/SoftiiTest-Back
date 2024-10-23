/*
  Made by: Armando Arredondo Valle
  Date: 22/10/2024

*/
import connection from "../helpers/mysql-config";
import { IPaymentMethod } from "../interfaces/IPaymentMethod";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";

const paymentService = {
  getPaymentMethods: async (): Promise<IPaymentMethod[]> => {
    const conn = await connection.getConnection();
    const [data] = await conn.query<RowDataPacket[]>(
      "SELECT * FROM PaymentMethod"
    );
    conn.release();
    return data as IPaymentMethod[];
  },

  getPaymentMethod: async (id: number): Promise<IPaymentMethod | null> => {
    const conn = await connection.getConnection();
    const [data] = await conn.query<RowDataPacket[]>(
      "SELECT * FROM PaymentMethod WHERE idPaymentMethod = ?",
      [id]
    );
    conn.release();

    // Return null if no payment method is found
    if (data.length === 0) {
      return null;
    }

    return data[0] as IPaymentMethod;
  },

  addPaymentMethod: async (paymentMethod: IPaymentMethod): Promise<number> => {
    const conn = await connection.getConnection();
    const [data] = await conn.query<ResultSetHeader>(
      "INSERT INTO PaymentMethod (namePaymentMethod) VALUES (?)",
      [paymentMethod.methodName]
    );
    conn.release();
    return data.insertId;
  },

  updatePaymentMethod: async (
    id: number,
    paymentMethod: IPaymentMethod
  ): Promise<void> => {
    const conn = await connection.getConnection();
    await conn.query(
      "UPDATE PaymentMethod SET namePaymentMethod = ? WHERE idPaymentMethod = ?",
      [paymentMethod.methodName, id]
    );
    conn.release();
  },

  deletePaymentMethod: async (id: number): Promise<void> => {
    const conn = await connection.getConnection();
    await conn.query("DELETE FROM PaymentMethod WHERE idPaymentMethod = ?", [
      id,
    ]);
    conn.release();
  },
};


export default paymentService;