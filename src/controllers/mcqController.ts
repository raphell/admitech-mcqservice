import Mcq from '../models/mcq';


async function createNewMcq(mcq: Mcq): Promise<Mcq> {
  console.log('BEGIN create new MCQ');
  const newMcq = {
    title: mcq.title,
    formation: mcq.formation,
    origin: mcq.origin,
    year: mcq.year
  };
  console.log('newmcq initialised');
  console.log(newMcq);
  return Mcq.create(newMcq);
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

export = { getMcqByTitle, createNewMcq, getMcqById };
