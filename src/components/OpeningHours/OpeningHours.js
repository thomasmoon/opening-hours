import React, { useEffect, useState } from 'react';
import './OpeningHours.scss';
import clock from './clock.svg';
import hours from './hours.json';

function OpeningHours() {

  // Days with refined data
  const [days, setDays] = useState([]);

  const today = new Date();
  const todayDay = today.getDay();
  const todayCopy = today;

  const diffFromSunday = today.getDate() - todayDay;
  const sunday = new Date(today);
  sunday.setDate(diffFromSunday);


  console.log('Diff from Sunday', diffFromSunday);

  console.log('Sunday: ', sunday.toLocaleDateString("en-US", {weekday: 'long'}));
  console.log('Today: ', today.toLocaleDateString('en-US', {weekday: 'long'}));
  //console.log('Sunday: ', sundayDate.toLocaleDateString());

  /* Hours data is an object with a key for each day
  * since those are text based, we should remap those.
  *
  * We'll use the Date.getDay() indexes as our compass:
  * 0 = Sunday, 1 = Monday, 2= Tuesday, etc.
  * 
  * That means we'll have to shift the indexes to start the
  * week with monday.
  * 
  * But when that's done, harmonizing the index for the day
  * will help us to highlight the current day and print
  * the localized name for the day.
  */
  const processData = () => {

  let dayIndexes = Object.keys(hours);
  let daysTemp = [];

  // Shift Sunday to the beginning of the week
  dayIndexes.unshift(dayIndexes.pop());

  daysTemp = dayIndexes.map((textKey, index) => {
    console.log('textKey: ', textKey);
    console.log('index: ', index);

    let thisDate = new Date(sunday);
    thisDate.setDate(sunday.getDate() + index);

    let dayHours = hours[textKey];
    let hoursString = '';
    let opened = false;

    // Render hours as a single string for easy output 
    dayHours.forEach(dayHour => {

      // The freedom of loose typing =)
      let hourFormatted = parseInt(dayHour.value) / 3600;
      let suffix = hourFormatted < 12 ? ' AM' : ' PM';

      // convert to 12 hour time
      if (hourFormatted > 12) {
        hourFormatted -= 12;
      }
      
      hourFormatted += suffix; 

      // not some times will have to be added to other days
      if (dayHour.type === 'open' && !opened) {

        opened = true;

        // if we already have something, add a comma
        if (hoursString.length) {
          hoursString += ', ';
        }

        hoursString += hourFormatted;
      } else if (dayHour.type === 'close' && opened) {

        opened = false;

        hoursString += ' - ' + hourFormatted;
      }
    });

    let newDay = {
      'key': index,
      'textKey': textKey,
      'name': thisDate.toLocaleDateString("en-US", {weekday: 'long'}),
      'hours': dayHours,
      'hoursString': hoursString
    }

    console.log(newDay);

    return newDay;
  });

  // Now that the keys are set correctly on the object
  // we can shift sunday back to the end of the list
  // and set the final days list
  daysTemp.push(daysTemp.shift());

  setDays(daysTemp);

  //console.log('Days processed: ', days);
}

  // This is called when the component loads
  useEffect(() => {

    //console.log('Use effect from opening hours component.');

    if (!days.length) {
      processData();
    }
    
  }, [days]);
  

  return (
    <div className="OpeningHours">
      <header>
        <img src={clock} className="icon" alt="clock" />
        <h1>Opening Hours</h1>
      </header>
      <div className="days">
        { days.map(day => (
          <div className="day" key={day.key}>
            <span className="name">
              {day.name}
              { day.key === todayDay ?
                <span className="today">TODAY</span>
                :
                ''
              }
            </span>
            { day.hours.length === 0 ? 
              <span className="closed">Closed</span>
              :
              <span className="hours">
                { day.hoursString }
                </span>
            }
          </div>
        ))}
      </div>
    </div>
  );
}

export default OpeningHours;
