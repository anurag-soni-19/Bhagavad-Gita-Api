// Import express and axios
import express from "express";
import axios from "axios";
import bodyParser from "body-parser"

// Create an express app and set the port number.
const port = 3000;
const app = express();

// use body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Use the public folder for static files.
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("chap-verse.ejs");
});

const totalChapters = 18;
const totalVerses = [0, 47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 35, 27, 20, 24, 28, 78];

app.post("/your-verse", async (req, res) =>{
    var chapter = req.body.chapter;
    var verse = req.body.verse % totalVerses[chapter];
    const options = {
        method: 'GET',
        url: `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapter}/verses/${verse}/`,
        headers: {
          'x-rapidapi-key': '420e6fd0ecmshda918f89334edebp1610bejsn13b92c94bd48',
          'x-rapidapi-host': 'bhagavad-gita3.p.rapidapi.com'
        }
      };
      
    try {
        const result = await axios.request(options);
        res.render("index.ejs", {
            secret : result.data.translations[0].description,
            user : result.data.text
        });
    } catch (error) {
        console.error(error);
    }
});

// Listen on your predefined port and start the server.
app.listen(port, ()=>{
    console.log(`listening to port ${port}`);
});
