import { HttpException } from '@nestjs/common';

export class MissingRequiredException extends HttpException {}
