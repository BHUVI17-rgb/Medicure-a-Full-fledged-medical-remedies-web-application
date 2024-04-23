import 'dotenv/config'
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import { info } from "console";
import passport from "passport"
import passport_local from "passport-local"
import session from "express-session"
import connect_pg from "connect-pg-simple"


const app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: true }
}))

app.use(passport.initialize())
app.use(passport.session())

const port = 3002;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "world",
    password: "Bhuvanesh@172629",
    port: 5432,
  });
  db.connect();

  let id;
  let disease;
  let value;

  // function sayHello() {
  //   alert("Authentication successfull");
  //   }

  app.post('/search', async(req,res) => {
    
    console.log(req.body["disease"]);
    try {
        const query = await db.query("SELECT * FROM testdb WHERE LOWER(title) LIKE '%' || $1 || '%';",
        [req.body["disease"].toLowerCase()]);
        console.log(query.rows)
        const buff = query.rows;
        value=req.body["disease"];
        res.render("info.ejs",{data:buff,val:value});
      } catch (e) {
        console.log(e.message)
      }
  
  })

 

  app.get('/', async(req,res) => {
    try {
      const query = await db.query("SELECT * FROM testdb");
      console.log(query.rows)
      const buff = query.rows;
      const b64 = buff[0].image.toString('base64');
      const src = "data:image/png;base64,"+b64;
      res.setHeader('Content-type', 'image/png');
    value=req.body["disease"];
      res.render("info.ejs",{data:buff,val:value,data1:1});
    } catch (e) {
      console.log(e.message)
    }
  
  })


  app.get("/redirect/:id", async (req, res) => {
    const id = parseInt(req.params.id.slice(1));
    console.log(id);
    const query = await db.query("SELECT * FROM information where id = $1",[id]);
    console.log(query.rows)
    const buff = query.rows;
    res.render("information.ejs",{value:buff});
  });

  app.get("/logins", async (req,res)=>{
    res.render("login.ejs",{data1:1})
  })

  app.get("/registers", async (req,res)=>{
    res.render("login.ejs",{data4:3})
  })

  app.post("/login", async (req,res)=>{
    try {
      const query = await db.query("SELECT * FROM user_cred where email = $1",[req.body.email]);
      console.log(query.rows)
      const buff = query.rows;
      if(req.body.email == buff[0].email && md5(req.body.pass) == buff[0].pass){
        // setTimeout(function() {
        //   sayHello();
        //   }, 3000)
        //   }
        res.redirect("/");}
      }catch (e) {
      console.log(e.message)
      res.render("login.ejs",{data1:1,datum:"Something wrong in your email or password"})
    }
  })

  app.get("/create1",(req,res)=>{
    res.render("login.ejs",{data3:1});
  })

  app.get("/create123",(req,res)=>{
    res.render("index.ejs");
  })
  app.get("/searching",(req,res)=>{
    res.render("search.ejs");
  })

  // app.get("/create11",(req,res)=>{
  //   res.render("info.ejs",{data1:1});
  // })


  app.post("/create3", async (req,res)=>{
    if(req.body.pass1 != req.body.pass2){
      res.render("login.ejs",{data3:process.env.data3,datum:process.env.datum})
    }
    else{
    try {
      await db.query("insert into user_cred values($1,$2)",[req.body.email,md5(req.body.pass1)]);
      res.render("login.ejs",{data1:1});
    } catch (e) {
      console.log(e.message)
      res.render("login.ejs",{data3:1,datum:"Something wrong in your email or password"})
    }
  }
  })

  app.post("/problem", async (req,res)=>{
    try {
      await db.query("insert into registers values($1,$2)",[req.body.pass1,req.body.email]);
      res.render("search.ejs");
    } catch (e) {
      console.log(e.message)
      res.render("login.ejs",{data3:1,datum:"Something wrong in your email or password"})
    }
  })

  app.post("/problems",async (req,res)=>{
    if(req.body.pass1=="Bhuvanesh@172629"){
      res.redirect("/tabless");
    }
    else{
      res.redirect("/tabless");
    }
  })
  app.get("/tables",(req,res)=>{
    res.render("tables.ejs",{data5:1});
  })

  app.get("/tabless",async (req,res)=>{
    try {
      const query = await db.query("SELECT * FROM registers");
      const buff = query.rows;
      res.render("tables.ejs",{value:buff,data6:1});
      }
      catch (e) {
      console.log(e.message)
      res.render("login.ejs",{data1:1,datum:"Something wrong in your email or password"})
    }
  })


console.log(process.env.datum)
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
  

  