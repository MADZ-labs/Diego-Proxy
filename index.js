const express = require('express');
const morgan = require('morgan');
const path = require('path');
const request = require('request');
const app = express();
const port = process.env.PORT || 3000;
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});

app.get('/project/:id', (req, res) => {
  let options = {
    url: `http://localhost:3001/project/${req.params.id}`,
  }

  request(options, (err, response, body) => {
    if(err) {
      throw err;
    } else {
      res.send(body);
    }
  });
});

app.get('/project/:projectId/section/:sectionName', (req, res) => {
  let options = {
    url: `http://localhost:3002/project/${req.params.projectId}/section/${req.params.sectionName}`,
  }
  
  request(options, (err, response, body) => {
    if(err) {
      throw err;
    } else {
      res.send(body);
    }
  });

  app.get('/projects/:id', (req, res) => {
    let options = {
      url: 'http://localhost:3004/projects/2',
    }
    
    request(options, (err, response, body) => {
      if(err) {
        throw err;
      } else {
        res.send(body);
      }
    });
  });
  
  app.get('/:project/:projectId/section/comments', (req, res) => {
    let options = {
      url: `http://localhost:3003/${req.params.project}/${req.params.projectId}/section/comments`,
    }
        // console.log(req);
    
    request(options, (err, response, body) => {
      if(err) {
        console.log(err);
      }
      // } else {
        console.log('hits');
        res.send(JSON.parse(body));
      // }
    });
  });
});