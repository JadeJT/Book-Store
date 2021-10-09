import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Orders')
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: false })
    orderer_id: number;

    @Column({ type: 'int', nullable: false })
    book_id: number;
}