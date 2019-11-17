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

export = { createCandidate, getCandidateByCandidatureId };
