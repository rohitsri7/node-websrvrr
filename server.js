const express= require('express');
const hbs= require('hbs');
const fs= require('fs');

var app= express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

app.use(express.static(__dirname+'/public'));

app.use((req, res, next)=>{
  var now= new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
      console.log("unable to append");
    }
  });
  next();
});

// app.use((req,res,next)=>{
//   res.render("maintenance.hbs",{
//     pageTitle: 'site down',
//     message: 'site closed for maintenance'
//   })
// });

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});

app.get('/',(req, res)=>{
  //res.send('hello express');
    res.render("welcome.hbs",{
      pageTitle: 'welcome page',
      message: "welcome dear user"
    })
});



app.get('/about',(req,res)=>{
  res.render("about.hbs",{
    pageTitle: 'About Page'
  });
});

app.get('/bad',(req, res)=>{
  //res.send('hello express');
    res.send({
      errorMessage: "unable to fetch data"
    });
});

app.listen(3000,()=>{
  console.log("server is up");
});
