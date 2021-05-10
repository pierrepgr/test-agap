### Context

Project provides software for listing, creating, updating and deleting products.

### Features

- Product creation
- Product update
- Delete product
- Product list

### Run project in the local environment

To run the project on your local machine, you need to have some tools installed:

- [Node](https://nodejs.org/en/download/)
- [Java 11](https://www.oracle.com/pt/java/technologies/javase-jdk11-downloads.html)
- [Angular CLI](https://angular.io/cli)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/downloads)
- [Maven](https://maven.apache.org/download.cgi)

#### Run the commands below:

1. Clone the project
`$ git clone https://github.com/pierrepgr/test-agap.git`
2. Navigate to the back-end directory in the project folder
`$ cd test-agap/backend/` and run `$ mvn clean install` and `$ mvn clean package`
3. Navigate to the front-end directory in the project folder
`$ cd test-agap/frontend/` and run `$ npm install`
4. To run the tests
##### Back-end
In the backend directory run the command `$ mvn verify`
##### Front-end
In the frontend directory run the command `$ ng test`
5. Build projects
In the root folder of the **test-agap** project run the command `$ docker-compose build`
6. Run projects
In the root folder of the **test-agap** project run the command `$ docker-compose up`

##### The application will be available at the link [http://localhost:4200](http://localhost:4200).

##### Login details
**email: ** administrator@agap2it.com
**password: ** 12345

### Available APIs

##### - Authentication API

To authenticate to the API via REST, it is necessary to obtain a valid access token:

**Method:** POST
**URL:** http://localhost:8080/oauth/token
**Header:** Content-type: multipart/form-data
**multipart/form-data:** username=administrator@agap2it.com&password=12345&grant_type=password

**Return: (Example)**
**Status:** 200 OK
<pre>
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsX25hbWUiOiJBZG1pbmlzdHJhdG9yIiwidXNlcl9pZCI6MSwidXNlcl9uYW1lIjoiYWRtaW5pc3RyYXRvckBhZ2FwMml0LmNvbSIsInNjb3BlIjpbIldSSVRFIiwiUkVBRCIsIkRFTEVURSJdLCJleHAiOjE2MjA2MDQwODYsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwianRpIjoiZDNkMWY0NzYtZmZiMy00MGRiLThhZmMtZTlmY2FmYzY1NTkxIiwiY2xpZW50X2lkIjoiYWdhcDJpdC13ZWIifQ.QFrGXq7L_TgK_KiVG2gm-oOOxD9Ci3az0M6TNsmj6JTlcjM9jQUkws3iLmJPMoRmtXWN-mZv4XT0uV4XMNRVJHneHUHsrdZSrf6_vJ5mn9tHPdNcim8E3ZfpUUMwNlMOOyJP3N64fEPwaH94UcsitGHGj_A7FMwlY-velY55kqlTssmvk8YZvhMDuHQoJF7p2Z6pRNjsTtS1WrfmWhefnkIpNC8VGYgYWKGx6vaWnhKxt-wU4LAz1He3FhiU-mcISbXoIME1Mb3lyPjKEDqxxrrf7X6oFQ07QZmA6LXVtDspbXQfihoPwUPhyFis4imE3dXU1HwJ6Vo1Gi8DGpbDkw",
  "token_type": "bearer",
  "expires_in": 1799,
  "scope": "WRITE READ DELETE",
  "jti": "d3d1f476-ffb3-40db-8afc-e9fcafc65591"
}
</pre>

##### - Get new access token with refresh token

**Method:** POST
**URL:** http://localhost:8080/oauth/token
**Header:** Content-type: multipart/form-data
**multipart/form-data:** grant_type=refresh_token

**Return: (Example)**
**Status:** 200 OK
<pre>
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsX25hbWUiOiJBZG1pbmlzdHJhdG9yIiwidXNlcl9pZCI6MSwidXNlcl9uYW1lIjoiYWRtaW5pc3RyYXRvckBhZ2FwMml0LmNvbSIsInNjb3BlIjpbIldSSVRFIiwiUkVBRCIsIkRFTEVURSJdLCJleHAiOjE2MjA2MDQwODYsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwianRpIjoiZDNkMWY0NzYtZmZiMy00MGRiLThhZmMtZTlmY2FmYzY1NTkxIiwiY2xpZW50X2lkIjoiYWdhcDJpdC13ZWIifQ.QFrGXq7L_TgK_KiVG2gm-oOOxD9Ci3az0M6TNsmj6JTlcjM9jQUkws3iLmJPMoRmtXWN-mZv4XT0uV4XMNRVJHneHUHsrdZSrf6_vJ5mn9tHPdNcim8E3ZfpUUMwNlMOOyJP3N64fEPwaH94UcsitGHGj_A7FMwlY-velY55kqlTssmvk8YZvhMDuHQoJF7p2Z6pRNjsTtS1WrfmWhefnkIpNC8VGYgYWKGx6vaWnhKxt-wU4LAz1He3FhiU-mcISbXoIME1Mb3lyPjKEDqxxrrf7X6oFQ07QZmA6LXVtDspbXQfihoPwUPhyFis4imE3dXU1HwJ6Vo1Gi8DGpbDkw",
  "token_type": "bearer",
  "expires_in": 1799,
  "scope": "WRITE READ DELETE",
  "jti": "d3d1f476-ffb3-40db-8afc-e9fcafc65591"
}
</pre>


##### - Product creation

**Method:** POST
**URL:** http://localhost:8080/products
**Headers:** 
			Content-type: application/json
			Authorization: Bearer {access_token_value}
**body:**

<pre>
{
	"sku": "AAA12213",
	"name": "Jacket",
	"price": 50
}
</pre>

**Return: (Example)**
**Status:** 200 OK
<pre>
{
  "id": 1,
  "creationDateTime": "2021-05-07T16:17:12.868036",
  "sku": "AAA12213",
  "name": "Jacket",
  "price": 50
}
</pre>


##### - Product update

**Method:** PUT
**URL:** http://localhost:8080/products/{productId}
**Headers:** 
			Content-type: application/json
			Authorization: Bearer {access_token_value}
**body:**

<pre>
{
	"sku": "AAA12213",
	"name": "Blue Jacket",
	"price": 50
}
</pre>

**Return: (Example)**
**Status:** 200 OK
<pre>
{
  "id": 1,
  "creationDateTime": "2021-05-07T16:18:12.868036",
  "sku": "AAA12213",
  "name": "BlueJacket",
  "price": 50
}
</pre>

##### - Delete product

**Method:** DELETE
**URL:** http://localhost:8080/products/{productId}
**Headers:**
			Content-type: application/json
			Authorization: Bearer {access_token_value}

**Return: (Example)**
**Status:** 201 No Content

##### - Product list

**Method:** GET
**URL:** http://localhost:8080/products
**Headers:**
			Content-type: application/json
			Authorization: Bearer {access_token_value}

**Return: (Example)**
**Status:** 200 OK

<pre>
[{
  "id": 1,
  "creationDateTime": "2021-05-07T16:19:12.868036",
  "sku": "AAA12213",
  "name": "BlueJacket",
  "price": 50
}]
</pre>

##### - Get product by id

**Method:** GET
**URL:** http://localhost:8080/products/{productId}
**Headers:**
			Content-type: application/json
			Authorization: Bearer {access_token_value}

**Return: (Example)**
**Status:** 200 OK

<pre>
{
  "id": 1,
  "creationDateTime": "2021-05-07T16:20:12.868036",
  "sku": "AAA12213",
  "name": "BlueJacket",
  "price": 50
}
</pre>
