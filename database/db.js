const connection = require('./connection.js');

const DataBase = {
  getAllTenders: async () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM tenders', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  getTenderById: async (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM tenders WHERE id = ?', [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  },

  getAllBidsByTenderId: async (tender_id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM bids WHERE tender_id = ?', [tender_id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  addTender: async (tenderData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO tenders SET ?', tenderData, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.insertId);
        }
      });
    });
  },

  addBid: async (bidData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO bids SET ?', bidData, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.insertId);
        }
      });
    });
  }
};

module.exports = DataBase;
