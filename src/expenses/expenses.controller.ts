import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrganizationGuard } from '../organization/organization.guard';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), OrganizationGuard)
  async createExpense(@Body() body: any, @Req() req: any) {
    const orgId = req.organization.id;
    const userId = req.user.userId;

    return this.expensesService.createExpense(body, orgId, userId);
  }
}