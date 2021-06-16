exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('users')
        .del()
        .then(function () {
            // Inserts seed entries
            return knex('users').insert([
                {
                    id: 1,
                    username: 'Kyle',
                    password: '1234',
                    phone_number: '999-999-9999'
                },
                {
                    id: 2,
                    username: 'Rachel',
                    password: '1234',
                    phone_number: '999-999-9999'
                },
                {
                    id: 3,
                    username: 'Tristan',
                    password: '1234',
                    phone_number: '999-999-9999'
                }
            ])
        })
}
