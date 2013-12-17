node-mongodb-rest-template
==========================
A flexible rest service built based on node + mongodb

#### 1. Please setup Mongodb & Node first

#### 2. Install node modules:
- npm install   
- node app.js

#### 3. You can extend the service channel

- localhost:3000/[resource]/create

- localhost:3000/[resource]/list

- localhost:3000/[resource]/read/id

- localhost:3000/[resource]/update/id

- localhost:3000/[resource]/delete/id


#### 4. Test request by curl

In this case, the resource is set person.

- Create Person:  
curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "Zhang San", "year": "2009"}' http://localhost:3000/person/create

- List Person:  
curl -i -X GET http://localhost:3000/person/list

- Update Person:  
curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "Li Si", "year": "2012"}' http://localhost:3000/person/update/52b061e43cb245990e9478b8

- Destroy Person  
curl -i -X GET http://localhost:3000/person/delete/52b061e43cb245990e9478b8

- Detail Person  
curl -i -X GET http://localhost:3000/person/read/52b061ee3cb245990e9478b9

