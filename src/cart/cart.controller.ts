import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart, CartStatus } from './cart.model';
import { CreateCartDto } from './dto/create-cart.dto';
import { GetCartFilterDto } from './dto/get-cart-filter.dto';
import { CartStatusValidationPipe } from './pipes/cart-status-validation.pipe';

@Controller('cart')
export class CartController {
    constructor(private cartService: CartService) {}

    /* @Get()
    getAllCarts(): Cart[] {
        return this.cartService.getAllCarts();
    } */

    @Get()
    getCarts(@Query(ValidationPipe) filterDto: GetCartFilterDto): Cart[] {
        if (Object.keys(filterDto)) {
            return this.cartService.getCartsWithFilters(filterDto)
        } else {
            return this.cartService.getAllCarts();
        }
    }

    @Get('/:id')
    getCartById(@Param('id') id : string) : Cart {
        return this.cartService.getCartById(id)
    }

    // BEFORE ADDING DTO
    /* @Post()
    createCart(
        @Body('store_id') store_id : string
        ) : Cart {
        // console.log('store_id', store_id)
        return this.cartService.createCart(store_id)
    } */

    // UPDATED : AFTER ADDING DTO
    @Post()
    @UsePipes(ValidationPipe)
    createCart(@Body() createCartDto: CreateCartDto) : Cart {
        // console.log('store_id', store_id)
        return this.cartService.createCart(createCartDto)
    }

    @Delete(':id') 
    deleteCartById(@Param('id') id: string): void {
        this.cartService.deleteCartById(id)
    }

    @Patch(':id/status')
    updateCartStatus(
        @Param('id') id: string,
        @Body('status', CartStatusValidationPipe) status: CartStatus
    ): Cart {
        return this.cartService.updateCartStatus(id, status)
    }
}