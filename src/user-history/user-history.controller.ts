// user-history.controller.ts
import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { UserHistoryService } from "./user-history.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";

@Controller("userHistories")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserHistoryController {
  constructor(private readonly userHistoryService: UserHistoryService) {}

  @Roles("SUPERADMIN")
  @Get()
  async getAll() {
    return this.userHistoryService.findAll();
  }

  @Roles("SUPERADMIN")
  @Get(":userId")
  async getByUser(@Param("userId") userId: string) {
    return this.userHistoryService.findByUser(Number(userId));
  }
}
