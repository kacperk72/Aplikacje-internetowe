const express = require('express');
const tenderRouter = express.Router();
const moment = require('moment');

const tenders = [
    {
      id: 1,
      title: 'Przetarg na dostawę sprzętu komputerowego',
      description: 'Dostawa sprzętu komputerowego dla szkoły',
      institution: 'Szkoła Podstawowa nr 1',
      startDate: '2023-04-20T10:00:00',
      endDate: '2023-04-30T17:00:00',
      budget: 30000,
      bids: [
        {
          bidderName: 'Komputer-Świat',
          bidValue: 28000,
          submissionDate: '2023-04-22T14:30:00',
        },
        {
          bidderName: 'PC-Partner',
          bidValue: 32000,
          submissionDate: '2023-04-25T12:00:00',
        },
        {
          bidderName: 'Mega-IT',
          bidValue: 29000,
          submissionDate: '2023-04-27T15:45:00',
        },
      ],
    },
    {
      id: 2,
      title: 'Przetarg na usługę serwisowania samochodów',
      description: 'Serwisowanie samochodów służbowych',
      institution: 'Urząd Miasta',
      startDate: '2023-04-15T09:00:00',
      endDate: '2023-04-25T16:00:00',
      budget: 10000,
      bids: [
        {
          bidderName: 'Auto-Service',
          bidValue: 9500,
          submissionDate: '2023-04-20T10:30:00',
        },
        {
          bidderName: 'Car-Expert',
          bidValue: 12000,
          submissionDate: '2023-04-23T11:15:00',
        },
        {
          bidderName: 'Moto-Fix',
          bidValue: 10500,
          submissionDate: '2023-04-24T15:00:00',
        },
      ],
    },
  ];
  


tenderRouter
    .get('/', function(req, res, next) {
        res.render('index');
    })
    .get('/dodaj-przetarg', function(req, res, next) {
        res.render('add-tender');
    })
    .get('/lista', function(req, res, next) {
        const activeTenders = tenders.filter(t => moment().isBefore(t.endDate));
        res.render('tenders-list', { tenders: activeTenders });
    })
    .get('/skonczone-przetargi', function(req, res, next) {
        const completedTenders = tenders.filter(tender => moment().isAfter(tender.endDate));
        res.render('completed-tenders', { completedTenders });
    })      
    .get('/skonczone-przetargi/:id', function(req, res, next) {
        const tenderId = parseInt(req.params.id);
        const tender = tenders.find(t => t.id === tenderId && moment().isAfter(t.endDate));
      
        if (tender) {
          tender.bids.sort((a, b) => a.bidValue - b.bidValue);
          tender.winningBid = tender.bids.find(bid => bid.bidValue <= tender.budget);
          res.render('completed-tenders-details', { tender });
        } else {
            const err = new Error('Nie znaleziono zakończonego przetargu o podanym ID');
            err.status = 404;
            next(err);
        }
    })
    .post('/dodaj-przetarg', function(req, res, next) {
        const newTender = {
          id: tenders.length + 1,
          title: req.body.title,
          institution: req.body.institution,
          description: req.body.description,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          budget: req.body.budget,
          bids: []
        };
      
        tenders.push(newTender);
        res.redirect('/przetargi');
    })
    .get('/:id', function(req, res, next) {
        const tenderId = parseInt(req.params.id);
        const tender = tenders.find(t => t.id === tenderId);
      
        if (tender) {
          res.render('tender-details', { tender });
        } else { 
          res.status(404).send('Przetarg nie został znaleziony.');
        } 
    })
    .get('/:id/zloz-oferte', function(req, res, next) {
        const tenderId = parseInt(req.params.id);
        const tender = tenders.find(t => t.id === tenderId);
      
        if (tender) {
          res.render('submit-bid', { tender });
        } else {
          res.status(404).send('Przetarg nie został znaleziony.');
        }
    })
    .post('/:id/zloz-oferte', function(req, res, next) {
        const tenderId = parseInt(req.params.id);
        const tender = tenders.find(t => t.id === tenderId);
      
        if (tender) {
          const currentDate = moment();
          const endDate = moment(tender.endDate);
      
          if (currentDate.isBefore(endDate)) {
            const newBid = {
              bidderName: req.body.bidderName,
              bidValue: parseFloat(req.body.bidValue),
              submissionDate: currentDate.format('YYYY-MM-DD HH:mm:ss')
            };
      
            tender.bids.push(newBid);
      
            res.redirect(`/przetargi/${tender.id}`);
          } else {
            res.send('Przetarg został zakończony. Nie można składać ofert.');
          }
        } else {
          res.status(404).send('Przetarg nie został znaleziony.');
        }
    })
    


module.exports = tenderRouter;
