# nodejs-appdynamics-launchdarkly
Node Express Framework with Integration of LaunchDarkly and AppDynamics

Checkout the application and fill all the XXXX values in the index.js. It will need AppDynamics and LaunchDarkly details. 
Once both are added, save the files and run the below command to build and start the application.

````
docker-compose up
````

If you want shutdown the application , run the below command. 

````
docker-compose down
````

Put some load on the application

````
curl http://localhost:3000
````
The UI shows all the flags and values of the flag configured in the LaunchDarkly application.

You can navigate to the AppDynamics controller and it will show the Application is registered.(Default Application is Mithun_Node_Application.js) You can change it by modifying the index.js file. 
