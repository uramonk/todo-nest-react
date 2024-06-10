import { afterEach } from 'node:test';

import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Status } from '@prisma/client';
import { AppModule } from 'src/app.module';
import { ItemDto } from 'src/items/dto/item.dto';
import { ItemsService } from 'src/items/items.service';
import { PrismaService } from 'src/prisma.service';
import request from 'supertest';
import { beforeEach, describe, it } from 'vitest';
import { any, DeepMockProxy, mockDeep } from 'vitest-mock-extended';

const date = new Date();
const items = [
  new ItemDto(1, 'test', Status.TODO, 1, date, date),
  new ItemDto(2, 'test', Status.TODO, 1, date, date),
];

describe('ItemsController (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let configService: ConfigService;
  let prismaServiceMock: DeepMockProxy<PrismaService>;
  let itemsServiceMock: DeepMockProxy<ItemsService>;

  const getToken = (payload: object) => {
    return jwtService.sign(payload, {
      secret: configService.get<string>('JWT_SECRET'),
    });
  };

  beforeEach(async () => {
    prismaServiceMock = mockDeep<PrismaService>();
    itemsServiceMock = mockDeep<ItemsService>();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ItemsService)
      .useValue(itemsServiceMock)
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
    itemsServiceMock.findAll.calledWith(any()).mockResolvedValue(expected);

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
