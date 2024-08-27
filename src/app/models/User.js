import { Sequelize, Model } from 'sequelize'
import bcrypt from 'bcrypt'
/* 
This code defines a User model for the users table in the database using Sequelize:

Model inheritance: The User class extends the Model class of Sequelize.
Init method: Configures the template with the name, email, password_hash, and admin attributes, specifying the corresponding data types.
Export: Makes the User model available for other modules to import and use.
This model can be used to interact with the users table in the database, allowing operations such as inserting, querying, updating, and deleting user records.
*/

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        admin: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    )
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 10)
      }
    })

    return this
  }

  async comparePassword(password) {
    return bcrypt.compare(password, this.password_hash)
  }
}

export default User
