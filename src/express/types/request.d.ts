import { Request } from "express";
export interface URLParameter extends Request {
  /**
   * ?url=... or &url=...
   */
  url: string;
}
