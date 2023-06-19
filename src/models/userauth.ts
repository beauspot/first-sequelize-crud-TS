import {
  Table,
  Model,
  Column,
  Default,
  DataType,
  BeforeCreate,
  BeforeUpdate,
  HasMany,
} from "sequelize-typescript";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { TasksModel } from "./userposts";

@Table({
  tableName: "auth-table",
  timestamps: true,
})
export class AuthModel extends Model<AuthModel> {
  @Default(uuidv4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
  })
  static id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      IsEmail: {
        msg: "Please Provide  valid Email Address",
      },
      NotEmpty: {
        msg: "Please the email field should not be empty.",
      },
    },
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isLowercase: {
        msg: "The username must be in lower caps",
      },
      notEmpty: {
        msg: "The username must not be empty",
      },
      len: {
        args: [8, 17],
        msg: "Username must be between 8 and 17 characters.",
      },
    },
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Please provide a password.",
      },
      len: {
        args: [8, 20],
        msg: "Password must be between 8 and 20 characters.",
      },
    },
  })
  password!: string;

  // Hash the password before creating the model
  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: AuthModel) {
    if (instance.changed("password")) {
      const salt = await bcrypt.genSalt(10);
      instance.password = await bcrypt.hash(instance.password, salt);
    }
  }

  // Generate a JWT token
  createJWT() {
    const token = jwt.sign(
      {
        userId: this.id,
        name: this.username,
      },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXP }
    );
    return token;
  }

  // Instance method to compare passwords when user logs in
  async comparePwd(pwd: string): Promise<boolean> {
    const comparePwd = await bcrypt.compare(pwd, this.password);
    return comparePwd;
  }

  // Definie Association with other models if needed
  @HasMany(() => TasksModel)
  tasks!: TasksModel[];
}