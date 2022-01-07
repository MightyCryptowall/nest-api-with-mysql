import RequestWithUser from 'src/authentication/requestWithUser.interface';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import { CanActivate, ExecutionContext, mixin, Type } from "@nestjs/common";
import Permission from "./permission.type";


const PermissionGuard = (permission: Permission): Type<CanActivate> => {
    class PermissionGuardMixin extends JwtAuthenticationGuard {
        async CanActivate(context: ExecutionContext){
            await super.canActivate(context);

            const request = context.switchToHttp().getRequest<RequestWithUser>();
            const user = request.user;

            const user_permissions = JSON.stringify(user?.permissions);
            
            if(user_permissions){
                return user_permissions.includes(permission);
            }else{
                return false;
            }

        }
    }

    return mixin(PermissionGuardMixin);
}

export default PermissionGuard;