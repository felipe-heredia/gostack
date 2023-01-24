import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export default class Categories1593096316542 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'categories',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'uuid',
            default: 'uuid_generate_v4()',
            generationStrategy: 'uuid',
            isPrimary: true,
          }),
          new TableColumn({
            name: 'title',
            type: 'varchar',
          }),
          new TableColumn({
            name: 'created_at',
            default: 'now()',
            type: 'timestamp',
          }),
          new TableColumn({
            name: 'updated_at',
            default: 'now()',
            type: 'timestamp',
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('categories');
  }
}
