const { Assessment } = require(`../database/models`);

exports.submit = async (assessment) => {
  // use the sequelize model Assessments from packages/api/src/database/models to save
  // the assessment data in the PostgreSQL database
  await Assessment.create({
    catDateOfBirth: assessment.catDateOfBirth,
    catName: assessment.catName,
    instrumentType: assessment.instrumentType,
    riskLevel: assessment.riskLevel,
    score: assessment.score,

  });

};

exports.delete = async (id) => {
  const rowId = parseInt(id);
  console.log(id);
  await Assessment.destroy({
    where: {
      id: rowId,
    },
  });
};

// use the sequelize model Assessments from packages/api/src/database/models to fetch
// the assessment data from the PostgreSQL database
exports.getList = async () => await Assessment.findAll();
