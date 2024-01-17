require("dotenv").config();
const {Sequelize,DataTypes}=require("sequelize");
const {sequelize}=require("../config/db.config")


const db={};
db.Sequelize=Sequelize; 
db.sequelize=sequelize;

db.user=require("./user.model")(sequelize,Sequelize,DataTypes);
db.role=require("./role.model")(sequelize,Sequelize,DataTypes);
db.access=require("./accessassignment.model")(sequelize,Sequelize,DataTypes);
db.module=require("./module.model")(sequelize,Sequelize,DataTypes)
db.organisation=require("./organisation.model")(sequelize,Sequelize,DataTypes)
db.moduleConfig=require("./moduleConfig.model")(sequelize,Sequelize,DataTypes)
module.exports=db