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


function setFavorite(id: number): Promise<[number, Mcq[]]> {
  return Mcq.update(
    { favorite: true},
    { returning: true,
      where: {
        id: id
      }
    });
}

function unsetFavorite(formation: string, origin: string): Promise<[number, Mcq[]]> {
  return Mcq.update(
    { favorite: false},
    { returning: true,
      where: {
        favorite: true,
        origin: origin,
        formation: formation
      }
    }
  );
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

function deleteMcq(id: number): Promise<number> {
  return Mcq.destroy({
    where: {
      id: id
    }
  });
}


export = { getMcqByTitle, deleteMcq, setFavorite, unsetFavorite, createNewMcq, getMcqById, getAllMcqs, getFavoriteMcqByFormationAndOrigin };
