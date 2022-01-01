import { ApiProperty } from '@nestjs/swagger';

class SuccessResponse {
  @ApiProperty()
  success: true;
}

export { SuccessResponse };
