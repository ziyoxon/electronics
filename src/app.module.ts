import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { SequelizeModule } from "@nestjs/sequelize";
import { join } from "path";
import { AdminModule } from "./admin/admin.module";
import { Admin } from "./admin/models/admin.model";
import { AuthModule } from "./auth/auth.module";
import { OtpModule } from "./OTP/otp.module";
import { UserModule } from "./user/user.module";
import { User } from "./user/models/user.model";
import { ProductModule } from './product/product.module';
import { Product } from "./product/model/product.entity";
import { CategoriaModule } from './categoria/categoria.module';
import { Categoria } from "./categoria/model/categoria.model";
import { BacketModule } from './backet/backet.module';
import { Backet } from "./backet/models/backet.model";
import { BackedDetailsModule } from './backed_details/backed_details.module';
import { StatusModule } from './status/status.module';
import { Status } from "./status/models/status.model";
import { BackedDetail } from "./backed_details/model/backed_model.entity";
import { BrandModule } from './brand/brand.module';
import { Brand } from "./brand/models/brand.model";
import { UserDiscountModule } from './user_discount/user_discount.module';
import { DiscountModule } from './discount/discount.module';
import { Discount } from "./discount/models/discount.model";
import { UserDiscount } from "./user_discount/models/user_discount.models";
import { OrdersModule } from './orders/orders.module';
import { Order } from "./orders/models/order.model";
import { OrderDetailsModule } from './order_details/order_details.module';
import { OrderDetail } from "./order_details/models/order_detail.model";
import { DeliveryModule } from './delivery/delivery.module';
import { Delivery } from "./delivery/model/delivery.model";
import { PaymentModule } from './payment/payment.module';
import { CardModule } from './card/card.module';
import { Card } from "./card/model/card.model";
import { Payment } from "./payment/models/payment.models";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true, 
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "static"),
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST, 
      port: Number(process.env.POSTGRES_PORT), 
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Admin,User,Product,Categoria,Card,Backet,Payment,OrderDetail,Delivery,Order,Status,UserDiscount,BackedDetail,Brand,Discount],
      autoLoadModels: true, 
      sync: { alter: true },
      logging: false, 
    }),
    
    AdminModule,
    AuthModule,
    OtpModule,
    UserModule,
    ProductModule,
    CategoriaModule,
    BacketModule,
    BackedDetailsModule,
    StatusModule,
    BrandModule,
    UserDiscountModule,
    DiscountModule,
    OrdersModule,
    OrderDetailsModule,
    DeliveryModule,
    PaymentModule,
    CardModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
