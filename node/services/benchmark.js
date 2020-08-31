const Problem = require('../models/problem');
const Test = require('../models/test');
const User = require('../models/user');

async function create_problem(title, input_cond, output_cond, time_limit, description) {
  const problem = new Problem({ title, input_cond, output_cond, time_limit, description });
  return await problem.save();
}

async function add_test(problem, input, output) {
  const problemId = (await Problem.findOne({ title: problem }, { id: 1 }))._id;
  const test = new Test({ problem: problemId, input, output });
  console.log(problemId)
  return await test.save();
}

async function submit_result(problem_id, user, result) {
  result.problem_id = problem_id;
  await User.updateOne({ _id: user._id }, { $pull: { results: { problem_id: problem_id } } });
  await User.update({ _id: user._id }, { $push: { results: result } });
}

function addStatusToProblem(problems, id, percentage) {
  return problems.map(problem => {
    return problem._id == id ? { ...problem.toObject(), percentage } : problem;
  });
}

async function addStatus2Problems(problems, user) {
  const solvedProblems = await (await User.findById(user._id, { _id: 0, results: 1 })).results;
  solvedProblems.forEach(solvedProblem => {
    problems = addStatusToProblem(problems, solvedProblem.problem_id, solvedProblem.percentage);
  })
  return problems;
}

async function search_problems(query) {
  return await Problem
    .aggregate([{
      $match: buildSearchFilter(query),
    }])
    .limit(2);
}

function buildSearchFilter(query) {
  const filter = {
    $or: [
      { title: { $regex: `${query}`, $options: 'i' } },
      { description: { $regex: `${query}`, $options: 'i' } },
    ],
  };

  return filter;
}


module.exports = { create_problem, add_test, submit_result, addStatus2Problems, search_problems };
