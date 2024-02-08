import React, {  } from 'react';

function Person()  {

    const people = [{
        id: 0,
        name: 'Creola Katherine Johnson',
        profession: 'mathematician',
      }, {
        id: 1,
        name: 'Mario José Molina-Pasquel Henríquez',
        profession: 'chemist',
      }, {
        id: 2,
        name: 'Mohammad Abdus Salam',
        profession: 'physicist',
      }, {
        id: 2,
        name: 'Percy Lavon Julian',
        profession: 'chemist',  
      }, {
        id: 3,
        name: 'Subrahmanyan Chandrasekhar',
        profession: 'astrophysicist',
      }];

        const chemists = people.filter(person =>
          person.id === 2
        );
        const listItems = chemists.map(person =>
          <li>
            <p>
              <b>{person.name}:</b>
              {' ' + person.profession + ' '}
            </p>
          </li>
        );

        return <ul>{listItems}</ul>;
 
}

export default Person;