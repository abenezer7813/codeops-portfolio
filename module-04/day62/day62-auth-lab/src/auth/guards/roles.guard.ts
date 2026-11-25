import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../../users/users.service.js";

const ROLES_KEY = "roles";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
    
  canActivate(ctx: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<Role[]>(
      ROLES_KEY, [ctx.getHandler(), ctx.getClass()]);
    if (!required?.length) return true;
 
    const user = ctx.switchToHttp().getRequest().user;   // now real
    const ok = required.some((r) => user.roles.includes(r));
    if (!ok) throw new ForbiddenException("Insufficient role");
    
    return true;
  }
}