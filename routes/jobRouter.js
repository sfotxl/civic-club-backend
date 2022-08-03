const express = require('express');
const jobRouter = express.Router();

jobRouter
  .route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req, res) => {
    res.end('Will send all the jobs to you');
  })
  .post((req, res) => {
    res.end(
      `Will add the job: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end(`Put opreation not supported on /job`);
  })
  .delete((req, res) => {
    res.end('Deleting all job');
  });

jobRouter
  .route('/:jobId')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req, res) => {
    res.end(`Will send all details for job:${req.params.jobId} to you`);
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /job/${req.params.jobId}`);
  })
  .put((req, res) => {
    res.write(`Updating the job: ${req.params.jobId}\n`);
    res.end(
      `Will update the job: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .delete((req, res) => {
    res.end(`Deleting job: ${req.params.jobId}`);
  });

module.exports = jobRouter;
