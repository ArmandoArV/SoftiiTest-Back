/*
  Made by: Armando Arredondo Valle
  Date: 22/10/2024

*/

import connection from "../helpers/mysql-config";
import { IShift } from "../interfaces/IShift";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";

const shiftService = {
  getShifts: async (): Promise<IShift[]> => {
    const conn = await connection.getConnection();
    const [data] = await conn.query<RowDataPacket[]>("SELECT * FROM Shift");
    conn.release();
    return data as IShift[];
  },

  getShift: async (id: number): Promise<IShift | null> => {
    const conn = await connection.getConnection();
    const [data] = await conn.query<RowDataPacket[]>(
      "SELECT * FROM Shift WHERE idShift = ?",
      [id]
    );
    conn.release();

    // Return null if no shift is found
    if (data.length === 0) {
      return null;
    }

    return data[0] as IShift;
  },

  addShift: async (shift: IShift): Promise<number> => {
    const conn = await connection.getConnection();
    const [data] = await conn.query<ResultSetHeader>(
      "INSERT INTO Shift (dateShift, totalTips) VALUES (?, ?)",
      [shift.dateShift, shift.totalTips]
    );
    conn.release();
    return data.insertId;
  },

  updateShift: async (id: number, shift: IShift): Promise<void> => {
    const conn = await connection.getConnection();
    await conn.query(
      "UPDATE Shift SET dateShift = ?, totalTips = ? WHERE idShift = ?",
      [shift.dateShift, shift.totalTips, id]
    );
    conn.release();
  },

  deleteShift: async (id: number): Promise<void> => {
    const conn = await connection.getConnection();
    await conn.query("DELETE FROM Shift WHERE idShift = ?", [id]);
    conn.release();
  },
};

export default shiftService;