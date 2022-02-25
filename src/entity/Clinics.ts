import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Clinics {

    constructor(name: string, cnpj: string, address: string) {
        this.name = name;
        this.cnpj = cnpj;
        this.address = address;
    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ length: 11, nullable: false })
    cnpj: string;

    @Column('jsonb', { nullable: false, default: {} })
    address: string;

}
