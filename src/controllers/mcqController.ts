import Mcq from '../models/mcq';


async function createNewMcq(mcq: Mcq): Promise<Mcq> {
  console.log('BEGIN create new MCQ');
  const newMcq = {
    title: mcq.title,
    formation: mcq.formation,
    origin: mcq.origin,
    favorite: false
  };
  console.log('newmcq initialised');
  console.log(newMcq);
  return Mcq.create(newMcq);
}

function getAllMcqs(): Promise<Mcq[]> {
  return Mcq.findAll();
}

function getMcqByTitle(mcqTitle: string): Promise<Mcq> {
  return Mcq.findOne({
    where: {
      title: mcqTitle
    }
  });
}

function getMcqById(id: number): Promise<Mcq> {
  return Mcq.findOne({
    where: {
      id: id
    }
  });
}


/*
function getMcqByFormationAndOrigin(formation: string, origin: string): Promise<Mcq> {
  return Mcq.findAll({
    where: {
      formation: formation,
      origin: origin
    }
  });
}
*/


function getFavoriteMcqByFormationAndOrigin(formation: string, origin: string): Promise<Mcq> {
  return Mcq.findOne({
    where: {
      formation: formation,
      origin: origin,
      favorite: true,
    }
  });
}


export = { getMcqByTitle, createNewMcq, getMcqById, getAllMcqs, getFavoriteMcqByFormationAndOrigin };
