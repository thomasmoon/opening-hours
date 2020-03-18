import React, { useEffect, useState } from 'react';
import './OpeningHours.scss';
import clock from './clock.svg';
import hours from './hours.json';

function OpeningHours() {

  // Days with refined data
  const [days, setDays] = useState([]);

  const today = new Date();
  const todayDay = today.getDay();

  const diffFromSunday = today.getDate() - todayDay;
  const sunday = new Date(today);
  sunday.setDate(diffFromSunday);

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
  let sundayClosedString = '';

  // Shift Sunday to the beginning of the week
  dayIndexes.unshift(dayIndexes.pop());

  // Iterate the days and refine the data
  for (let i=0; i<dayIndexes.length; i++) {

    // Walk the days
    let thisDate = new Date(sunday);
    thisDate.setDate(sunday.getDate() + i);

    // Pick the records from the original data
    let dayHours = hours[dayIndexes[i]];
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

      // when starting with a close, it goes to the previous day
      if (dayHour.type === 'close' && !opened) {

        // add to the previous day if not Sunday
        if (i > 0) {
          daysTemp[i-1].hoursString += ' - ' + hourFormatted;
        } else {
          // otherwise save it to a temporary variable
          // for addition at the end
          sundayClosedString = hourFormatted;
        }

        opened = false;

      // open a new time range
      } else if (dayHour.type === 'open' && !opened) {

        // if we already have something, add a comma
        if (hoursString.length) {
          hoursString += ', ';
        }
        hoursString += hourFormatted;

        opened = true;

      // close the one we already started
      } else if (dayHour.type === 'close' && opened) {

        opened = false;

        hoursString += ' - ' + hourFormatted;
      }
    });

    daysTemp.push({
      'key': i,
      'textKey': dayIndexes[i],
      'name': thisDate.toLocaleDateString("en-US", {weekday: 'long'}),
      'hours': dayHours,
      'hoursString': hoursString
    });
  } /* end the iteration of days */

  // Add the Sunday closed string to Saturday if it exists
  if (sundayClosedString !== '') {
    daysTemp[daysTemp.length-1].hoursString += ' - ' + sundayClosedString;
  }

  // Now that the keys are set correctly on the object
  // we can shift sunday back to the end of the list
  // and set the final days list
  daysTemp.push(daysTemp.shift());

  setDays(daysTemp);
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
