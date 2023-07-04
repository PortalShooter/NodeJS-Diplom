import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const RoleDecorator = createParamDecorator(
  (userField: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    //   const user:  undefined = request.user;
    console.log(userField, ctx);
    //   return userField ? user?.[userField] : user;
  },
);
