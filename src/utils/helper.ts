import * as bcrypt from 'bcrypt';

const saltOrRounds: number = 10;

// export class Helper {

export async function encrypt(password: string) {
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash
}

export async function compare(password: string, hash: string) {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch
}
// }