import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrganizationGuard } from './organization.guard';
import { OrganizationService } from './organization.service';


@Controller('organizations')
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body('name') name: string,
    @Req() req: any,
  ) {
    return this.organizationService.createOrganization(
      name,
      req.user.userId,
    );
  }
}