const con = require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// Middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

/**
 * CREATE A MOVIE REVIEW
 */
app.post('/api/insert', function(req, res){

    const sql = "INSERT INTO movie_review(movie_name, movie_review) VALUES(?, ?)"
    const data = [
        req.body.movieName,
        req.body.movieReview
    ]
    con.query(sql, data, function(err, results){

          if(err) throw err;
          res.send({
              message: "Record inserted!",
              data: results
          })
      }
    );
})

/**
 * READ ALL MOVIE REVIEW
 */
app.get('/api/read', (req, res)=>{

    const sql = "SELECT * FROM movie_review";
    con.query(sql,(err, results)=>{
        if(err) throw err;
        if(results.length == 0) {
            res.send({message: "No records found!", data: results})
        }
        else {
            res.send({
            message: "Records fetched!",
            data: results,
            });
        }
    })
})

/**
 * DELETE A MOVIEW REVIEW BY MOVIE NAME
 */
app.delete('/api/delete/:movieName', (req, res)=>{
    const sql = "DELETE FROM movie_review WHERE movie_name = ?";
    const data = [req.params.movieName]
    con.query(sql, data, (err, results)=>{
        if(err) {
            throw err;
        }
        if(results.affectedRows == 0) {
            res.send({message:"Record not found!", data: results})
        }
        else {
            res.send({
            message: "Review deleted!",
            data: results,
            });
        }
    })
});

/**
 * UPDATE A MOVIE REVIEW BY MOVIE NAME
 */
app.put("/api/update/", (req, res) => {
  const sql = "UPDATE `movie_db`.`movie_review` SET `movie_review` = ? WHERE (`movie_name` = ?)";
  const data = [req.body.movieReview, req.body.movieName];
  con.query(sql, data, (err, results) => {
    if (err) {
      throw err;
    }
    if (results.affectedRows == 0) {
      res.send({ message: "Record not found!", data: results });
    } else {
      res.send({
        message: "Review updated!",
        data: results,
      });
    }
  });
});

app.listen(process.env.PORT, function(err){
    console.log("App is listening on port " + process.env.PORT);
    con.connect(function(err){
        if(err) {
            throw err;
        }
        console.log('Database connected!')
    })
})