import { IsNotEmpty } from 'class-validator'

export class CreateCartDto {
    @IsNotEmpty()
    store_id : string
}