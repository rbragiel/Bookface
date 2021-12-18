import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AppRequest } from '../../types/request';

const User = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<AppRequest>();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return request.user!;
});

export { User };
