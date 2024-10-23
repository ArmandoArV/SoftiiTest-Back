import connection from "../helpers/mysql-config";
import { IEmployee } from "../interfaces/IEmployee";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";

const employeeService = {
  getEmployees: async (): Promise<IEmployee[]> => {
    const conn = await connection.getConnection();
    const [data] = await conn.query<RowDataPacket[]>("SELECT * FROM Employee");
    conn.release();
    return data as IEmployee[];
  },

  getEmployee: async (id: number): Promise<IEmployee | null> => {
    const conn = await connection.getConnection();
    const [data] = await conn.query<RowDataPacket[]>(
      "SELECT * FROM Employee WHERE idEmployee = ?",
      [id]
    );
    conn.release();

    // Return null if no employee is found
    if (data.length === 0) {
      return null;
    }

    return data[0] as IEmployee;
  },

  addEmployee: async (employee: IEmployee): Promise<number> => {
    const conn = await connection.getConnection();
    const [data] = await conn.query<ResultSetHeader>(
      "INSERT INTO Employee (name) VALUES (?)",
      [employee.name]
    );
    conn.release();
    return data.insertId;
  },

  updateEmployee: async (id: number, employee: IEmployee): Promise<void> => {
    const conn = await connection.getConnection();
    await conn.query("UPDATE Employee SET name = ? WHERE idEmployee = ?", [
      employee.name,
      id,
    ]);
    conn.release();
  },

  deleteEmployee: async (id: number): Promise<void> => {
    const conn = await connection.getConnection();
    await conn.query("DELETE FROM Employee WHERE idEmployee = ?", [id]);
    conn.release();
  },
};

export default employeeService;
