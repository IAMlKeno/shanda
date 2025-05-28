import { Controller, Get, Param, Response } from '@nestjs/common';
import { formDtoMap } from '../form-map';
import { ApiOperation, ApiFoundResponse, ApiNotFoundResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ErrorResponse } from 'src/mvc/base/http/entities';

@Controller('forms')
@ApiTags('Forms')
export class FormsControllerController {

  @ApiOperation({ summary: 'Get fields for a form.', operationId: 'getFormFields'})
  @ApiFoundResponse({ type: Response, description: 'A full user object containing references to its profiles.' })
  @ApiNotFoundResponse({ type: ErrorResponse, description: 'Failed to find user.' })
  @ApiParam({ name: 'formType', })
  @Get(':formType')
  async getFormFields(@Param('formType') formType: string): Promise<any | ErrorResponse> {
    try {
      const dtoClass = formDtoMap[formType];

      if (!dtoClass) {
        // Handle the case where the form type is not found
        return { error: 'Form type not found' };
      }

      return dtoClass;
    } catch (error) {
      return new ErrorResponse(error);
    }
  }

}
