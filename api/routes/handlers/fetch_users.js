const User = require('../../config/models');
const { Observable } = require('rxjs');
//define global variable to count users

let userCount;

const FetchUsers = (req, res) => {
    User.find().count({}, (err, num) => {
        if(err) return;
        userCount = num;
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