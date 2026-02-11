import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import prisma from '../../lib/prisma';
import { PrismaClient } from 'generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  
  async onModuleInit() {
    await this.$connect(); // O método conecta direto no "this"
    console.log('[Prisma] Connected to database');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('[Prisma] Disconnected from database');
  }
}