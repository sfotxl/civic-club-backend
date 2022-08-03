const express = require('express');
const scholarshipRouter = express.Router();

scholarshipRouter
  .route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req, res) => {
    res.end('Will send all the scholarships to you');
  })
  .post((req, res) => {
    res.end(
      `Will add the scholarship: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end(`Put operation not supported on /scholarship`);
  })
  .delete((req, res) => {
    res.end('Deleting all scholarship');
  });

scholarshipRouter
  .route('/:scholarshipId')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req, res) => {
    res.end(
      `Will send all details for scholarship:${req.params.scholarshipId} to you`
    );
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /scholarship/${req.params.scholarshipId}`
    );
  })
  .put((req, res) => {
    res.write(`Updating the scholarship: ${req.params.scholarshipId}\n`);
    res.end(
      `Will update the scholarship: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .delete((req, res) => {
    res.end(`Deleting scholarship: ${req.params.scholarshipId}`);
  });

module.exports = scholarshipRouter;
