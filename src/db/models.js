const Sequelize = require('sequelize')

const db = new Sequelize({
    dialect: 'mysql',
    database: 'cbsocialmediadb',
    username: 'cbsocialuser',
    password: 'kushal98',
})

const COL_ID_DEF = {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
}
const COL_USERNAME_DEF = {
    type: Sequelize.DataTypes.STRING(30),
    unique: true,
    allowNull: false
}
const COL_TITLE_DEF = {
    type: Sequelize.DataTypes.STRING(140),
    allowNull: false
}
//Structure of database

const Users = db.define('user', {
    id: COL_ID_DEF,
    username: COL_USERNAME_DEF
})

const Posts = db.define('post', {
    id: COL_ID_DEF,
    title: COL_TITLE_DEF,
    body: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false
    }
})

const Comments = db.define('comment', {
    id: COL_ID_DEF,
    title: COL_TITLE_DEF,
    body: {
        type: Sequelize.DataTypes.TEXT('tiny')
    }
})

//Relationships between components of database
Users.hasMany(Posts)
Posts.belongsTo(Users)

Users.hasMany(Comments)
Comments.belongsTo(Users)

Posts.hasMany(Comments)
Comments.belongsTo(Posts)

//Export various components regarding database

module.exports = {
    db,
    Users,
    Posts,
    Comments
}