const uuid = require('uuid');
const redis_conn = require('../database/redis');
const redis = require('redis');
const Problem = require('../models/problem');
const Test = require('../models/test');
const access_control = require('../server/roles');
const benchmark_service = require('../services/benchmark');


async function test(req, res) {
  const permission = access_control.can(req.user.role).createAny('submission');

  if (!permission.granted) {
    return res.status(401).send({ msg: 'Unauthorized.' });
  }
  const uid = uuid.v1();
  redis_conn.set(`todo${uid}`, JSON.stringify(req.body), redis.print);
  while (true) {
    key_exists = await redis_conn.exists(`done${uid}`)
    if (key_exists) {
      const result = JSON.parse(await redis_conn.get(`done${uid}`))
      redis_conn.del(`done${uid}`)
      if (result.error) {
        return res.status(400).send({ err: 'Invalid input' });
      } else {
        return res.send({ result });
      }
    }
  }
}

async function get_all_problems(req, res) {
  try {
    const { user } = req;
    const permission = access_control.can(req.user.role).readAny('problem');

    if (!permission.granted) {
      return res.status(401).send({ msg: 'Unauthorized.' });
    }
    let problems = await Problem.find({}, {
      title: 1,
      _id: 1,
    });

    problems = await benchmark_service.addStatus2Problems(problems, user);
    return res.send({ problems });
  } catch (error) {
    res.status(error.status).send({ error });
  }
}

async function get_problem(req, res) {
  try {
    const permission = access_control.can(req.user.role).readAny('problem');

    if (!permission.granted) {
      return res.status(401).send({ msg: 'Unauthorized.' });
    }

    const problem_id = req.params.id;
    const problem = await Problem.findById(problem_id);
    res.send({ problem });

  } catch (error) {
    res.status(error.status).send({ error });
  }
}

async function create_problem(req, res) {
  try {
    const permission = access_control.can(req.user.role).createAny('problem');
    const { title, input_cond, output_cond, time_limit, description } = req.body;
    if (!permission.granted) {
      return res.status(401).send({ msg: 'Unauthorized.' });
    }

    await benchmark_service.create_problem(
      title,
      input_cond,
      output_cond,
      time_limit,
      description,
    );

    res.status(201).send({ msg: 'Created' });
  } catch (err) {
    res.status(err.status).send({ err });
  }
}

async function add_test(req, res) {
  try {
    const permission = access_control.can(req.user.role).createAny('test');
    const { problem, input, output } = req.body;
    if (!permission.granted) {
      return res.status(401).send({ msg: 'Unauthorized.' });
    }
    await benchmark_service.add_test(problem, input, output);
    res.status(201).send({ msg: 'Created' });
  } catch (err) {
    res.status(err.status).send({ err });
  }
}

async function submit_result(req, res) {
  const { user } = req;
  const result = req.body;
  const { problemId } = req.params;
  await benchmark_service.submit_result(problemId, user, result)
  res.status(200).send({ msg: 'Successful submited' });
}

async function search_problems(req, res) {
  try {
    const { search } = req.query;
    const problems = await benchmark_service.search_problems(search);
    res.send({ problems });
  } catch (err) {
    console.log(err)
  }
}

module.exports = { test, get_all_problems, get_problem, create_problem, add_test, submit_result, search_problems };
