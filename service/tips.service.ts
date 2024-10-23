/*
  Made by: Armando Arredondo Valle
  Date: 22/10/2024
*/

import connection from "../helpers/mysql-config";
import { ITip } from "../interfaces/ITip";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";

const tipService = {
  getTips: async (): Promise<ITip[]> => {
    const conn = await connection.getConnection();
    const [data] = await conn.query<RowDataPacket[]>("SELECT * FROM Tip");
    conn.release();
    return data as ITip[];
  },

  getTip: async (id: number): Promise<ITip | null> => {
    const conn = await connection.getConnection();
    const [data] = await conn.query<RowDataPacket[]>(
      "SELECT * FROM Tip WHERE idTip = ?",
      [id]
    );
    conn.release();

    if (data.length === 0) {
      return null;
    }

    return data[0] as ITip;
  },

  // Add a new tip
  addTip: async (tip: ITip): Promise<number> => {
    const conn = await connection.getConnection();
    const [data] = await conn.query<ResultSetHeader>(
      "INSERT INTO Tip (amount, PaymentMethod_idPaymentMethod, Shift_idShift) VALUES (?, ?, ?)",
      [tip.amount, tip.paymentMethod.idPaymentMethod, tip.shift.idShift]
    );
    conn.release();
    return data.insertId;
  },

  updateTip: async (id: number, tip: ITip): Promise<void> => {
    const conn = await connection.getConnection();
    await conn.query(
      "UPDATE Tip SET amount = ?, PaymentMethod_idPaymentMethod = ?, Shift_idShift = ? WHERE idTip = ?",
      [tip.amount, tip.paymentMethod.idPaymentMethod, tip.shift.idShift, id]
    );
    conn.release();
  },

  deleteTip: async (id: number): Promise<void> => {
    const conn = await connection.getConnection();
    await conn.query("DELETE FROM Tip WHERE idTip = ?", [id]);
    conn.release();
  },

  // Distribute tips among employees
  distributeTips: async (
    shiftId: number,
    totalTips: number,
    employeeCount: number
  ): Promise<void> => {
    const conn = await connection.getConnection();
    const tipPerEmployee = (totalTips / employeeCount).toFixed(2);

    const [employees] = await conn.query<RowDataPacket[]>(
      "SELECT idEmployee FROM Employee LIMIT ?",
      [employeeCount]
    );

    // Distribute tips to each employee
    for (const employee of employees) {
      await conn.query<ResultSetHeader>(
        "INSERT INTO TipDistribution (amount, Employee_idEmployee, Tip_idTip) VALUES (?, ?, ?)",
        [tipPerEmployee, employee.idEmployee, shiftId]
      );
    }

    conn.release();
  },

  handleUndividedTips: async (
    shiftId: number,
    totalTips: number
  ): Promise<void> => {
    const conn = await connection.getConnection();

    await conn.query<ResultSetHeader>(
      "INSERT INTO TipDistribution (amount, Employee_idEmployee, Tip_idTip) VALUES (?, NULL, ?)",
      [totalTips, shiftId]
    );

    conn.release();
  },
};

export default tipService;
