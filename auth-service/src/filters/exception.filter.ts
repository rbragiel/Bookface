import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { I18nService } from 'nestjs-i18n';

interface I18nRequest extends Request {
  i18nLang: string;
}

type ErrorType =
  | { message: string | string[]; args?: undefined; error: string }
  | { message: string; args?: Record<string, unknown>; error?: undefined };

@Injectable()
export class I18nExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<I18nRequest>();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const errorResponse = <ErrorType>exception.getResponse();

    let returnMessage: string[] | string | null;

    const { error, message, args } = errorResponse;

    if (error) {
      returnMessage = errorResponse.message;
    } else {
      returnMessage = await this.i18n.translate(`errors.${message}`, {
        lang: request.i18nLang || 'en',
        args,
      });
    }

    return response.status(status).json({
      statusCode: status,
      message: returnMessage,
      error: errorResponse.error,
    });
  }
}
