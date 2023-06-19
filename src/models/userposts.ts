import {
  Table,
  Model,
  Column,
  Default,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { AuthModel } from "./userauth";

@Table({
  timestamps: true,
  tableName: "tasks-table",
})
export class TasksModel extends Model {
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
  })
  task_name!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  })
  completed!: boolean;

  @ForeignKey(() => AuthModel)
  @Column
  authorId!: string;

  @BelongsTo(() => AuthModel)
  author!: AuthModel;
}
