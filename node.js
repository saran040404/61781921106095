const { default: axios } = require("axios");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

const message = "Invalid number";
const data = {
    "companyName": "Sona College Of Technology",
    "clientID": "60046d63-5c41-4280-8fd4-56b8d73240ec",
    "clientSecret": "uPACHFsccIsOnAAp",
    "ownerName": "Saran V",
    "ownerEmail": "saran.21it@sonatech.ac.in",
    "rollNo": "61781921106095"
};

var token = {
    "token_type": "Bearer",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3NTAyNzMwLCJpYXQiOjE3MTc1MDI0MzAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjYwMDQ2ZDYzLTVjNDEtNDI4MC04ZmQ0LTU2YjhkNzMyNDBlYyIsInN1YiI6ImtlZXJ0aGlrdW1hci4yMWl0QHNvbmF0ZWNoLmFjLmluIn0sImNvbXBhbnlOYW1lIjoiU29uYSBDb2xsZWdlIE9mIFRlY2hub2xvZ3kiLCJjbGllbnRJRCI6IjYwMDQ2ZDYzLTVjNDEtNDI4MC04ZmQ0LTU2YjhkNzMyNDBlYyIsImNsaWVudFNlY3JldCI6InVQQUNIRnNjY0lzT25BQXAiLCJvd25lck5hbWUiOiJLZWVydGhpIGt1bWFyIFMiLCJvd25lckVtYWlsIjoia2VlcnRoaWt1bWFyLjIxaXRAc29uYXRlY2guYWMuaW4iLCJyb2xsTm8iOiI2MTc4MTkyMTEwNjA1NiJ9.THpujY8nDbwT2VacuEt1pT_k3uJ96eQy2TrZ7fYQ1Nc",
    "expires_in": 1717502730
};

app.get("/numbers/:num_id", async (req, res) => {
    const authResponse = await axios.post("http://20.244.56.144/test/auth", data);
    token = authResponse.data;
    console.log(token);

    const num_id = req.params.num_id;
    let url;

    switch (num_id) {
        case "p":
            url = "http://20.244.56.144/test/primes";
            break;
        case "f":
            url = "http://20.244.56.144/test/fibo";
            break;
        case "e":
            url = "http://20.244.56.144/test/even";
            break;
        case "r":
            url = "http://20.244.56.144/test/rand";
            break;
        default:
            return res.status(404).json(message);
    }

    try {
        const response = await axios.get(url, {
            headers: {
                "Authorization": `${token.token_type} ${token.access_token}`
            },
            timeout: 500
        });
        console.log(response);
        return res.send(response.data);
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch data from the test server" });
    }
});

app.listen(6000, () => {
    console.log('Server is running on http://localhost:6000');
});
