const { Count } = require('../../config/models');
const { Observable } = require('rxjs');
const { IndexObserver } = require('../../index');
//define global variable to count users

let userCount;
/*this observer returns another observable which we
*subscribe to the observer <IndexObserver> in index.js 
*
*this observer is also used in <register> module
*purpose: TO IMPLEMENT RxJS with Node.js
*/
const observer = {
    next: () => new Observable(subscriber => {
        subscriber.next('new user registered')
    }).subscribe(IndexObserver)
}

const FetchStats = (req, res) => {
    Count.findOne({}, (err, doc) => {
        if (err) return;
        doc === null ? userCount = 0 : userCount = doc.users;
        res.status(200).json(userCount);
    });
}

module.exports = { FetchStats, observer };