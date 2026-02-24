import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  async createExpense(data: any, orgId: string, userId: string) {
    return this.prisma.expense.create({
      data: {
        title: data.title,
        description: data.description,
        amount: data.amount,
        submitterId: userId,
        organizationId: orgId,
      },
    });
  }
}