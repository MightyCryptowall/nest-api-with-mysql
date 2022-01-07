import { Exclude, Expose } from "class-transformer";
import Post from "../posts/post.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Address from "./address.entity";
import Role from "./role.enum";
import { json } from "stream/consumers";

@Entity()
class User {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ unique: true })
    @Expose()
    public email: string;

    @Column()
    @Expose()
    public name: string;

    @Column()
    @Exclude({ toPlainOnly: true })
    public password: string;

    // @OneToOne(() => Address, {eager: true}) // load Address by default
    @OneToOne(() => Address, { eager: true, cascade: true }) // enabling cascade property allow current entity to create the object for another properly in relationship 
    @JoinColumn()
    public address: Address;

    @OneToMany(() => Post, (post: Post) => post.author)
    public posts?: Post[];

    @Column({
        default: JSON.stringify([Role.User])
    })
    public roles: string

    @Column({
        default: JSON.stringify([])
    })
    public permissions: string
}

export default User;