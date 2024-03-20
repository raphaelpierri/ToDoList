import { ValidationError } from "sequelize";
import taskModel from "../models/task.model";
import {Request, Response} from 'express'

const getAllTasks = async (req: Request, res: Response) => {
    const tasks = await taskModel.findAll()
    return res.status(200).json(tasks)
}

const getTaskById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const tasks = await taskModel.findById(id)
    if (!tasks) return res.status(200).json({message: 'Não existe essa task!'})
    return res.status(200).json(tasks)
}

const createTask = async (req: Request, res: Response) => {
    const {descricao, status} = req.body;
    if (!descricao || !status) {
        throw new Error('Descrição e status são obrigatórios')
    }
    await taskModel.create(req.body)
    return res.status(201).json({message: req.body})
}

const updateTask = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const taskUpdated = await taskModel.update(id, req.body)
    return res.status(201).json(taskUpdated)
}

const deleteTask = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await taskModel.deleteById(id)
    return res.status(200).json({message: 'Tarefa excluída com sucesso!'})
}

export default { createTask, getAllTasks, getTaskById,  updateTask, deleteTask }