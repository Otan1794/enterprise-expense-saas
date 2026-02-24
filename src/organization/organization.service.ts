import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrganizationRole } from '@prisma/client';

@Injectable()
export class OrganizationService {
  constructor(private prisma: PrismaService) {}

  async createOrganization(
    name: string,
    userId: string,
  ) {
    return this.prisma.$transaction(async (tx) => {
      const org = await tx.organization.create({
        data: { name },
      });

      await tx.organizationMember.create({
        data: {
          organizationId: org.id,
          userId,
          role: OrganizationRole.ADMIN,
        },
      });

      return org;
    });
  }
}