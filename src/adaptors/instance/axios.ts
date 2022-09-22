import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { JSendSuccessResponse } from "../../common/response";

export default class AxiosAPIAdapter {
  constructor(
    advancedOptions?: AxiosRequestConfig,
    extendSessionSetup?: (session: AxiosInstance) => void
  ) {
    this.session = axios.create({
      ...advancedOptions,
    });
    if (extendSessionSetup) {
      extendSessionSetup(this.session);
    }
  }

  async get<T>(route: string, config?: AxiosRequestConfig) {
    return this.session.get<JSendSuccessResponse<T>>(route, config);
  }

  async post<T>(route: string, body?: unknown, config?: AxiosRequestConfig) {
    return this.session.post<JSendSuccessResponse<T>>(route, body, config);
  }

  async put<T>(route: string, body?: unknown, config?: AxiosRequestConfig) {
    return this.session.put<JSendSuccessResponse<T>>(route, body, config);
  }

  async patch<T>(route: string, body?: unknown, config?: AxiosRequestConfig) {
    return this.session.patch<JSendSuccessResponse<T>>(route, body, config);
  }

  async delete<T>(route: string, config?: AxiosRequestConfig) {
    return this.session.delete<JSendSuccessResponse<T>>(route, config);
  }

  async binaryGet<T>(url: string, config?: AxiosRequestConfig) {
    return this.session.get<T>(url, config);
  }

  private session: AxiosInstance;
}
