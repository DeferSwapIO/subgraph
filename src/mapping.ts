import {
  DealEvt as DealEvtEvent,
  OrderCancelEvt as OrderCancelEvtEvent,
  OrderCreatedEvt as OrderCreatedEvtEvent,
  OrderUpdatedEvt as OrderUpdatedEvtEvent,
  OwnershipTransferred as OwnershipTransferredEvent
} from "../generated/DeferSwap/DeferSwap"

import {
  DealRecord,
  Order
} from "../generated/schema"

export function handleDealEvt(event: DealEvtEvent): void {
  let id = event.transaction.hash.toHex();
  let entity = new DealRecord(id)

  entity.pair0 = event.params.pair0
  entity.pair1 = event.params.pair1
  entity.amount0 = event.params.amount0
  entity.amount1 = event.params.amount1
  entity.seller = event.params.seller
  entity.buyer = event.params.buyer
  entity.created_at = event.block.timestamp;

  entity.save()
}

export function handleOrderCancelEvt(event: OrderCancelEvtEvent): void {
  let id = event.params.order_no.toHex();
  let order = Order.load(id);
  if (order === null) {
    return;
  }

  order.order_no = event.params.order_no
  order.amount0_rem = event.params.amount0_rem
  order.amount1_rem = event.params.amount1_rem
  order.status = event.params.status

  order.save()
}

export function handleOrderCreatedEvt(event: OrderCreatedEvtEvent): void {
  let id = event.params.order_no.toHex();
  let order = new Order(id)

  order.order_no = event.params.order_no
  order.owner = event.params.owner
  order.pair0 = event.params.pair0
  order.pair1 = event.params.pair1
  order.amount0 = event.params.amount0
  order.amount1 = event.params.amount1
  order.amount0_rem = event.params.amount0_rem
  order.amount1_rem = event.params.amount1_rem
  order.is_sell = event.params.is_sell
  order.price = event.params.price
  order.status = event.params.status

  order.save()
}

export function handleOrderUpdatedEvt(event: OrderUpdatedEvtEvent): void {
  let id = event.params.order_no.toHex();
  let order = Order.load(id);
  if (order === null) {
    return;
  }

  order.order_no = event.params.order_no
  order.amount0_rem = event.params.amount0_rem
  order.amount1_rem = event.params.amount1_rem
  order.status = event.params.status

  order.save()
}