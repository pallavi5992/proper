
module.exports = (sequelize, Sequelize, DataTypes) => {
    const User = sequelize.define("ddpdashboard_users", {
        UserId: {
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        Email_Id:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        User_Name: {  
            type: DataTypes.STRING,
            allowNull: false,
        },
        Password:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        Mobile_No:{
            type:Sequelize.STRING,
            allowNull:false
        },
        ModifiedOn:{
            type:DataTypes.DATE,
            allowNull:false
        },
        Deleted:{
            type:Sequelize.ENUM("0","1"),
            comment:"0-deleted,1-notDeleted",
            allowNull:true
        },
        ModifiedBy:{
            type:DataTypes.INTEGER,
            allowNull:false
        },

        UserType:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        personalNumber:{
            type:Sequelize.STRING,
            allowNull:true
        },
        MobileOTP:{
            type:DataTypes.STRING,
            allowNull:true
        },
        accessToken:{
            type:Sequelize.TEXT,
            allowNull:true
        },
        VerifyOTP:{
            type:DataTypes.STRING,
            allowNull:true
        },
        Organisation:{
            type:Sequelize.STRING,
            allowNull:true
        },
        Designation:{
            type:Sequelize.STRING,
            allowNull:true
        },
      
        LoginFailedCount:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        LoginFailedDate:{
            type:DataTypes.DATE,
            allowNull:true
        },
        EmailLinkOTP:{
            type:DataTypes.STRING,
            allowNull:true
        }
    }) 
    return User
}