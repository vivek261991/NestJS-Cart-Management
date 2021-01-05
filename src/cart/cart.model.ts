export interface Cart {
 id : string,
 store_id : string,
 status : CartStatus
}

export enum CartStatus {
    PAYED_OFF = 'PAYED_OFF',
    IN_PROGRESS = 'IN_PROGRESS'
}