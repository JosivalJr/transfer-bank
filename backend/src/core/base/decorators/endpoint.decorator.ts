import {
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Type,
  applyDecorators,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';

import { EndpointMethod } from '../enums/endpoint-method.enum';
import { FindManyResponse } from '../utils/find-many-reponse-doc';

interface IEndpointResponse {
  status: number;
  findManyModel?: Type<unknown>;
  description: string;
  response?: Function;
}

interface IEndpointData {
  url: string;
  description: string;
  dtoName?: string;
  withoutLogin?: boolean;
  responses: Array<IEndpointResponse>;
}

interface IEndpointBaseData extends IEndpointData {
  type: EndpointMethod;
}

export class Endpoint {
  private static base({
    type,
    url,
    description,
    dtoName,
    responses,
    withoutLogin,
  }: IEndpointBaseData) {
    const decorators = [
      this.defineMethod(type, url),
      ...this.defineResponses(responses, withoutLogin, !!dtoName),
      ApiOperation({
        summary: description,
        description: this.createDescription(description, dtoName),
      }),
    ];

    return applyDecorators(...decorators);
  }

  private static defineMethod(type: EndpointMethod, url: string) {
    switch (type) {
      case EndpointMethod.GET:
        return applyDecorators(Get(url));
      case EndpointMethod.POST:
        return applyDecorators(Post(url));
      case EndpointMethod.PATCH:
        return applyDecorators(Patch(url));
      case EndpointMethod.PUT:
        return applyDecorators(Put(url));
      case EndpointMethod.DELETE:
        return applyDecorators(Delete(url));
      default:
        throw new Error(`Unsupported method type: ${type}`);
    }
  }

  private static defineResponses(
    responses: IEndpointResponse[],
    withoutLogin?: boolean,
    haveDto?: boolean,
  ) {
    responses.push({
      status: 500,
      description: 'Internal server error',
    });

    if (!withoutLogin) {
      responses.push({
        status: 401,
        description: 'User must be logged in to access this endpoint',
      });
    }

    if (haveDto) {
      responses.push({
        status: 409,
        description: 'One of the required fields in the DTO was not sent',
      });
    }

    return responses.map(({ status, description, response, findManyModel }) => {
      if (findManyModel) {
        return FindManyResponse(findManyModel);
      }

      const object = {
        status: status,
        description: description,
      };

      if (response) {
        object['schema'] = {
          $ref: getSchemaPath(response),
        };
      }

      const decorator = [ApiResponse(object)];

      if (response) {
        decorator.push(ApiExtraModels(response));
      }

      return applyDecorators(...decorator);
    });
  }

  private static createDescription(description: string, dtoName?: string) {
    if (dtoName) {
      description += ` - For more information about DTO, access the model ${dtoName}`;
    }
    return description;
  }

  public static get(data: IEndpointData) {
    return this.base({ type: EndpointMethod.GET, ...data });
  }

  public static post(data: IEndpointData) {
    return this.base({ type: EndpointMethod.POST, ...data });
  }

  public static patch(data: IEndpointData) {
    return this.base({ type: EndpointMethod.PATCH, ...data });
  }

  public static put(data: IEndpointData) {
    return this.base({ type: EndpointMethod.PUT, ...data });
  }

  public static delete(data: IEndpointData) {
    return this.base({ type: EndpointMethod.DELETE, ...data });
  }
}
