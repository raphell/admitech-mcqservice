import Question from '../models/question';


async function createQuestion(question: Question): Promise<Question> {
  console.log('BEGIN create new Question');
  const newQuestion = {
    title: question.title,
    mcq_id: question.mcq_id,
  };
  console.log('newquestion initialized');
  console.log(newQuestion);
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

export = { createQuestion, getQuestionByMcqId, getQuestionById };
