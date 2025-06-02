import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  STORE = 'store',
  CONSUMER = 'consumer',
}

@Schema({ _id: false })
export class BodyMeasurements {
  @Prop({ type: Number })
  height: number;

  @Prop({ type: Number })
  weight: number;

  @Prop({ type: Number })
  chest: number;

  @Prop({ type: Number })
  waist: number;

  @Prop({ type: Number })
  hips: number;

  @Prop({ type: Number })
  inseam: number;

  @Prop({ type: Number })
  shoulder: number;

  @Prop({ type: Number })
  arm: number;

  @Prop({ type: Number })
  neck: number;

  @Prop({ type: Object })
  additionalMeasurements: Record<string, number>;
}

@Schema({ _id: false })
export class Address {
  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  zipCode: string;

  @Prop({ required: true })
  country: string;
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.CONSUMER })
  role: UserRole;

  @Prop({ type: BodyMeasurements })
  measurements: BodyMeasurements;

  @Prop({ type: Address })
  address: Address;

  @Prop({ type: [String], default: [] })
  wishlist: string[];

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop()
  phoneNumber: string;

  @Prop()
  profilePicture: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  lastLogin: Date;

  @Prop({ type: Object, default: {} })
  preferences: Record<string, any>;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Add pre-save hook to hash password
UserSchema.pre('save', async function(next) {
  // Password hashing logic would go here
  // This is a placeholder - in a real app, you'd use bcrypt
  if (this.isModified('password')) {
    // this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});