import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tenancy {
  @PrimaryGeneratedColumn('increment')
  tenancy_id: number;

  @Column({ unique: true, nullable: false })
  name: string;
}
