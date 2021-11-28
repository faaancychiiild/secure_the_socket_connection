const { Count } = require('../../config/models');
const { Observable } = require('rxjs');
//define global variable to count users

let userCount;

const FetchUsers = (req, res) => {
    Count.findOne({}, (err, doc) => {
        if(err) return;
        doc === null ? userCount = 0 : userCount = doc.users;
        let observer_2 = {
            next: () => {
                res.write(
                    `data: ${userCount}\n\n`
                );
            }
        }
        observer.next().subscribe(observer_2);
    });
    res.writeHead(200, {
        "Connection": "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
    });
}

/*this observer returns another observable which we
*subscribe to the observer <observer_2> above
*
*this observer is also used in <register> module
*purpose: TO IMPLEMENT RxJS with Node.js
*/
const observer = {
    next: () => new Observable(sub => sub.next())
}

module.exports = {FetchUsers, observer};