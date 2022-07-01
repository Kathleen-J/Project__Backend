/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.seed = async function(knex) {
  
  //trancate
  await knex.raw('TRUNCATE TABLE education_forms RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE education_areas RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE disciplines RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE education_programs RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE roles RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE students_education_programs RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE curators_of_disciplines RESTART IDENTITY CASCADE');
  
  //insert
  await knex('education_forms').insert([
    {form_name: 'Профессия'},
    {form_name: 'Курс'},
  ]);
  await knex('education_areas').insert([
    {area_name: 'Программирование'},
    {area_name: 'Дизайн'},
    {area_name: 'Иностранные языки'},
  ]);
  await knex('disciplines').insert([
    {id_education_area: 1, discipline_name: 'Python'},
    {id_education_area: 1, discipline_name: 'JavaScript'},
    {id_education_area: 1, discipline_name: 'SQL'},
    {id_education_area: 2, discipline_name: '2D'},
    {id_education_area: 2, discipline_name: '3D'},
    {id_education_area: 3, discipline_name: 'Английский язык'},
    {id_education_area: 3, discipline_name: 'Французский язык', status_discipline: 'deleted'},
  ]);
  await knex('education_programs').insert([
    {id_education_form: 1, id_discipline: 1, profile_name: 'Full-stack разработчик', price: 200000},
    {id_education_form: 1, id_discipline: 2, profile_name: 'Frontend разработчик', price: 90000},
    {id_education_form: 1, id_discipline: 2, profile_name: 'Backend разработчик', price: 120000},
    {id_education_form: 2, id_discipline: 2, profile_name: 'Основы JS', price: 30000},
    {id_education_form: 2, id_discipline: 3, profile_name: 'Основы SQL', price: 50000},
    {id_education_form: 1, id_discipline: 4, profile_name: 'Графический дизайнер', price: 80000},
    {id_education_form: 1, id_discipline: 5, profile_name: 'Дизайнер интерьера', price: 80000},
    {id_education_form: 1, id_discipline: 5, profile_name: '3D художник', price: 115000},
    {id_education_form: 2, id_discipline: 6, profile_name: 'Разговорный английский', price: 20000},
    {id_education_form: 2, id_discipline: 6, profile_name: 'Технический английский', price: 30000, status_program: 'deleted'},
    {id_education_form: 2, id_discipline: 7, profile_name: 'Разговорный французский', price: 25000},
  ]);
  await knex('roles').insert([
    {role: 'student'},
    {role: 'curator'},
    {role: 'admin'},
  ]);
  await knex('users').insert([
    {login: 'Kathleen', password: '123', id_role: 3},
    {login: 'John', password: '123', id_role: 2},
    {login: 'Alice', password: '123', id_role: 2},
    {login: 'Mark', password: '123', id_role: 2},
    {login: 'Kevin', password: '123', id_role: 1},
    {login: 'Richard', password: '123', id_role: 1},
    {login: 'Jane', password: '123', id_role: 1},
    {login: 'Mary', password: '123', id_role: 1},
    {login: 'Oswald', password: '123', id_role: 1},
    {login: 'Pete', password: '123', id_role: 1},
  ]);
  await knex.raw('INSERT INTO students_education_programs (id_user, id_education_program) VALUES (1, 1)');
  await knex('curators_of_disciplines').insert([
    {id_user_curator: 2, id_discipline: 1},
    {id_user_curator: 2, id_discipline: 2},
    {id_user_curator: 2, id_discipline: 3},
    {id_user_curator: 4, id_discipline: 1, status_curator: 'deleted'},
    {id_user_curator: 3, id_discipline: 4},
    {id_user_curator: 3, id_discipline: 5},
    {id_user_curator: 3, id_discipline: 6},
    {id_user_curator: 3, id_discipline: 7},
  ]);

};