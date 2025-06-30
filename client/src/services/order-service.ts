import type { IOrder } from "@/commons/types";
import { createGenericService } from "./generic-service";

const orderURL = "/order";
const OrderService = createGenericService<IOrder>(orderURL);
export default OrderService;