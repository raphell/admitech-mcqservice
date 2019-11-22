import Response from '../models/response';


async function createResponse(response: Response): Promise<Response> {
  const newResponse = {
    label: response.label,
    correct: response.correct,
    question_id: response.question_id
  };
  return Response.create(newResponse);
}


function getResponseByLabel(question_id: number, label: string): Promise<Response> {
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


function getResponseById(id: number): Promise<Response> {
  return Response.findOne({
    where: {
      id: id
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


function deleteResponse(id: number): Promise<number> {
  console.log('DEL RESP : '+id);
  return Response.destroy({
    where: {
      id: id,
    }
  });
}


export = { createResponse, deleteResponse, getResponseById, getResponseByLabel, getResponseByQuestion, getCorrectResponseByQuestion };
