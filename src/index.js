import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Immutable from 'immutable';

var address = Immutable.fromJS({addr: "test", currency: "ETH"})
var db = Immutable.fromJS({coins: ["ETH", "BTC"],
                           addresses: [{addr: "test", currency: "ETH"},
                                       {addr: "testing", currency: "BTC"}]});

const input = (props, idx) =>
    <li>
       <input type="text"
              placeholder="Enter address here"
              value={props.get('addr')}
              onChange={(e) => {update(db.setIn(['addresses', idx, 'addr'], e.target.value))}}/>

       <select value={props.get('currency')}
               onChange={(e) => update(db.setIn(['addresses', idx, 'currency'], e.target.value))}>
             {db.get('coins').map(x => <option value={x}>{x}</option>)}
       </select>

       <span onClick={() => update(db.updateIn(['addresses'], (x) => x.delete(idx)))}>X</span>
    </li>

const Root = () =>
    <div>
        <ul>
            {db.get('addresses').map(input)}
        </ul>
        <button onClick={() => update(db.updateIn(['addresses'], (x) => x.push(address)))}>Grow a pair</button>
    </div>

var update;
(update = (newData) => {
    db = newData
    ReactDOM.render(<Root />,
                    document.getElementById('root'))
})(db)
