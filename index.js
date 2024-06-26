import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = process.env.PORT || 4000;
const API_URL = "https://api.fungenerators.com";
const APIKey = "alGyauyji9UlMIChi13f9geF";


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/get-fact", async (req, res) => {
    try {
        const response = await axios.get(API_URL + "/fact/random", {
            params: {
              api_key: APIKey,
            }
        });
        const result = response.data.contents.fact;
        console.log(result);
        res.render("index.ejs",
            {
                fact: result,
            }
        )
        } catch(error){
        console.log(error.response.data);
        };
});

app.post("/submit-fact", async (req, res) => {
    const newFact = req.body.text1;
    console.log(newFact);
    try {
    const response = await axios.put(
    `${API_URL}/fact?api_key=${APIKey}`,
                {
                 fact: newFact,
                 category: "Food"
               },
                {
                    headers: {
                            'X-FunGenerators-Api-Secret': APIKey,
                            'Content-Type': 'application/json'
                            }
                }
    );
    
    console.log("API Response:", response.data.contents.id);
        res.render("index.ejs", {
            factId: response.data.contents.id,
                });
    } catch(error){
    console.log(error);
    };
});


app.listen(port, () => {
    console.log(`Server running on port: ${port}.`);
});
