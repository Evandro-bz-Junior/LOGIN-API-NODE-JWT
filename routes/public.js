import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

const router = express.Router();
const JWt_secret = process.env.JWT_SECRET;


//Cadastrar
router.post('/cadastro', async (req, res) => {
    console.log('Dados recebidos:', req.body);
    try {

        const user = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, salt);

        const userDB = await prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: hashPassword,
            },
        });
        res.status(201).json(userDB);
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
});

//Login
router.post('/login', async (req, res) => {
    //
    try {
        const userInfor = req.body;
        //verifica se o usuário existe no banco de dados
        const user = await prisma.user.findUnique({
            where: {
                email: userInfor.email,
            },
        });
        //verifica se o usuário existe
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        //verifica se a senha está correta em relação ao cadastro
        const isMatch = await bcrypt.compare(userInfor.password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: 'Senha inválida'
            });
        }
        //gerar o token
        const token = jwt.sign({ id: user.id }, JWt_secret, {
            expiresIn: '4d',
        });

        //se tudo estiver certo gerar
        res.status(200).json({ token });
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ error: 'Erro ao logar usuário' });
    } {

    }
})


export default router;