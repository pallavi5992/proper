const db = require("../models");
const ModuleConfig = db.moduleConfig;

const addModuleConfig = async (req, res) => {
  try {
    const {
      ModuleID,
      DataYearID,
      Target,
      TargetYearID,
      DataRefershFrequency,
      As_On_Date,
      StartupEngaged,
      ContractsSigned,
      ConsolidatedMonth,
      TargetFor,
    } = req.body;

    const userId=req.userId

    const isModuleIdConfigData=await ModuleConfig.findOne({
      where:{
        ModuleID:ModuleID
      }
    });

    if(isModuleIdConfigData){
      await ModuleConfig.update({
        DataYearID: DataYearID,
        Target: Target,
        TargetYearID: TargetYearID,
        DataRefershFrequency: DataRefershFrequency,
        ModifiedOn:  new Date(),
        ModifiedBy: userId,
        As_On_Date:As_On_Date,
        StartupEngaged: StartupEngaged,
        ContractsSigned: ContractsSigned,
        ConsolidatedMonth: ConsolidatedMonth,
        TargetFor: TargetFor||null,
      },{
        where:{
          ModuleID:ModuleID
        }
      });
      return res
      .status(200)
      .send({
        status: true,
        message: "Module configuration upadted successfully",
      });
    }else{
      await ModuleConfig.create({
        ModuleID: ModuleID,
        DataYearID: DataYearID,
        Target: Target,
        TargetYearID: TargetYearID,
        DataRefershFrequency: DataRefershFrequency,
        ModifiedOn:  new Date(),
        ModifiedBy: userId,
        As_On_Date:As_On_Date,
        StartupEngaged: StartupEngaged,
        ContractsSigned: ContractsSigned,
        ConsolidatedMonth: ConsolidatedMonth,
        TargetFor: TargetFor||null,
      });
      return res
      .status(200)
      .send({
        status: true,
        message: "Module configuration added successfully",
      });
    }

   

  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getModuleConfigByModuleId=async(req,res)=>{
    try {
        const moduleId=req.query.moduleId;
        const configData=await ModuleConfig.findOne({
            where:{
                ModuleID:moduleId
            }
        })
        return res.status(200).send({ status: true, message: "data found",data:configData });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
        
    }
}

const updateModuleConfig = async (req, res) => {
    try {
      const {
        ModuleID,
        DataYearID,
        Target,
        TargetYearID,
        DataRefershFrequency,
        As_On_Date,
        StartupEngaged,
        ContractsSigned,
        ConsolidatedMonth,
        TargetFor,
      } = req.body;
  
      const userId=req.userId
  

      await ModuleConfig.create({
        ModuleID: ModuleID,
        DataYearID: DataYearID,
        Target: Target,
        TargetYearID: TargetYearID,
        DataRefershFrequency: DataRefershFrequency,
        ModifiedOn:  new Date(),
        ModifiedBy: userId,
        As_On_Date:As_On_Date,
        StartupEngaged: StartupEngaged,
        ContractsSigned: ContractsSigned,
        ConsolidatedMonth: ConsolidatedMonth,
        TargetFor: TargetFor||null,
      });
      return res
        .status(200)
        .send({
          status: true,
          message: "Module configuration updated successfully",
        });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  };

module.exports = {
  addModuleConfig,
  getModuleConfigByModuleId,
  updateModuleConfig
};
