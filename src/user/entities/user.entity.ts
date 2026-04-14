import { Entity, Index, PrimaryKey, Property } from '@mikro-orm/decorators/legacy';
import { ApplicationUserContract } from '@sclable/nestjs-auth';

@Index({ properties: ['email'] })
@Entity()
export class User implements ApplicationUserContract {
  @PrimaryKey('uuid')
  id!: string;
  @Property()
  name!: string;
  @Property()
  surname!: string;
  @Property()
  email!: string;
  @Property()
  password!: string;
  @Property({ type: 'date', defaultRaw: 'timestamp with time zone' })
  createdAt!: Date;
  @Property({ type: 'date', defaultRaw: 'timestamp with time zone' })
  updatedAt!: Date;
  @Property({ type: 'date', defaultRaw: 'timestamp with time zone' })
  deletedAt?: Date | null;
}
