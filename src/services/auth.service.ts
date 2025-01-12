import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel, UserRole } from '../models/user.model';

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

export class AuthService {
    @Logger
    async signup(username: string, password: string, role: UserRole) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({ username, password: hashedPassword, role });
        await user.save();
        return { message: 'User registered successfully' };
    }

    @Logger
    async login(username: string, password: string) {
        const user = await UserModel.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid username or password');
        }
        const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        return { token };
    }
}
