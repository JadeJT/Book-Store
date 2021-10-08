import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false, length: 255 })
    username: string;

    @Column({ type: 'varchar', nullable: false, length: 255 })
    password: string;

    @Column({ type: 'varchar', nullable: true, length: 255, default: '' })
    name: string;

    @Column({ type: 'varchar', nullable: true, length: 255, default: '' })
    surname: string;

    @Column({ type: 'varchar', nullable: false })
    date_of_birth: string;
}