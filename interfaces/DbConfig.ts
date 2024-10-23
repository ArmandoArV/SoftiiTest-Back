export interface DbConfig {
  connectionLimit: number;
  host: string | undefined;
  user: string | undefined;
  // password: string | undefined;
  database: string | undefined;
  port?: number;
}
