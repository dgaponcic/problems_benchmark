# Benchmark application

Hackerrank-inspired application for finding challenging programming problems and submit results. 
As random-submitted code is executed for safety every component is contanerized.

### Key things:
1.  a client interface for the user to interact with
2.  a server to process requests
3.  the possibility of executing submitted code
4.  risks minimization after executing random code on the machine
5.  database connection for data storing

### The communication is performed using Redis as a message queue.  The process is as follows:
* The user submits a program
* Node creates an id of the request and adds a message to Redis.
* Python service checks for new data in Redis
* Python sees a new message
* Reads and removes it
* Executes the code
* Writes a new message to redis, with the same id, but with the label resolved and the results after execution
* Node waits for its message to be resolved 
* Takes the result
* Sends to Angular
* User sees the result

### The process of adding new problems and tests (only as supervisor user)
<img src="https://github.com/dgaponcic/problems_benchmark/blob/master/add_problem.gif">

### The process of submitting problems (as standard user).
<img src="https://github.com/dgaponcic/problems_benchmark/blob/master/submit_problem.gif">
