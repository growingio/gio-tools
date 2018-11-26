import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * User model
 */
@Entity('authentications')
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  key: string;
  @Column()
  provider: string;
  @Column()
  uid: string;
  @Column()
  token: string;
  @Column({ name: 'created_at' })
  createdAt: Date;
  @Column({ name: 'updated_at' })
  updatedAt: Date;
}
