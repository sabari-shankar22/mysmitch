# mysmitch
Demo Code for Smitch

TO RUN - 
GO to the project's root folder and run - docker compose up -build

APIs:

User -

api/users/signup

api/login

Devices-

GET    -  api/devices/ - Get list of devices for a user Account

POST   -  api/devices/ - Create a new Device for a user Account

PUT    -  api/devices/:id - Updates a device for a user's account on deviceID

DELETE -  api/devices/:id - Removes a device for a user's account on deviceID

POST   -  api/devices/share/:shareToUserEmail/:deviceID - Share a device to another user.
