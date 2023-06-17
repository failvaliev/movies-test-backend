import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [],
  providers: [],
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY || "SECRET",
      signOptions: {
        expiresIn: '72h'
      }
    })
  ],
  exports: [JwtModule]
})
export class AuthModule { }
