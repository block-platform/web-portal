# web-portal
Web portal for the Distributed and Decentralized IoT Platform

## API Contract With Manager Node

- Note: All requests will contain JWT in the Bearer token header

- Register user

`[POST] /users`

Request body:
```json
{
    "email": "<email>",
    "password": "<password>"
}
```

Response:

`200 OK` for successful registration
Response body:
```json
{
    "token": "<jwt>"
}
```

`400 Bad Request` for failed registration

- Sign in user

`[PUT] /users/signin`

Request body:
```json
{
    "email": "<email>",
    "password": "<password>"
}
```

Response:

`200 OK` for successful sign in
Response body:
```json
{
    "token": "<jwt>"
}
```

`401 Unauthorized` for failed sign in

- Register IoT device

`[POST] /devices`

Request body:
```json
{
    "id": "<id>",
    "name": "<name>",
    "region": "<region>"
}
```

Response:

`200 OK` for successful registration

`400 Bad Request` for failed registration

- Delete IoT device

`[DELETE] /devices/<id>`

Response:

`200 OK` for successful deletion

`400 Bad Request` for failed deletion

- Create access policy

`[POST] /policies`

Request body:
```json
{
    "device_id": "<device_id>",
    "accessing_device_id": "<accessing_device_id>"
}
```

Response:

`200 OK` for successful creation

`400 Bad Request` for failed creation

- Delete access policy

`[DELETE] /policies/device/<device-id>/accessing-device/<accessor-id>`

Response:

`200 OK` for successful deletion

`400 Bad Request` for failed deletion

- Register client

`[POST] /clients`
```json
{
    "email": "<email>",
    "password": "<password>"
}
```

Response:

`200 OK` for successful registration

`400 Bad Request` for failed registration

- Get list of devices

`[GET] /devices`

Response:
    
`200 OK` for successful retrieval
Response body:
```json
{
    "devices": [
        {
            "id": "<id>",
            "name": "<name>",
            "region": "<region>",
            "ipfs": "<ipfs_hash>",
            "updated_at": "<timestamp>"
        },
        ...
    ]
}
```

`400 Bad Request` for failed retrieval

- Get list of devices

`[GET] /policies`

Response:
    
`200 OK` for successful retrieval
Response body:
```json
{
    "policies": [
        {
            "id": "<id>",
            "name": "<name>",
            "authorized_devices": [
                "<device_id>",
            ]
        },
        ...
    ]
}
```

`400 Bad Request` for failed retrieval
