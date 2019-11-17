import CandidateResponse from '../models/candidateresponse';


async function createCandidateResponse(candidateResp: CandidateResponse): Promise<CandidateResponse> {
  console.log('BEGIN create new candidate response');
  console.log(candidateResp);
  const newCandidateResponse = {
    label: candidateResp.label,
    candidate_id: candidateResp.candidate_id,
    question_id: candidateResp.question_id
  };
  console.log('newCandidateResponse initialized');
  console.log(newCandidateResponse);
  return CandidateResponse.create(newCandidateResponse);
}


function getCandidateAllResponse(candidateId: number): Promise<CandidateResponse[]> {
  return CandidateResponse.findAll({
    where: {
      candidate_id: candidateId
    }
  });
}


export = { createCandidateResponse, getCandidateAllResponse };
