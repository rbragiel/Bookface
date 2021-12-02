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

@Injectable()
export class I18nExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<I18nRequest>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = <{ args?: Record<string, unknown> }>exception.getResponse();

    const returnMessage = await this.i18n.translate('errors', {
      lang: request.i18nLang,
      args: message.args,
    });

    return response.status(status).json({
      statusCode: status,
      message: returnMessage,
    });
  }
}
