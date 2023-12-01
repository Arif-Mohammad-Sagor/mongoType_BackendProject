// steps for setup project

1. install express,mongodb,cors, dotenv,typescript-d
2. create a tsConfig file and config this
3. create a .env file and set port and database url
4. create a folder inside src named it config and inside config create a file named index.ts and config .env file with process.pwd() and export port and db_url as an object
5. create a server.ts file inside src and connect to mongodb using mongoose main function
6. google how to setup eslint with typescript in vs code
7. In this step you will set up Prettier like es lint
8. Aftering everything setting up, In this stage you will create moduels folder under src folder and under moduels you will create a student folder
9. You will have to create first interface.student.ts file under student folder where you will create interfaces or types for your data and export them for further use
10. when your interface is completed you will have to create a schema and finally a model using your schema
11. In this stage you will have to create a student.validator.ts where you will validate your data using (ZOD VALIDATOR) npm package.
12. After your model validation is completed you will have to create a student.controller.ts file where you will handle (req,res) from client side and inside this controller you will call your student.services.ts file's functions which will handle the query to databases such as find,update ,insert and delete.Before calling the services function you have first send data to zod for validation and then validated data will be sent to services funtion.
13) In this stage to completed the query functionality of student.services.ts file's you have to create those function and export so that controller page can use it.



**PhUniversity Part-Two
1) insteadd of declaring req,res,next types directly we can use RequestHanlder from express while writing controllers.

2) we can use a Higher Order Function to avoid trycatch{} block repeatation.This higher order function resolve a promise and return another function.Obviously, that is why it is called a higher order function.If it faces any error it will be cauth in the .catch section.To implement this you must implement a global error hanlder first.