from functools import reduce
import subprocess
import json
import resource
from functools import reduce
from enum import Enum

class Languages(Enum):
    py = 'python'
    java = 'java'
    c = 'c'
    cpp = 'cpp'

def read_from_file(fileName):
  f = open(fileName, "r")
  return f.read()


def test_c(program, input_filename, output_filename, max_memory):
  subprocess.call(["gcc", program])
  return subprocess.Popen(["./a.out"], preexec_fn=limit_virtual_memory(max_memory), stdin=open(input_filename, "r"), stdout=open(output_filename, 'w'))

def test_cpp(program, input_filename, output_filename, max_memory):
  subprocess.call(["g++", program])
  return subprocess.Popen(["./a.out"], preexec_fn=limit_virtual_memory(max_memory), stdin=open(input_filename, "r"), stdout=open(output_filename, 'w'))

def test_py(program, input_filename, output_filename, max_memory):
  return subprocess.Popen(["python", program], preexec_fn=limit_virtual_memory(max_memory), stdin=open(input_filename, "r"), stdout=open(output_filename, 'w'))

def test_java(program, input_filename, output_filename, max_memory):
  return subprocess.Popen(["java", program], preexec_fn=limit_virtual_memory(max_memory), stdin=open(input_filename, "r"), stdout=open(output_filename, 'w'))


execution_function = {
  Languages.c: test_c,
  Languages.cpp: test_cpp,
  Languages.py: test_py,
  Languages.java: test_java,
}

def limit_virtual_memory(MAX_VIRTUAL_MEMORY):
    resource.setrlimit(resource.RLIMIT_AS, (MAX_VIRTUAL_MEMORY, resource.RLIM_INFINITY))

def get_best_time(usage_end, usage_start, cpu_time):
  new_time = usage_end - usage_start
  if not cpu_time:
    return usage_end - usage_start
  return new_time if cpu_time > new_time else cpu_time

def execute_program(f, program_name, input_filename, output_filename, max_memory):
  try:
    process = f(program_name, input_filename, output_filename, max_memory)
    usage_start = resource.getrusage(resource.RUSAGE_CHILDREN).ru_utime
    process.communicate(timeout=60)
    usage_end = resource.getrusage(resource.RUSAGE_CHILDREN).ru_utime
    return usage_start, usage_end
  except subprocess.TimeoutExpired as err:
    process.kill()
    return err
  except subprocess.MemoryError as err:
    process.kill()
    return err

def get_st_deviation(all_times, avg_time, times_to_execute):
  return (reduce(lambda x, y: (x - avg_time) ** 2 + y, all_times) / times_to_execute) ** 0.5

def get_avg_time(all_times, times_to_execute):
  return sum(all_times) / times_to_execute


def execute(input_filename, output_filename, language, program_name, max_memory):
  times_to_execute, best_time, all_times = 5, None, []
  f = execution_function[language]

  for i in range(times_to_execute):
    usage_start, usage_end = execute_program(f, program_name, input_filename, output_filename, max_memory)
    all_times.append(usage_end - usage_start)
    best_time = get_best_time(usage_end, usage_start, best_time)
  
  avg_time = get_avg_time(all_times, times_to_execute)
  st_deviation = get_st_deviation(all_times, avg_time, times_to_execute)
  return {'best_time': best_time, 'avg_time': avg_time, 'st_deviation': st_deviation}


def write_test_input2file(input_filename, input):
    f_input = open(input_filename, "w")
    f_input.write(str(input))
    f_input.close()

def compare_results(test_output, program_output_filename):
  expected_result = str(test_output)
  actual_result = read_from_file(program_output_filename).rstrip()
  return expected_result == actual_result

def get_times(cursor, program_output_filename, language, program_name, max_memory):
  res = []
  correct_results = 0
  for test in list(cursor):
    test_input, test_output = test["input"], test["output"]
    input_filename = "test_input"
    write_test_input2file(input_filename, test_input)
    times = execute(input_filename, program_output_filename, language, program_name, max_memory)

    # expected_result = str(test_output)
    # actual_result = read_from_file(program_output_filename).rstrip()
    # if (actual_result == expected_result): correct_results += 1

    if compare_results(test_output, program_output_filename):
      correct_results += 1

    res.append(times)
  percentage = correct_results / len(res) * 100
  return res, percentage
  
def average_times(times):
  init_value = {'best_time': 0, 'avg_time': 0, 'st_deviation': 0}
  number_tests = len(times)
  result = reduce(lambda x, y: {'best_time': x['best_time'] + y['best_time'], 'avg_time': x['avg_time'] + y['avg_time'], 'st_deviation': x['st_deviation'] + y['st_deviation']}, times, init_value)
  for key in result.keys(): 
    result[key] /= number_tests
  return result

  
def test(db, problem_id, language, program_name):
  try:
    program_output_filename = "program_output"
    cursor = db.get_tests({"problem": problem_id})
    max_memory = 100 * 1024 * 1024
    times, percentage = get_times(cursor, program_output_filename, language, program_name, max_memory)
    result = average_times(times)
    result['percentage'] = percentage
    return result
  except:
    raise
