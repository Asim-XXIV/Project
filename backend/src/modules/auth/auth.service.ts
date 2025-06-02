import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../users/schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    // Update last login
    user.lastLogin = new Date();
    await user.save();
    
    return this.sanitizeUser(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    const payload = { 
      sub: user._id, 
      email: user.email,
      role: user.role 
    };
    
    return {
      user,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const { email, password, firstName, lastName, role } = registerDto;
    
    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new UnauthorizedException('Email already in use');
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = new this.userModel({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: role || UserRole.CONSUMER,
      isActive: true,
      isEmailVerified: false, // Would be verified through email in a real app
    });
    
    const savedUser = await newUser.save();
    
    const payload = { 
      sub: savedUser._id, 
      email: savedUser.email,
      role: savedUser.role 
    };
    
    return {
      user: this.sanitizeUser(savedUser),
      accessToken: this.jwtService.sign(payload),
    };
  }

  private sanitizeUser(user: User) {
    const sanitized = user.toObject();
    delete sanitized.password;
    return sanitized;
  }
}