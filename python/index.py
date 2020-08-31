import json
import time
from dotenv import load_dotenv
load_dotenv()
import benchmark
from mongo_connection import mongo_conn
from redis_connection import redis_conn

for key in redis_conn.scan_iter('*'): redis_conn.delete(key)

def get_language(extension):
  try:
    return benchmark.Languages[extension]
  except:
    raise

def get_uid(key):
  return str(key).replace("todo", "").replace("'", '')

def write_program2file(programFile, program):
  f = open(programFile, "w")
  f.write(program)
  f.close()

def get_req_input(key):
  data = json.loads(redis_conn.get(key))
  program, extension, problem_id = data['program'], data['extension'], data['problem']
  return program, extension, problem_id

def delete_todo_key(key):
  redis_conn.delete(key)

def set_done_key(key, res):
  uid = get_uid(key)
  print(redis_conn.scan_iter("done*"), flush=True)
  redis_conn.set(f'done{uid}', json.dumps(res))


def test_program():
  while True:
    for key in redis_conn.scan_iter("todo*"):
      try:
        print('OK', flush=True)
        program, extension, problem_id = get_req_input(key)
        delete_todo_key(key)
        language = get_language(extension)
        program_filename = f'program2test.{extension}'
        write_program2file(program_filename, program)
        res = benchmark.test(mongo_conn, problem_id, language, program_filename)
        set_done_key(key, res)
        print('finished benchmark', flush=True)
      except:
        res = {"error": True}
        set_done_key(key, res)
    time.sleep(2)

test_program()
