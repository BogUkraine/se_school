import { Request, Response } from 'express'

export const mainController = async (req: Request, res: Response) => {
    return res.send(200)
}