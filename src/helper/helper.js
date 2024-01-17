const db = require("../models");
const Roles = db.role;
const Access=db.access;
const Module=db.module

function isRole(role) {
  if (role == "SuperAdmin") {
    return "Super Admin";
  } else if (role == "Admin") {
    return "Module Admin";
  } else if (role == "Unit") {
    return "Restricted User-AI";
  } else if (role == "Organization") {
    return "Restricted User-offset & AI";
  }else if(role=="Factory"){
    return "Restricted User-offset & AI"
  }
};

async function getRole(roleId) {
  const result = await Roles.findOne({
    where: {
      RoleId: parseInt(roleId),
    },
  });
  if (result) {
    return isRole(result.Role);
  }
  return "";
}

async function getRoleforLogin(roleId) {
  const result = await Roles.findOne({
    where: {
      RoleId: parseInt(roleId),
    },
  });
  if (result) {
    return result.Role||"";
  }
  return "";
};

async function getAccessModuleUser(moduleId){
  const moduleName=[]
  for(let i=0;i<moduleId.length;i++){
    const getAccessData=await Module.findOne({
      where:{
        ModuleID:moduleId[i]
      }
    });
    if(getAccessData){
      moduleName.push(getAccessData?.ModuleName)
    }
  }
  return moduleName.length>0?moduleName:""
}


async function userModuleAssign(userId){
 
  const getUserAccessData=await Access.findOne({
    where:{
      UserID:parseInt(userId)
    }
  })
  if(getUserAccessData){
    const result=await getAccessModuleUser(getUserAccessData?.ModuleID)
    return result
  }
return ""
}

module.exports = {
  getRole,
  getRoleforLogin,
  getAccessModuleUser,
  userModuleAssign
  
};
