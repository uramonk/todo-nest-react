import { afterEach } from 'node:test';

import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Status } from '@prisma/client';
import { Item } from '@prisma/client';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma.service';
import request from 'supertest';
import { beforeEach, describe, it } from 'vitest';
import { any, DeepMockProxy, mockDeep } from 'vitest-mock-extended';
const date = new Date();
const items = [
  {
    id: 1,
    name: 'test',
    status: Status.TODO,
    createdAt: date.toString(),
    updatedAt: date.toString(),
  } as unknown as Item,
  {
    id: 1,
    name: 'test',
    status: Status.TODO,
    createdAt: date.toString(),
    updatedAt: date.toString(),
  } as unknown as Item,
];

describe('ItemsController (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let configService: ConfigService;
  let prismaServiceMock: DeepMockProxy<PrismaService>;

  const getToken = (payload: object) => {
    return jwtService.sign(payload, {
      secret: configService.get<string>('JWT_SECRET'),
    });
  };

  beforeEach(async () => {
    prismaServiceMock = mockDeep<PrismaService>();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    //app.useLogger(new Logger());
    configService = moduleFixture.get<ConfigService>(ConfigService);
    jwtService = moduleFixture.get<JwtService>(JwtService);

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('200 /items (GET)', async () => {
    const token = getToken({ sub: 1, username: 'test' });

    const expected = items;

    prismaServiceMock.item.findMany
      .calledWith(any())
      .mockResolvedValue(expected);

    return request(app.getHttpServer())
      .get('/items')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect(expected);
  });

  it('401 /items (GET)', () => {
    return request(app.getHttpServer()).get('/items').expect(401);
  });
});
