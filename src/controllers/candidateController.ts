import Candidate from '../models/candidate';


async function createCandidate(candidate: Candidate): Promise<Candidate> {
  console.log('BEGIN create new MCQ');
  const newCandidate = {
    idCandidature: candidate.idCandidature,
    mark: candidate.mark
  };
  console.log('newcandidate initialised');
  console.log(newCandidate);
  return Candidate.create(newCandidate);
}



function getCandidateByCandidatureId(candidateId: number): Promise<Candidate> {
  return Candidate.findOne({
    where: {
      idCandidature: candidateId
    }
  });
}


function setCandidateMark(candidateId: number, mark: number): Promise<[number, Candidate[]]> {
  return Candidate.update(
    { mark: mark},
    { returning: true,
      where: {
        id: candidateId
      }
    });
}

export = { createCandidate, getCandidateByCandidatureId, setCandidateMark };
