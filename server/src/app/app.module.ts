import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsModule } from 'src/questions/questions.module';
import { QuizModule } from 'src/quiz/quiz.module';
import { LibModule } from 'src/lib/lib.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'path';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.join(__dirname, '../../static'),
        }),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => {
                const user = encodeURIComponent(config.get<string>('DB_USER'));
                const host = config.get<string>('DB_HOST');
                const password = encodeURIComponent(config.get<string>('DB_PASSWORD'));
                const port = config.get<string>('DB_PORT');

                return {
                    uri: `mongodb://${user}:${password}@${host}:${port}`,
                    dbName: 'quiz-game',
                    serverSelectionTimeoutMS: 5000,
                };
            },
        }),
        LibModule,
        AuthModule,
        QuestionsModule,
        QuizModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
