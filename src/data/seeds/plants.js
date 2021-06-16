exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('plants')
        .del()
        .then(function () {
            // Inserts seed entries
            return knex('plants').insert([
                {
                    id: 1,
                    nickname: 'Greenish',
                    species: '',
                    h2o_frequency: '1 week',
                    image: 'testurl'
                },
                {
                    id: 2,
                    nickname: 'Mr. Greenie',
                    species: 'humtatumta',
                    h2o_frequency: '3 days',
                    image: 'testurl'
                },
                {
                    id: 3,
                    nickname: 'That Red one',
                    species: 'dwarf',
                    h2o_frequency: '48 hours',
                    image: 'testurl'
                }
            ])
        })
}
