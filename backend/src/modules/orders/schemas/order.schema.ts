import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export enum OrderStatus {
  PLACED = 'placed',
  PROCESSING = 'processing',
  PRODUCTION = 'production',
  READY = 'ready',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  RETURNED = 'returned',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

@Schema({ _id: false })
export class OrderItem {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: true })
  productId: string;

  @Prop({ required: true })
  productName: string;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Object })
  customizations: Record<string, any>;
}

@Schema({ _id: false })
export class ShippingDetails {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  zipCode: string;

  @Prop({ required: true })
  country: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  trackingNumber: string;

  @Prop()
  carrier: string;

  @Prop()
  estimatedDelivery: Date;
}

@Schema({ _id: false })
export class PaymentDetails {
  @Prop({ required: true, enum: PaymentStatus, default: PaymentStatus.PENDING })
  status: PaymentStatus;

  @Prop()
  method: string;

  @Prop()
  transactionId: string;

  @Prop({ type: Date })
  paidAt: Date;
}

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ required: true })
  orderNumber: string;

  @Prop({ type: [OrderItem], required: true })
  items: OrderItem[];

  @Prop({ type: Number, required: true })
  subtotal: number;

  @Prop({ type: Number, default: 0 })
  tax: number;

  @Prop({ type: Number, default: 0 })
  shippingCost: number;

  @Prop({ type: Number, default: 0 })
  discount: number;

  @Prop({ type: Number, required: true })
  total: number;

  @Prop({ type: ShippingDetails, required: true })
  shipping: ShippingDetails;

  @Prop({ type: PaymentDetails, required: true })
  payment: PaymentDetails;

  @Prop({ required: true, enum: OrderStatus, default: OrderStatus.PLACED })
  status: OrderStatus;

  @Prop({ type: [{ status: String, timestamp: Date }], default: [] })
  statusHistory: { status: string; timestamp: Date }[];

  @Prop()
  notes: string;

  @Prop({ type: Boolean, default: false })
  isBusinessOrder: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  storeId: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

// Add pre-save hook to update status history
OrderSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    this.statusHistory.push({
      status: this.status,
      timestamp: new Date(),
    });
  }
  next();
});