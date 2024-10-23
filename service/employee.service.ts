import connection from "../helpers/mysql-config";
import { IEmployee } from "../interfaces/IEmployee";
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

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
};

export default employeeService;
