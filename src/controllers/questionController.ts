import Question from '../models/question';


async function createQuestion(question: Question): Promise<Question> {
  const newQuestion = {
    title: question.title,
    mcq_id: question.mcq_id,
  };
  return Question.create(newQuestion);
}


function getQuestionByMcqId(id: number): Promise<Question[]> {
  return Question.findAll({
    where: {
      mcq_id: id
    }
  });
}


function getQuestionById(id: number): Promise<Question> {
  return Question.findOne({
    where: {
      id: id
    }
  });
}


function deleteQuestion(id: number): Promise<number> {
  return Question.destroy({
    where: {
      id: id
    }
  });
}


export = { createQuestion, getQuestionByMcqId, getQuestionById, deleteQuestion };
