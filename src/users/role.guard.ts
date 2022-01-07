import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import { CanActivate, ExecutionContext, mixin, Type } from "@nestjs/common";
import { Observable } from "rxjs";
import Role from "./role.enum";


const RoleGuard = (role: Role): Type<CanActivate> => {
    class RoleGuardMixin extends JwtAuthenticationGuard {

        async canActivate(context: ExecutionContext) {
            await super.canActivate(context);
            const request = context.switchToHttp().getRequest<RequestWithUser>();
            
            const user = request.user;
            const user_role = JSON.parse(user?.roles);

            
            if(Array.isArray(user_role)){
                return user_role.includes(role);
            }else{
                return false;
            }
     
        }

    }
    return mixin(RoleGuardMixin);

}

export default RoleGuard;