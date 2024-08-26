module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  port: 5432,
  password: 'postgres',
  database: 'devburger',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
}
