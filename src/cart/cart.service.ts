import { Injectable, NotFoundException } from '@nestjs/common';
import { Cart, CartStatus } from './cart.model';
import { CreateCartDto } from './dto/create-cart.dto';
import { GetCartFilterDto } from './dto/get-cart-filter.dto';
const { v4: uuidV4 } = require('uuid');

@Injectable()
export class CartService {
    private carts : Cart[] = []

    getAllCarts() : Cart[] {
        return this.carts
    }

    getCartById(id : string) : Cart {
        const found = this.carts.find(cart => cart.id === id)

        if (!found) {
            throw new NotFoundException(`Cart ID "${id}" do not exist`)
        }

        return found
    }

    getCartsWithFilters(filterDto: GetCartFilterDto): Cart[] {
        const {status, store} = filterDto
        let carts = this.getAllCarts()

        if (status) {
            carts = carts.filter(cart => cart.status === status)
        }

        if (store) {
            carts = carts.filter(cart => 
                cart.store_id === store)
        }

        return carts
    }

    // BEFORE DTO
    /* createCart(store_id: string) : Cart {
        const cart : Cart = {
            id : uuidV4(),
            store_id,
            status : CartStatus.IN_PROGRESS
        }
        this.carts.push(cart)
        return cart
    } */

    // AFTER DTO
    createCart(createCartDto: CreateCartDto) : Cart {
        // We are going to destruct the DTO Object. Extract only those keys we care about
        const { store_id } = createCartDto

        const cart : Cart = {
            id : uuidV4(),
            store_id,
            status : CartStatus.IN_PROGRESS
        }
        this.carts.push(cart)
        return cart
    }

    deleteCartById(id: string) : void {
        /* let indexToBeDeleted = this.carts.findIndex(cart => cart.id === id)
        if (indexToBeDeleted > -1) {
            this.carts.splice(indexToBeDeleted, 1)
        } */

        const found = this.getCartById(id)
        this.carts = this.carts.filter(cart => cart.id !== found.id)
    }

    updateCartStatus(id: string, status: CartStatus) : Cart {
        const cartToUpdate = this.getCartById(id)
        cartToUpdate.status = status
        return cartToUpdate
    }
}
