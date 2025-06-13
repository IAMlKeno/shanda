import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { formDtoMap } from '../form-map';
import { ApiOperation, ApiFoundResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { ErrorResponse } from 'src/mvc/base/http/entities';

@Controller('forms')
@ApiTags('Forms')
export class FormsControllerController {

  @ApiOperation({ summary: 'Get fields for a form.', operationId: 'getFormFields'})
  @ApiFoundResponse({ type: Object, description: 'A JSON object containing a form\'s fields and metadata about the information.', examples: {} })
  @ApiNotFoundResponse({ type: ErrorResponse, description: 'Failed to find user.' })
  @Get('/:formType')
  async getFormFields(@Param('formType') formType: string): Promise<object | ErrorResponse> {
    try {
      const dtoClass = formDtoMap[formType];

      if (!dtoClass) {
        // Handle the case where the form type is not found
        return { error: 'Form type not found' };
      }

      return dtoClass;
    } catch (error: any) {
      return new ErrorResponse(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
