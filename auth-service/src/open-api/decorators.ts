import { ApiHeader } from '@nestjs/swagger';

const AuthHeader = () =>
  ApiHeader({
    name: 'Authorization',
    description: 'Bearer token required to authorization.',
  });

const LangHeader = () =>
  ApiHeader({
    name: 'app-lang',
    description: 'Language which all messages will be in.',
  });

export { AuthHeader, LangHeader };
