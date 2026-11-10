import { Injectable } from '@nestjs/common';
import type { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

function getClientInfo(userAgent: string) {
  const browser = /Edg\//i.test(userAgent)
    ? 'Edge'
    : /OPR\//i.test(userAgent)
      ? 'Opera'
      : /SamsungBrowser/i.test(userAgent)
        ? 'Samsung Internet'
        : /Firefox\//i.test(userAgent)
          ? 'Firefox'
          : /Chrome\//i.test(userAgent)
            ? 'Chrome'
            : /Safari\//i.test(userAgent)
              ? 'Safari'
              : null;

  const os = /Android/i.test(userAgent)
    ? 'Android'
    : /iPhone|iPad|iPod/i.test(userAgent)
      ? 'iOS'
      : /Windows/i.test(userAgent)
        ? 'Windows'
        : /Mac OS X|macOS/i.test(userAgent)
          ? 'macOS'
          : /Linux/i.test(userAgent)
            ? 'Linux'
            : null;

  const deviceType = /iPad|Tablet/i.test(userAgent)
    ? 'Tablet'
    : /Mobile|iPhone|Android/i.test(userAgent)
      ? 'Mobile'
      : userAgent
        ? 'Desktop'
        : null;

  return { browser, os, deviceType };
}

function parseScreenDimension(value: string | undefined) {
  if (!value || !/^\d+$/.test(value)) return null;

  const dimension = Number(value);
  return Number.isSafeInteger(dimension) && dimension > 0 ? dimension : null;
}

@Injectable()
export class ActivityLogsRepository {
  constructor(private readonly prisma: PrismaService) {}

  logLoginAttempt(userId: string | null, succeeded: boolean, request: Request) {
    return this.logAuthenticationEvent(
      userId,
      succeeded ? 'LOGIN_SUCCESS' : 'LOGIN_FAILED',
      succeeded ? 'Login berhasil' : 'Login gagal',
      succeeded ? 200 : 401,
      request,
    );
  }

  logLogout(userId: string, request: Request) {
    return this.logAuthenticationEvent(
      userId,
      'LOGOUT',
      'User logout',
      200,
      request,
    );
  }

  private logAuthenticationEvent(
    userId: string | null,
    action: string,
    description: string,
    statusCode: number,
    request: Request,
  ) {
    const userAgent = request.get('user-agent') ?? null;
    const { browser, os, deviceType } = getClientInfo(userAgent ?? '');
    const language =
      request.get('x-client-language') ??
      request.get('accept-language')?.split(',')[0]?.trim() ??
      null;

    return this.prisma.activityLog.create({
      data: {
        userId,
        action,
        module: 'auth',
        description,
        entityType: userId ? 'User' : null,
        entityId: userId,
        method: request.method,
        endpoint: request.path,
        referer: request.get('referer') ?? null,
        statusCode,
        ipAddress: request.ip ?? request.socket.remoteAddress ?? null,
        userAgent,
        browser,
        os,
        deviceType,
        language,
        timezone: request.get('x-client-timezone') ?? null,
        screenWidth: parseScreenDimension(request.get('x-screen-width')),
        screenHeight: parseScreenDimension(request.get('x-screen-height')),
      },
    });
  }

  findAll() {
    return this.prisma.activityLog.findMany({
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
}
