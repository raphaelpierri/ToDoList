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
    try {
        const {descricao, status} = req.body;
        if (!descricao || !status) {
            throw new Error('Descrição e status são obrigatórios')
        }
        const tasks = await taskModel.findAll()
        for (const task of tasks) {
            if (task.descricao === descricao) {
                throw new Error('Já existe uma tarefa com essa descrição')
            }
        }
        await taskModel.create(req.body)
        return res.status(201).json({message: req.body})
    } catch(error) {
        console.error(error)
        return res.status(400).send((error as Error).message)
    }

}

const updateTask = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const tasks = await taskModel.findAll()
        const newDesc = req.body.descricao
        for (const task of tasks) {
            if (task.descricao === newDesc) {
                throw new Error('Já existe uma tarefa com essa descrição')
            }
        }
        const taskUpdated = await taskModel.update(id, req.body)
        return res.status(201).json(taskUpdated)
    } catch(error) {
        console.error(error)
        return res.status(400).send((error as Error).message)
    }

}

const deleteTask = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await taskModel.deleteById(id)
    return res.status(200).json({message: 'Tarefa excluída com sucesso!'})
}

export default { createTask, getAllTasks, getTaskById,  updateTask, deleteTask }