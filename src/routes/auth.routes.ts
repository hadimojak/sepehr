import { FastifyInstance } from 'fastify';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user.model';

const authService = new AuthService();

export async function authRoutes(app: FastifyInstance) {
    app.post('/signup', async (request, reply) => {
        const { username, password, role } = request.body as {
            username: string;
            password: string;
            role: UserRole;
        };
        try {
            const result = await authService.signup(username, password, role);
            reply.send(result);
        } catch (err) {
            reply.status(400).send({ error: err.message });
        }
    });

    app.post('/login', async (request, reply) => {
        const { username, password } = request.body as { username: string; password: string };
        try {
            const result = await authService.login(username, password);
            reply.send(result);
        } catch (err) {
            reply.status(400).send({ error: err.message });
        }
    });
}
