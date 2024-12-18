/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Company {
  /** ID */
  id?: number;
  /** Owner */
  owner?: string;
  /** Moderator */
  moderator?: string;
  /** Personalitys */
  personalitys?: string;
  /** Статус */
  status?: 1 | 2 | 3 | 4 | 5;
  /**
   * Дата создания
   * @format date-time
   */
  date_created?: string | null;
  /**
   * Дата формирования
   * @format date-time
   */
  date_formation?: string | null;
  /**
   * Дата завершения
   * @format date-time
   */
  date_complete?: string | null;
  /** Name */
  name?: string | null;
  /** Description */
  description?: string | null;
  /**
   * Accreditation
   * @min -2147483648
   * @max 2147483647
   */
  accreditation?: number | null;
}

export interface PersonalityCompany {
  /** ID */
  id?: number;
  /**
   * Count
   * @min -2147483648
   * @max 2147483647
   */
  count?: number;
  /** Personality */
  personality?: number | null;
  /** Company */
  company?: number | null;
}

export interface UpdateCompanyStatusAdmin {
  /** Status */
  status: number;
}

export interface PersonalityAdd {
  /**
   * Название
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Описание
   * @minLength 1
   * @maxLength 500
   */
  description: string;
  /**
   * Тип лица
   * @min -2147483648
   * @max 2147483647
   */
  type: number;
  /**
   * Фото
   * @format uri
   */
  image?: string | null;
}

export interface Personality {
  /** ID */
  id?: number;
  /** Image */
  image?: string;
  /**
   * Название
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Описание
   * @minLength 1
   * @maxLength 500
   */
  description: string;
  /** Статус */
  status?: 1 | 2;
  /**
   * Тип лица
   * @min -2147483648
   * @max 2147483647
   */
  type: number;
  /**
   * ИНН/ОГРН
   * @minLength 1
   */
  number: string;
}

export interface UserLogin {
  /**
   * Username
   * @minLength 1
   */
  username: string;
  /**
   * Password
   * @minLength 1
   */
  password: string;
}

export interface UserRegister {
  /** ID */
  id?: number;
  /**
   * Адрес электронной почты
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Пароль
   * @minLength 1
   * @maxLength 128
   */
  password: string;
  /**
   * Имя пользователя
   * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
}

export interface UserProfile {
  /**
   * Username
   * @minLength 1
   */
  username?: string;
  /**
   * Email
   * @minLength 1
   */
  email?: string;
  /**
   * Password
   * @minLength 1
   */
  password?: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8000/api" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://localhost:8000/api
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  companys = {
    /**
     * No description
     *
     * @tags companys
     * @name CompanysList
     * @request GET:/companys/
     * @secure
     */
    companysList: (
      query?: {
        status?: number;
        date_formation_start?: string;
        date_formation_end?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/companys/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags companys
     * @name CompanysRead
     * @request GET:/companys/{company_id}/
     * @secure
     */
    companysRead: (companyId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/companys/${companyId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags companys
     * @name CompanysDeleteDelete
     * @request DELETE:/companys/{company_id}/delete/
     * @secure
     */
    companysDeleteDelete: (companyId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/companys/${companyId}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags companys
     * @name CompanysDeletePersonalityDelete
     * @request DELETE:/companys/{company_id}/delete_personality/{personality_id}/
     * @secure
     */
    companysDeletePersonalityDelete: (companyId: string, personalityId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/companys/${companyId}/delete_personality/${personalityId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags companys
     * @name CompanysUpdateUpdate
     * @request PUT:/companys/{company_id}/update/
     * @secure
     */
    companysUpdateUpdate: (companyId: string, data: Company, params: RequestParams = {}) =>
      this.request<Company, any>({
        path: `/companys/${companyId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags companys
     * @name CompanysUpdatePersonalityUpdate
     * @request PUT:/companys/{company_id}/update_personality/{personality_id}/
     * @secure
     */
    companysUpdatePersonalityUpdate: (
      companyId: string,
      personalityId: string,
      data: PersonalityCompany,
      params: RequestParams = {},
    ) =>
      this.request<PersonalityCompany, any>({
        path: `/companys/${companyId}/update_personality/${personalityId}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags companys
     * @name CompanysUpdateStatusAdminUpdate
     * @request PUT:/companys/{company_id}/update_status_admin/
     * @secure
     */
    companysUpdateStatusAdminUpdate: (companyId: string, data: UpdateCompanyStatusAdmin, params: RequestParams = {}) =>
      this.request<UpdateCompanyStatusAdmin, any>({
        path: `/companys/${companyId}/update_status_admin/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags companys
     * @name CompanysUpdateStatusUserUpdate
     * @request PUT:/companys/{company_id}/update_status_user/
     * @secure
     */
    companysUpdateStatusUserUpdate: (companyId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/companys/${companyId}/update_status_user/`,
        method: "PUT",
        secure: true,
        ...params,
      }),
  };
  personalitys = {
    /**
     * No description
     *
     * @tags personalitys
     * @name PersonalitysList
     * @request GET:/personalitys/
     * @secure
     */
    personalitysList: (
      query?: {
        personality_name?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/personalitys/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags personalitys
     * @name PersonalitysCreateCreate
     * @request POST:/personalitys/create/
     * @secure
     */
    personalitysCreateCreate: (
      data: {
        /**
         * @minLength 1
         * @maxLength 100
         */
        name: string;
        /**
         * @minLength 1
         * @maxLength 500
         */
        description: string;
        /**
         * @min -2147483648
         * @max 2147483647
         */
        type: number;
        /** @format binary */
        image?: File | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<PersonalityAdd, any>({
        path: `/personalitys/create/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags personalitys
     * @name PersonalitysRead
     * @request GET:/personalitys/{personality_id}/
     * @secure
     */
    personalitysRead: (personalityId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/personalitys/${personalityId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags personalitys
     * @name PersonalitysAddToCompanyCreate
     * @request POST:/personalitys/{personality_id}/add_to_company/
     * @secure
     */
    personalitysAddToCompanyCreate: (personalityId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/personalitys/${personalityId}/add_to_company/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags personalitys
     * @name PersonalitysDeleteDelete
     * @request DELETE:/personalitys/{personality_id}/delete/
     * @secure
     */
    personalitysDeleteDelete: (personalityId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/personalitys/${personalityId}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags personalitys
     * @name PersonalitysUpdateUpdate
     * @request PUT:/personalitys/{personality_id}/update/
     * @secure
     */
    personalitysUpdateUpdate: (personalityId: string, data: Personality, params: RequestParams = {}) =>
      this.request<Personality, any>({
        path: `/personalitys/${personalityId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags personalitys
     * @name PersonalitysUpdateImageCreate
     * @request POST:/personalitys/{personality_id}/update_image/
     * @secure
     */
    personalitysUpdateImageCreate: (
      personalityId: string,
      data: {
        /** @format binary */
        image?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/personalitys/${personalityId}/update_image/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags users
     * @name UsersLoginCreate
     * @request POST:/users/login/
     * @secure
     */
    usersLoginCreate: (data: UserLogin, params: RequestParams = {}) =>
      this.request<UserLogin, any>({
        path: `/users/login/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersLogoutCreate
     * @request POST:/users/logout/
     * @secure
     */
    usersLogoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/logout/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersRegisterCreate
     * @request POST:/users/register/
     * @secure
     */
    usersRegisterCreate: (data: UserRegister, params: RequestParams = {}) =>
      this.request<UserRegister, any>({
        path: `/users/register/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersUpdateUpdate
     * @request PUT:/users/{user_id}/update/
     * @secure
     */
    usersUpdateUpdate: (userId: string, data: UserProfile, params: RequestParams = {}) =>
      this.request<UserProfile, any>({
        path: `/users/${userId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
