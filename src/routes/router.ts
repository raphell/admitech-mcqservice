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
//const request = require('request');

qcmRouter.get('/', (req: Request, res: Response) => {
  //logger.info('A request had been received on /');
  res.send('YAY you reach the mcq service API !');
});

/*
qcmRouter.get('/add/mcq', (req: Request, res: Response) => {
  console.log('BEGIN POST');
  //request.post('http://test-admitech-mcq-service.igpolytech.fr/mcq', {
  request.post('http://localhost:3000/mcq', {
    json: {
      title: 'My first MCQ',
      formation: 'IG',
      origin: 'IUT',
      questions:[
        { title:'question 1',
          responses: [
            { label:'first response',
              correct: true },
            { label:'second response',
              correct: false },
            { label:'thrid response',
              correct: false },
          ]},
        { title:'question 2',
          responses: [
            { label:'2 first response',
              correct: true },
            { label:'2 second response',
              correct: true },
            { label:'2 thrid response',
              correct: false },
          ]}
      ]
    }
  }, (error: any, res: Response, body: any) => {
    console.log('IN CALLBACK');
    if (error) {
      console.log('IN ERROR');
      console.error(error);
      return;
    }
    console.log(`statusCode: ${res.statusCode}`);
    if(res.statusCode==201){
      //res.send("SUCCESS")
    }
    else{
      //res.send("FAILED");
    }
    console.log(body);
  });
  console.log('behind post request');
});



qcmRouter.get('/add/rep', (req: Request, res: Response) => {
  console.log('BEGIN add responseCandidat');
  request.post('http://localhost:3000/responseCandidat', {
    json: {
      idQuestion: 15,
      idCandidature: 42,
      response: 'first ',
    }
  }, (error: any, res: Response, body: any) => {
    console.log('IN CALLBACK');
    if (error) {
      console.log('IN ERROR');
      console.error(error);
      return;
    }
    console.log(`statusCode: ${res.statusCode}`);
    console.log('RESULATS DE LA REQUETE POST : '+body);
    if(res.statusCode==201){
      if(body.correct){
        console.log('GOOD ANSWER');
        return;
      }
      else{
        console.log('BAAAAD ANSWER');
        return;
      }
    }
    else{
      console.log('FAILED');
      return;
    }
  });

  console.log('behind post request');
});
*/





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
              res.sendStatus(400).json('Probleme during response creation');
              res.end();
            }
          });
        }
        else{
          res.sendStatus(400).json('Probleme during question creation');
        }
      });
    } else {
      res.status(400).json('Probleme during MCQ creation');
    }
    console.log('BEFORE send status');
    res.sendStatus(201);
    console.log('AFTER send status');

  } catch (e) {
    console.log('ERROR : '+e.message);
    res.status(500).json(e.message);
  }
});






qcmRouter.put('/mcq/:id/favorite', async (req: Request, res: Response) => {
  let newFavoriteMcq = await mcqController.getMcqById(parseInt(req.params.id));
  if(newFavoriteMcq!=null){
    let oldFavoriteMcq = await mcqController.getFavoriteMcqByFormationAndOrigin(newFavoriteMcq.formation, newFavoriteMcq.origin);

    oldFavoriteMcq.favorite = false;
    oldFavoriteMcq.save();

    newFavoriteMcq.favorite = true;
    newFavoriteMcq.save();

    res.status(201)
      .end();
  }
  else{
    console.log('IN ERROR');
    res.sendStatus(404).json('Probleme, Mcq not found');
    res.end();
  }
});



qcmRouter.delete('/mcq/:id', async (req: Request, res: Response) => {
  let mcqToDelete = await mcqController.getMcqById(parseInt(req.params.id));

  if (mcqToDelete!=null){
    mcqToDelete.destroy();
    res.status(201)
      .end();
  }
  else{
    console.log('IN ERROR');
    res.sendStatus(404).json('Probleme, Mcq not found');
    res.end();
  }
});




qcmRouter.post('/responseCandidat', async (req: Request, res: Response) => {
  let candidateResponse = req.body;
  console.log('IN RESPONSE CANDIDAT');
  console.log(req.body);
  let candidate = await candidateController.getCandidateByCandidatureId(candidateResponse.idCandidature);
  console.log('candidate : '+candidate);
  //console.log("ITS ID : "+candidate.id);
  if(candidate==null){
    let newCandidate = new Candidate();
    newCandidate.mark = -1;
    newCandidate.idCandidature = candidateResponse.idCandidature;
    candidate = await candidateController.createCandidate(newCandidate);
    console.log('AFTER CREATING NEW CANDIDATE');
  }

  let newCandidateResponse = new CandidateResponse();
  newCandidateResponse.label = candidateResponse.response;
  newCandidateResponse.candidate_id = candidate.id;
  newCandidateResponse.question_id = candidateResponse.idQuestion;
  let createdCandidateResponse = await candidateResponseController.createCandidateResponse(newCandidateResponse);

  if(createdCandidateResponse!=undefined){
    //let question = await questionController.getQuestionById(createdCandidateResponse.question_id);
    let questionGoodResponses = await responseController.getCorrectResponseByQuestion(createdCandidateResponse.question_id);
    let candidateResponses = createdCandidateResponse.label.split('//');

    let isResponseValid = true;
    candidateResponses.forEach( async(candRes: string) => {   //for each response of the candidate, verify if the response if correct
      let verif = await responseController.getResponseByLabel(createdCandidateResponse.question_id, candRes);
      if (verif==null){
        isResponseValid = false;
      }
      else{
        isResponseValid = verif.correct;
      }
    });
    //for each good response of the question, check if the candidate valide it
    questionGoodResponses.forEach( (goodResp: ResponseM) => {
      isResponseValid = candidateResponses.includes(goodResp.label);
    });

    res.type('application/json')
      .status(201)
      .send({correct: isResponseValid});
  }
  else{
    res.sendStatus(500).json('Probleme during candidateResponse creation');
    res.end();
  }
});


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
      formation: mcq.formation
    };
    result.mcqs.push(mRes);
  });
  res.type('application/json')
    .status(200)
    .send(result);
});

qcmRouter.get('/mcq/:id', async (req: Request, res: Response) => {
  res.send('WOWOWOWOWOWWOWOWOWOWO');
  let mcq = await mcqController.getMcqById(parseInt(req.params.id));
  if(mcq!=null){
    let result = {
      id: mcq.id,
      title: mcq.title,
      questions:[] as any
    };
    let mcqquestions = await questionController.getQuestionByMcqId(mcq.id);
    for (const question of mcqquestions){
      console.log('each QUESTION : '+question);
      let qRes = {
        id: question.id,
        title: question.title,
        responses: [] as any
      };
      console.log(qRes);
      let questionresponses = await responseController.getResponseByQuestion(question.id);
      for (const response of questionresponses){
        console.log('each RESPONSE : '+response);
        let rRes = {
          id: response.id,
          label: response.label
        };
        console.log(rRes);
        console.log();
        qRes.responses.push(rRes);
      }
      result.questions.push(qRes);
    }
    res.type('application/json')
      .status(200)
      .send(result);
  }
  else{
    res.sendStatus(404).json('Probleme, Mcq not found');
    res.send('NUUUUUUUUUUUUUUUUUUUUULLL');
  }
});






qcmRouter.get('/candidat/:id/results', async (req: Request, res: Response) => {
  console.log('BEGIN GET CANDIDAT RESPONSES');
  let candidate = await candidateController.getCandidateByCandidatureId(parseInt(req.params.id));
  console.log('CANDIATE : '+candidate);
  let result = {
    idCandidature: req.params.id,
    questions: [] as any
  };
  if (candidate!=null){
    console.log('WEG GET THE CANDIDATE');
    let candidateResponses = await candidateResponseController.getCandidateAllResponse(candidate.id);
    for (const candidateRep of candidateResponses){
      let question = await questionController.getQuestionById(candidateRep.question_id);
      let qRes = {
        id: question.id,
        label: question.title,
        candidateResponse: candidateRep.label,
        responses: [] as any
      };
      console.log(qRes);
      let questionResponses = await responseController.getResponseByQuestion(question.id);
      for (const response of questionResponses){
        let rRes = {
          id: response.id,
          label: response.label,
          correct: response.correct
        };
        console.log(rRes);
        qRes.responses.push(rRes);
      }
      result.questions.push(qRes);
      console.log('Q RES : '+qRes);
    }
    res.type('application/json')
      .status(200)
      .send(result);
  }
  else{
    console.log('IN ERROR');
    res.sendStatus(404).json('Probleme, Candidate not found');
    res.end();
  }
});






qcmRouter.get('/:formation/:origin/mcq', async (req: Request, res: Response) => {
  let mcq = await mcqController.getFavoriteMcqByFormationAndOrigin(req.params.formation, req.params.origin);
  if(mcq!=null){
    let result = {
      id: mcq.id,
      title: mcq.title,
      questions:[] as any
    };
    let mcqquestions = await questionController.getQuestionByMcqId(mcq.id);
    for (const question of mcqquestions){
      console.log('each QUESTION : '+question);
      let qRes = {
        id: question.id,
        title: question.title,
        responses: [] as any
      };
      console.log(qRes);
      let questionresponses = await responseController.getResponseByQuestion(question.id);
      for (const response of questionresponses){
        console.log('each RESPONSE : '+response);
        let rRes = {
          id: response.id,
          label: response.label
        };
        console.log(rRes);
        console.log();
        qRes.responses.push(rRes);
      }
      result.questions.push(qRes);
    }
    res.type('application/json')
      .status(200)
      .send(result);
  }
  else{
    res.sendStatus(404).json('Probleme, Mcq not found');
    res.end();
  }
});







export = qcmRouter;
