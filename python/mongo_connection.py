from os import getenv
from pymongo import MongoClient

class Mongo_Connection:
  def __init__(self):
    connection = MongoClient(getenv('MONGO_HOST'), int(getenv('MONGO_PORT')), retryWrites = False)
    db = connection["benchmark"]
    db.authenticate(getenv('MONGO_LOGIN'), getenv('MONGO_PASSWORD'))
    self.db = db

  def get_test_data(self, lab_number, test_number):
    test = self.db.tests.find_one({"lab_number": lab_number, "test_number": test_number})
    return test["input"], test["output"]
  
  def get_tests(self, cond):
    cursor = self.db.tests.find(cond)
    return cursor

mongo_conn = Mongo_Connection()
