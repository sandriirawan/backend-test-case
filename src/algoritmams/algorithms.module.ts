import { Module } from '@nestjs/common';
import { AlgorithmsService } from './algorithms.service.ts.js';
import { AlgorithmsController } from './algorithms.controller.js';

@Module({
  imports: [],
  providers: [AlgorithmsService],
  controllers: [AlgorithmsController],
})
export class AlgoritmaModule {}
