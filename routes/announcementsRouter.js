const express = require('express');
const announcementsRouter = express.Router();

announcementsRouter
  .route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req, res) => {
    res.end('Will send all the announcements to you');
  })
  .post((req, res) => {
    res.end(
      `Will add the announcement: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end(`Put opreation not supported on /announcements`);
  })
  .delete((req, res) => {
    res.end('Deleting all announcements');
  });

announcementsRouter
  .route('/:announcementId')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req, res) => {
    res.end(
      `Will send all details for announcement:${req.params.announcementId} to you`
    );
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /announcements/${req.params.announcementId}`
    );
  })
  .put((req, res) => {
    res.write(`Updating the announcement: ${req.params.announcementId}\n`);
    res.end(
      `Will update the announcement: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .delete((req, res) => {
    res.end(`Deleting announcement: ${req.params.announcementId}`);
  });

module.exports = announcementsRouter;
