import { CartStatus } from "../cart.model";
import { IsIn, IsOptional, IsNotEmpty } from "class-validator";

export class GetCartFilterDto {

    @IsOptional()
    @IsIn([CartStatus.PAYED_OFF, CartStatus.IN_PROGRESS])
    status : CartStatus

    @IsOptional()
    @IsNotEmpty()
    store: string
}