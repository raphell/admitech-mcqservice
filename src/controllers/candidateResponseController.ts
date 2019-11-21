import CandidateResponse from '../models/candidateresponse';


async function createCandidateResponse(candidateResp: CandidateResponse): Promise<CandidateResponse> {
  console.log('BEGIN create new candidate response');
  console.log('CANDIDATE'+candidateResp);

  const newCandidateResponse = {
    candidate_id: candidateResp.candidate_id,
    question_id: candidateResp.question_id,
    responses: candidateResp.responses,
  };

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
