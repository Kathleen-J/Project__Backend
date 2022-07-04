/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 
 exports.up = async(knex) => {
    await knex.schema.createTable('education_forms', (table) => {
      table
        .increments('id')
        .primary()
        .comment('Идентификатор');
      table
        .string('form_name')
        .notNullable()
        .unique()
        .comment('Наименование формы обучения');
      table.comment('Формы обучения');
    });
    await knex.schema.createTable('education_areas', (table) => {
      table
        .increments('id')
        .primary()
        .comment('Идентификатор');
      table
        .string('area_name')
        .notNullable()
        .unique()
        .comment('Наименование направления');
      table
        .string('status_area', 64)
        .notNullable()
        .defaultTo('active')
        .comment('Статус направления');
      table.comment('Учебные направления');
    });
    await knex.schema.createTable('disciplines', (table) => {
      table
        .increments('id')
        .primary()
        .comment('Идентификатор');
      table
        .integer('id_education_area')
        .notNullable()
        .references('id')
        .inTable('education_areas')
        .comment('Идентификатор направления');
      table
        .string('discipline_name')
        .notNullable()
        .unique()
        .comment('Наименование дисциплины');
      table
        .string('status_discipline', 64)
        .notNullable()
        .defaultTo('active')
        .comment('Статус дисциплины');
      table.comment('Дисциплины');
    });
    await knex.schema.createTable('education_programs', (table) => {
      table
        .increments('id')
        .primary()
        .comment('Идентификатор');
      table
        .integer('id_education_form')
        .notNullable()
        .references('id')
        .inTable('education_forms')
        .comment('Идентификатор формы обучения');
      table
        .integer('id_discipline')
        .notNullable()
        .references('id')
        .inTable('disciplines')
        .comment('Идентификатор дисциплины');
      table
        .string('profile_name')
        .notNullable()
        .unique()
        .comment('Наименование профиля');
      table
        .string('status_program', 64)
        .notNullable()
        .defaultTo('active')
        .comment('Статус программы');
      table
        .integer('price')
        .comment('Цена');
      table
        .specificType('modules', 'integer ARRAY')
        .comment('Модули программы');
      table.comment('Программы обучения');
    });
    await knex.schema.createTable('roles', (table) => {
      table
        .increments('id')
        .primary()
        .comment('Идентификатор');
      table
        .string('role')
        .notNullable()
        .comment('Роль');
      table.comment('Роли');
    });
    await knex.schema.createTable('users', (table) => {
      table
        .increments('id')
        .primary()
        .comment('Идентификатор');
      table
        .string('login', 256)
        .notNullable()
        .unique()
        .comment('Логин');
      table
        .string('password', 2048)
        .notNullable()
        .comment('Пароль');
      table
        .string('status_user', 64)
        .notNullable()
        .defaultTo('active')
        .comment('Статус пользователя');
      table
        .integer('id_role')
        .references('id')
        .inTable('roles')
        .comment('Идентификатор роли');
      table
        .timestamp('created_at', {useTz: false})
        .notNullable()
        .defaultTo(knex.fn.now())
        .comment('Дата создания');
      table
        .timestamp('updated_at', {useTz: false})
        .nullable()
        .comment('Дата обновления');
      table.comment('Пользователи');
    });
    await knex.schema.createTable('students_education_programs', (table) => {
      table
        .increments('id')
        .primary()
        .comment('Идентификатор');
      table
        .integer('id_user')
        .notNullable()
        .references('id')
        .inTable('users')
        .comment('Идентификатор пользователя');
      table
        .integer('id_education_program')
        .notNullable()
        .references('id')
        .inTable('education_programs')
        .comment('Идентификатор программы обучения');
      table
        .string('education_status', 64)
        .notNullable()
        .defaultTo('unfinished')
        .comment('Статус обучения');
      table
        .string('program_status', 64)
        .notNullable()
        .defaultTo('active')
        .comment('Статус программы');
      table
        .specificType('progress', 'integer ARRAY')
        .comment('Прогресс обучения');
      table
        .integer('test_results');
      table
        .timestamp('purchase_date', {useTz: false})
        .notNullable()
        .defaultTo(knex.fn.now())
        .comment('Дата покупки');
      table
        .timestamp('status_updated_at', {useTz: false})
        .nullable()
        .comment('Дата обновления статуса обучения');
      table
        .timestamp('test_finished_at', {useTz: false})
        .nullable()
        .comment('Дата сдачи теста');
      table.comment('Программы обучения студентов');
    });
    await knex.schema.createTable('curators_of_disciplines', (table) => {
      table
        .increments('id')
        .primary()
        .comment('Идентификатор');
      table
        .integer('id_user_curator')
        .notNullable()
        .references('id')
        .inTable('users')
        .comment('Идентификатор пользователя');
      table
        .integer('id_discipline')
        .notNullable()
        .references('id')
        .inTable('disciplines')
        .comment('Идентификатор дисциплины');
      table
        .string('status_curator', 64)
        .notNullable()
        .defaultTo('active')
        .comment('Статус куратора');
      table.comment('Кураторы дисциплин');
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async(knex) => {
    await knex.schema.dropTable('education_forms');
    await knex.schema.dropTable('education_areas');
    await knex.schema.dropTable('disciplines');
    await knex.schema.dropTable('education_programs');
    await knex.schema.dropTable('roles');
    await knex.schema.dropTable('users');
    await knex.schema.dropTable('students_education_programs');
    await knex.schema.dropTable('curators_of_disciplines');
  };