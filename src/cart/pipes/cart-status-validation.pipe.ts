import { PipeTransform, BadRequestException } from "@nestjs/common";
import { CartStatus } from "../cart.model";

export class CartStatusValidationPipe implements PipeTransform {
    // readonly means even during run time, it cannot be modified by class members
    readonly validStatus = [
        CartStatus.IN_PROGRESS,
        CartStatus.PAYED_OFF
    ]
    
    transform(value: any) {
        // console.log('value', value)
        if (!this.isCartStatusValid(value.toUpperCase())) {
            throw new BadRequestException(`"${value}" is not a valid Cart Status`)
        }

        return value
    }
    
    private isCartStatusValid(status: any): boolean {
        return this.validStatus.includes(status)
    }
}