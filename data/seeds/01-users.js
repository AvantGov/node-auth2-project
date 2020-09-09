
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'janedoe1', password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', access_level: 'admin', department: 'marketing'},        
        {id: 2, username: 'janedoe1', password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', access_level: 'admin', department: 'marketing'},
        {id: 3, username: 'janedoe1', password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', access_level: 'admin', department: 'marketing'},
        {id: 4, username: 'janedoe1', password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', access_level: 'admin', department: 'sales'},
        {id: 5, username: 'janedoe1', password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', access_level: 'admin', department: 'sales'},
        {id: 6, username: 'janedoe1', password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', access_level: 'admin', department: 'sales'}        
      ]);
    });
};
