import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ _id: false })
export class CustomizationOption {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string; // e.g., 'select', 'color', 'measurement'

  @Prop({ type: [String], default: [] })
  availableValues: string[];

  @Prop()
  defaultValue: string;

  @Prop()
  description: string;

  @Prop({ type: Object })
  constraints: Record<string, any>; // min, max, etc.
}

@Schema({ _id: false })
export class ProductVariant {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  sku: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ type: Number, default: 0 })
  discountPercentage: number;

  @Prop({ type: Number, default: 0 })
  stock: number;

  @Prop({ type: Object })
  attributes: Record<string, any>;
}

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: Number })
  basePrice: number;

  @Prop({ type: [String] })
  categories: string[];

  @Prop({ type: [String] })
  tags: string[];

  @Prop({ type: [String] })
  images: string[];

  @Prop({ type: [{ type: CustomizationOption }] })
  customizationOptions: CustomizationOption[];

  @Prop({ type: [{ type: ProductVariant }] })
  variants: ProductVariant[];

  @Prop({ type: Boolean, default: true })
  isCustomizable: boolean;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: Number, default: 0 })
  averageRating: number;

  @Prop({ type: Number, default: 0 })
  reviewCount: number;

  @Prop({ type: Number, default: 0 })
  soldCount: number;

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

// Add indexes for better query performance
ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ categories: 1 });
ProductSchema.index({ tags: 1 });
ProductSchema.index({ isActive: 1 });