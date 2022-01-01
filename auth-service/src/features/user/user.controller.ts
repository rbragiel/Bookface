import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthHeader, LangHeader } from '../../open-api/decorators';
import { UseAuthGuard } from '../auth/auth.guard';

@ApiTags('user')
@LangHeader()
@AuthHeader()
@Controller('user')
@UseAuthGuard()
export class UserController {}
