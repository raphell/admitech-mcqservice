import { Request, Response, Router } from 'express';

import mcqController from '../controllers/mcqController';
import questionController from '../controllers/questionController';
import responseController from '../controllers/responseController';
import candidateController from '../controllers/candidateController';
import candidateResponseController from '../controllers/candidateResponseController';

import Mcq from '../models/mcq';
import Question from '../models/question';
import ResponseM from '../models/response';
import Candidate from '../models/candidate';
import CandidateResponse from '../models/candidateresponse';

const qcmRouter = Router();

qcmRouter.get('/', (req: Request, res: Response) => {
  res.send('YAY you reach the mcq service API !');
});




//----------------------------------------------------------------------------------------------------

qcmRouter.post('/mcq', async (req: Request, res: Response) => {
  let mcq = req.body;

  try{
    let newMcq = new Mcq();
    newMcq.title = mcq.title;
    newMcq.formation = mcq.formation;
    newMcq.origin = mcq.origin;
    let createdMcq = await mcqController.createNewMcq(newMcq);

    if (createdMcq != undefined) {
      mcq.questions.forEach(async (question: any) => {
        let newQuestion = new Question();
        newQuestion.title = question.title;
        newQuestion.mcq_id = createdMcq.id;
        let createdQuestion = await questionController.createQuestion(newQuestion);

        if(createdQuestion!=undefined){
          question.responses.forEach(async (response: any) => {
            let newResponse = new ResponseM();
            newResponse.label = response.label;
            newResponse.correct = response.correct;
            newResponse.question_id = createdQuestion.id;
            let createdResponse = await responseController.createResponse(newResponse);

            if(createdResponse==undefined){
              res.status(400)
                .send('Probleme during response creation');
            }
          });
        }
        else{
          res.status(400)
            .send('Probleme during question creation');
        }
      });
    } else {
      res.status(400)
        .send('Probleme during MCQ creation');
    }
    res.status(201)
      .send({final:'the mcq creation succed'});

  } catch (e) {
    res.status(500)
      .send(e.message);
  }
});


//----------------------------------------------------------------------------------------------------



qcmRouter.put('/mcq/:id/favorite', async (req: Request, res: Response) => {
  let mcq = await mcqController.getMcqById(parseInt(req.params.id));

  await mcqController.unsetFavorite(mcq.formation, mcq.origin);

  await mcqController.setFavorite(parseInt(req.params.id));

  res.status(201)
    .end();
});


//----------------------------------------------------------------------------------------------------



qcmRouter.put('/attribute/:idMcq/:idCandidature', async (req: Request, res: Response) => {

  let candidate = await candidateController.getCandidateByCandidatureId(parseInt(req.params.idCandidature));

  if(candidate==null){
    let newCandidate = new Candidate();
    newCandidate.mark = -1;
    newCandidate.mcq = 0;
    newCandidate.idCandidature = parseInt(req.params.idCandidature);
    candidate = await candidateController.createCandidate(newCandidate);
  }

  await candidateController.setCandidateMcq(candidate.id, parseInt(req.params.idMcq));

  res.status(201)
    .end();
});


//----------------------------------------------------------------------------------------------------


qcmRouter.delete('/mcq/:id', async (req: Request, res: Response) => {
  let mcqToDelete = await mcqController.getMcqById(parseInt(req.params.id));

  if (mcqToDelete!=null){

    let questions = await questionController.getQuestionByMcqId(mcqToDelete.id);
    for (const question of questions){
      let responses = await responseController.getResponseByQuestion(question.id);
      for (const response of responses){
        responseController.deleteResponse(response.id);
      }
      questionController.deleteQuestion(question.id);
    }
    mcqController.deleteMcq(mcqToDelete.id);
    res.status(201)
      .end();
  }
  else{
    res.status(404)
      .send('Probleme, Mcq not found');
  }
});


//----------------------------------------------------------------------------------------------------


qcmRouter.post('/responseCandidat', async (req: Request, res: Response) => {
  let candidateResponses = req.body;
  let candidate = await candidateController.getCandidateByCandidatureId(candidateResponses.idCandidature);

  if(candidate==null){
    let newCandidate = new Candidate();
    newCandidate.mark = -1;
    newCandidate.idCandidature = candidateResponses.idCandidature;
    candidate = await candidateController.createCandidate(newCandidate);
  }

  let note = 0;
  for (const candidateResponse of candidateResponses.questions){
    let newCandidateResponse = new CandidateResponse();

    newCandidateResponse.responses = candidateResponse.responses.join(':'); //responses is a table of id
    newCandidateResponse.candidate_id = candidate.id;
    newCandidateResponse.question_id = candidateResponse.idQuestion;

    let createdCandidateResponse = await candidateResponseController.createCandidateResponse(newCandidateResponse);

    if(createdCandidateResponse!=undefined){
      let questionGoodResponses = await responseController.getCorrectResponseByQuestion(createdCandidateResponse.question_id);
      let isResponseValid = true;
      let resp = createdCandidateResponse.responses.split(':').map( (strResp: string) => {return parseInt(strResp); });

      for (const candRes of resp){ //for each response of the candidate, verify if the response if correct
        let verif = await responseController.getResponseById(candRes);
        if (verif==null){
          isResponseValid = false;
        }
        else{
          isResponseValid = verif.correct;
        }
      }
      //for each good response of the question, check if the candidate valide it
      questionGoodResponses.forEach( (goodResp: ResponseM) => {
        isResponseValid = resp.includes(goodResp.id);
      });

      if(isResponseValid){
        note = note + 1;
      }
    }
    else{
      res.status(500)
        .send('Probleme during candidateResponse creation');
    }
  }
  candidateController.setCandidateMark(candidate.id, note);

  res.type('application/json')
    .status(201)
    .send({note: note});
});


//----------------------------------------------------------------------------------------------------


qcmRouter.get('/mcqs', async (req: Request, res: Response) => {
  let mcqs: Mcq[] = await mcqController.getAllMcqs();
  let result = {
    mcqs: [] as any
  };

  mcqs.forEach((mcq: Mcq) => {
    let mRes = {
      id: mcq.id,
      title: mcq.title,
      origin: mcq.origin,
      formation: mcq.formation,
      favorite: mcq.favorite
    };
    result.mcqs.push(mRes);
  });
  res.type('application/json')
    .status(200)
    .send(result);
});


//----------------------------------------------------------------------------------------------------


qcmRouter.get('/candidate/:idCandidate/note', async (req: Request, res: Response) => {
  let candidate = await candidateController.getCandidateByCandidatureId(parseInt(req.params.idCandidate));
  if (candidate!=null){
    let note = candidate.mark;
    res.type('application/json')
      .status(200)
      .send({mark: note});
  }
  else{
    res.status(404)
      .send('Candidate not found');
  }
});


//----------------------------------------------------------------------------------------------------


qcmRouter.get('/candidates', async (req: Request, res: Response) => {
  let candidates: Candidate[] = await candidateController.getCandidates();
  let result = {
    candidates: [] as any
  };

  candidates.forEach((candidate: Candidate) => {
    let mRes = {
      id: candidate.id,
      title: candidate.mark,
      mcq: candidate.mcq,
    };
    result.candidates.push(mRes);
  });
  res.type('application/json')
    .status(200)
    .send(result);
});



//----------------------------------------------------------------------------------------------------



qcmRouter.get('/mcq/:id', async (req: Request, res: Response) => {
  let mcq = await mcqController.getMcqById(parseInt(req.params.id));
  if(mcq!=null){
    let result = {
      id: mcq.id,
      title: mcq.title,
      formation: mcq.formation,
      origin: mcq.origin,
      favorite: mcq.favorite,
      questions:[] as any
    };
    let mcqquestions = await questionController.getQuestionByMcqId(mcq.id);
    for (const question of mcqquestions){
      let qRes = {
        id: question.id,
        title: question.title,
        responses: [] as any
      };
      let questionresponses = await responseController.getResponseByQuestion(question.id);
      for (const response of questionresponses){
        let rRes = {
          id: response.id,
          label: response.label
        };
        qRes.responses.push(rRes);
      }
      result.questions.push(qRes);
    }
    res.type('application/json')
      .status(200)
      .send(result);
  }
  else{
    res.status(404)
      .send('Probleme, Mcq not found');
  }
});


//----------------------------------------------------------------------------------------------------


qcmRouter.get('/mcqAdmin/:id', async (req: Request, res: Response) => {
  if (res.locals.user.role === 'administration') {
    let mcq = await mcqController.getMcqById(parseInt(req.params.id));
    if(mcq!=null){
      let result = {
        id: mcq.id,
        title: mcq.title,
        formation: mcq.formation,
        origin: mcq.origin,
        favorite: mcq.favorite,
        questions:[] as any
      };
      let mcqquestions = await questionController.getQuestionByMcqId(mcq.id);
      for (const question of mcqquestions){
        let qRes = {
          id: question.id,
          title: question.title,
          responses: [] as any
        };
        let questionresponses = await responseController.getResponseByQuestion(question.id);
        for (const response of questionresponses){
          let rRes = {
            id: response.id,
            label: response.label,
            correct: response.correct
          };
          qRes.responses.push(rRes);
        }
        result.questions.push(qRes);
      }
      res.type('application/json')
        .status(200)
        .send(result);
    }
    else{
      res.status(404)
        .send('Probleme, Mcq not found');
    }
  }
  else{
    res.status(403)
      .send('Vous n\'avez pas accès à la ressource demandée');
  }
});


//----------------------------------------------------------------------------------------------------


qcmRouter.get('/candidate/:id/results', async (req: Request, res: Response) => {
  let candidate = await candidateController.getCandidateByCandidatureId(parseInt(req.params.id));
  let result = {
    idCandidature: req.params.id,
    mark: candidate.mark,
    questions: [] as any
  };
  if (candidate!=null){
    let candidateResponses = await candidateResponseController.getCandidateAllResponse(candidate.id);
    for (const candidateRep of candidateResponses){
      let question = await questionController.getQuestionById(candidateRep.question_id);
      let qRes = {
        id: question.id,
        label: question.title,
        candidateResponses: candidateRep.responses.split(':').map( (strResp: string) => {return parseInt(strResp); }),
        responses: [] as any
      };
      let questionResponses = await responseController.getResponseByQuestion(question.id);
      for (const response of questionResponses){
        let rRes = {
          id: response.id,
          label: response.label,
          correct: response.correct
        };
        qRes.responses.push(rRes);
      }
      result.questions.push(qRes);
    }
    res.type('application/json')
      .status(200)
      .send(result);
  }
  else{
    res.status(404)
      .send('Probleme, Candidate not found');
  }
});


//----------------------------------------------------------------------------------------------------


qcmRouter.get('/candidate/:idCandidate/mcq', async (req: Request, res: Response) => {
  let candidate = await candidateController.getCandidateByCandidatureId(parseInt(req.params.idCandidate));
  let mcq = await mcqController.getMcqById(candidate.mcq);
  if(mcq!=null){
    let result = {
      id: mcq.id,
      title: mcq.title,
      questions:[] as any
    };
    let mcqquestions = await questionController.getQuestionByMcqId(mcq.id);
    for (const question of mcqquestions){
      let qRes = {
        id: question.id,
        title: question.title,
        responses: [] as any
      };
      let questionresponses = await responseController.getResponseByQuestion(question.id);
      for (const response of questionresponses){
        let rRes = {
          id: response.id,
          label: response.label
        };
        qRes.responses.push(rRes);
      }
      result.questions.push(qRes);
    }
    res.type('application/json')
      .status(200)
      .send(result);
  }
  else{
    res.status(404)
      .send('Probleme, mcq not found');
  }
});




export = qcmRouter;
