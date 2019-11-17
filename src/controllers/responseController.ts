import Response from '../models/response';


async function createResponse(response: Response): Promise<Response> {
  console.log('BEGIN create new Response');
  const newResponse = {
    label: response.label,
    correct: response.correct,
    question_id: response.question_id
  };
  console.log('newResponse initialised');
  console.log(newResponse);
  return Response.create(newResponse);
}


function getResponseByLabel(question_id: number, label: string): Promise<Response> {
  console.log("IN GET response BY label");
  return Response.findOne({
    where: {
      label: label,
      question_id: question_id,
    }
  });
}


function getResponseByQuestion(id: number): Promise<Response[]> {
  return Response.findAll({
    where: {
      question_id: id
    }
  });
}

function getCorrectResponseByQuestion(id: number): Promise<Response[]> {
  return Response.findAll({
    where: {
      question_id: id,
      correct: true
    }
  });
}


export = { createResponse, getResponseByLabel, getResponseByQuestion, getCorrectResponseByQuestion };
