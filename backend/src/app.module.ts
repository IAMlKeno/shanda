import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MvcModule } from './mvc/mvc.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { user } from './mvc/models';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    MvcModule,
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.NODE_DB_HOST ?? 'localhost',
      port: parseInt(process.env.NODE_DB_PORT) ?? 5432,
      username: process.env.NODE_DB_USERNAME,
      password: process.env.NODE_DB_PASSWORD,
      database: process.env.NODE_DB,
      repositoryMode: true,
      models: [user],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
