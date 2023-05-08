const express = require('express');
const tenderRouter = express.Router();
const moment = require('moment');
const DataBase = require('../database/db');

const tenders = [
    {
      id: 1,
      title: 'Przetarg na dostawę sprzętu komputerowego',
      description: 'Dostawa sprzętu komputerowego dla szkoły',
      institution: 'Szkoła Podstawowa nr 1',
      startDate: '2023-05-20T10:00:00',
      endDate: '2023-05-30T17:00:00',
      budget: 30000,
      bids: [
        {
          bidderName: 'Komputer-Świat',
          bidValue: 28000,
          submissionDate: '2023-05-22T14:30:00',
        },
        {
          bidderName: 'PC-Partner',
          bidValue: 32000,
          submissionDate: '2023-05-25T12:00:00',
        },
        {
          bidderName: 'Mega-IT',
          bidValue: 29000,
          submissionDate: '2023-05-27T15:45:00',
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
  .get('/', async (req, res, next) => {
      const tenders = await DataBase.getAllTenders();
      res.render('index', { tenders });
  })
  .get('/dodaj-przetarg', (req, res, next) => {
      res.render('add-tender');
  })
  .get('/lista', async (req, res, next) => {
    // coś nie tak z asynchronicznością + data sie rozsypała
      const tenders = await DataBase.getAllTenders();
      console.log("tenders", tenders)
      res.render('tenders-list', { tenders });
  })
  .get('/skonczone-przetargi', async (req, res, next) => {
      const tenders = await DataBase.getAllTenders();
      const completedTenders = tenders.filter(tender => moment().isAfter(tender.endDate));
      res.render('completed-tenders', { completedTenders });
  })      
  .get('/skonczone-przetargi/:id', async (req, res, next) => {
      const tenderId = parseInt(req.params.id);
      const tender = await DataBase.getTenderById(tenderId);
    
      if (tender && moment().isAfter(tender.endDate)) {
        tender.bids = await DataBase.getAllBidsByTenderId(tenderId);
        tender.bids.sort((a, b) => a.bidValue - b.bidValue);
        tender.winningBid = tender.bids.find(bid => bid.bidValue <= tender.budget);
        res.render('completed-tenders-details', { tender });
      } else {
          const err = new Error('Nie znaleziono zakończonego przetargu o podanym ID');
          err.status = 404;
          next(err);
      }
  })
  .post('/dodaj-przetarg', async (req, res, next) => {
      const newTender = {
        title: req.body.title,
        institution: req.body.institution,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        budget: req.body.budget
      };
    
      await DataBase.addTender(newTender);
      res.redirect('/przetargi');
  })
  .get('/:id', async (req, res, next) => {
      const tenderId = parseInt(req.params.id);
      const tender = await DataBase.getTenderById(tenderId);
    
      if (tender) {
        res.render('tender-details', { tender });
      } else { 
        res.status(404).send('Przetarg nie został znaleziony.');
      } 
  })
  .get('/:id/zloz-oferte', async (req, res, next) => {
      const tenderId = parseInt(req.params.id);
      const tender = await DataBase.getTenderById(tenderId);
    
      if (tender) {
        res.render('submit-bid', { tender });
      } else {
        res.status(404).send('Przetarg nie został znaleziony.');
      }
  })
  .post('/:id/zloz-oferte', async (req, res, next) => {
    const tenderId = parseInt(req.params.id);
    const tender = await DataBase.getTenderById(tenderId);
  
    if (tender) {
      const currentDate = moment();
      const endDate = moment(tender.endDate);
  
      if (currentDate.isBefore(endDate)) {
        const newBid = {
          tenderId,
          bidderName: req.body.bidderName,
          bidValue: parseFloat(req.body.bidValue),
          submissionDate: currentDate.format('YYYY-MM-DD HH:mm:ss')
        };
  
        await DataBase.addBid(newBid);
  
        res.redirect(`/przetargi/${tender.id}`);
      } else {
        res.send('Przetarg został zakończony. Nie można składać ofert.');
      }
    } else {
      res.status(404).send('Przetarg nie został znaleziony.');
    }
})

module.exports = tenderRouter;
