import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrganizationGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const userId = req.user?.userId;
    if (!userId) {
      throw new UnauthorizedException('User not found in request');
    }

    const orgId = req.headers['x-organization-id'] as string;
    if (!orgId) {
      throw new UnauthorizedException('Organization ID header missing');
    }

    const membership = await this.prisma.organizationMember.findUnique({
      where: {
        userId_organizationId: {
          userId,
          organizationId: orgId,
        },
      },
    });

    if (!membership) {
      throw new UnauthorizedException('User does not belong to this organization');
    }

    req.organization = {
      id: orgId,
      role: membership.role,
    };

    return true;
  }
}