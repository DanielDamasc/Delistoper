import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import prisma from '../../lib/prisma';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private client = prisma;

  async onModuleInit() {
    await this.client.$connect(); // O método conecta direto no "this"
    console.log('[Prisma] Connected to database');
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
    console.log('[Prisma] Disconnected from database');
  }

  get prismaClient() {
    return this.client;
  }
}