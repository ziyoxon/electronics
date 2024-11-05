import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import { AllExceptionsFilter } from "./helpers/error_handler";
import { WinstonModule } from "nest-winston";
import { winstonConfig } from "./helpers/winston.logger";

async function start() {
  try {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule, {
      logger: WinstonModule.createLogger(winstonConfig)
    });
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new AllExceptionsFilter())
    const winstonLogger = WinstonModule.createLogger(winstonConfig);
    app.useLogger(winstonLogger); 
    const config = new DocumentBuilder()
      .setTitle("Electronics  project")
      .setDescription("Electronics project REST API")
      .setVersion("1.0")
      .addTag("NESTJS, validation, mailer, bot,swagger, guard, sequelize, pg")
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);
    await app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
