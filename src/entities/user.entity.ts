import { Entity, CreateDateColumn, Column, PrimaryGeneratedColumn, DeleteDateColumn } from "typeorm";

@Entity({schema: "public", name: "user_profile"})
export class UserProfile { 
    @PrimaryGeneratedColumn()
    user_id: number
    @Column({ type: "varchar", length: 255, default: null})
    username: string
    @Column({ type: "varchar", length: 255, default: null})
    fullname: string
    @Column({ type: "varchar", length: 255, default: null})
    email: string
    @Column({ type: "varchar", length: 255, default: null})
    birth_of_date: string
    @Column({ type: "varchar", length: 255, default: null})
    profile_picture: string
    @CreateDateColumn({ type: "timestamp" })
    created_at: Date
    @CreateDateColumn({ type: "timestamp", default: null })
    updated_at: Date

}