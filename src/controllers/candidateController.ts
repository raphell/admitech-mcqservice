import Candidate from '../models/candidate';


async function createCandidate(candidate: Candidate): Promise<Candidate> {
  const newCandidate = {
    idCandidature: candidate.idCandidature,
    mark: candidate.mark
  };

  return Candidate.create(newCandidate);
}


function getCandidateByCandidatureId(candidateId: number): Promise<Candidate> {
  return Candidate.findOne({
    where: {
      idCandidature: candidateId
    }
  });
}


function getCandidates(): Promise<Candidate[]> {
  return Candidate.findAll();
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


function setCandidateMcq(candidateId: number, mcq: number): Promise<[number, Candidate[]]> {
  return Candidate.update(
    { mcq: mcq},
    { returning: true,
      where: {
        id: candidateId
      }
    });
}

export = { createCandidate, getCandidateByCandidatureId, setCandidateMark, setCandidateMcq, getCandidates };
