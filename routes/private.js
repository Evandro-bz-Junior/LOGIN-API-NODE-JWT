import express from 'express';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

const router = express.Router();

//listar todos os usuários
router.get('/list-users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json({message: 'Usuarios listados com sucesso' ,users});
    }
    catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ message: 'Erro ao listar usuários' });
    }
});

export default router;