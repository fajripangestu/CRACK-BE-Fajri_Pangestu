import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Department } from "generated/prisma/client";
import { DEPARTMENTS_KEY } from "./departments.decorator";

@Injectable()
export class DepartmentsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<Department[]>(DEPARTMENTS_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (!required?.length) return true;

    const { user } = ctx.switchToHttp().getRequest();
    if (!user?.department) return false;

    return required.includes(user.department);
  }
}