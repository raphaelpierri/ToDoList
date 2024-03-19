import { DataTypes, Model, Optional } from 'sequelize';
import database from '../db'


type TaskAttributes = {
  id: number,
  descricao: string,
  status: string,
  createdAt: Date,
  updatedAt: Date
};

type TaskCreationAttributes = Optional<TaskAttributes, 'id'>;

export interface TaskModel extends Model<TaskAttributes, TaskCreationAttributes>, TaskAttributes {}

const taskModel = database.define<TaskModel>('task', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });

function findAll() {
  return taskModel.findAll<TaskModel>();
}

function findById(id: number) {
  return taskModel.findByPk<TaskModel>(id);
}

function create(task: TaskAttributes) {
  return taskModel.create(task);
}

async function update(id: number, task: TaskAttributes) {
  const originalTask = await taskModel.findByPk<TaskModel>(id);
  if (originalTask !== null) {
    originalTask.descricao = task.descricao;
    originalTask.status = task.status;
    await originalTask.save();
    return originalTask;
  }
  throw new Error(`Task not found.`);
}

async function deleteById(id: number) {
  const originalTask = await taskModel.findByPk<TaskModel>(id);
    await originalTask?.destroy();
  }
export default { findAll, findById, create, update, deleteById };
