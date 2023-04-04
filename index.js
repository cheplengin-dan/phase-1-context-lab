/* Your Code Here */
function createEmployeeRecord(employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  

  function createEmployeeRecords(employeesData) {
    return employeesData.map(createEmployeeRecord);
  }

  function createTimeInEvent(dateStamp) {
    // Parse the date and time from the dateStamp argument
    const [date, hour] = dateStamp.split(' ');
  
    // Create a new timeInEvent object
    const timeInEvent = {
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    };
  
    // Add the timeInEvent object to the employee's timeInEvents array
    this.timeInEvents.push(timeInEvent);
  
    // Return the updated employee record
    return this;
  }

  function createTimeOutEvent(dateStamp) {
    // Parse the date and time from the dateStamp argument
    const [date, hour] = dateStamp.split(' ');
  
    // Create a new timeOutEvent object
    const timeOutEvent = {
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    };
  
    // Add the timeOutEvent object to the employee's timeOutEvents array
    this.timeOutEvents.push(timeOutEvent);
  
    // Return the updated employee record
    return this;
  }

  function hoursWorkedOnDate(date) {
    // Find the timeInEvent and timeOutEvent objects for the given date
    const timeInEvent = this.timeInEvents.find(event => event.date === date);
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date);
  
    // Calculate the hours worked as the difference between the timeOut and timeIn hours
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  
    // Return the hours worked as an integer
    return hoursWorked;
  }

  function wagesEarnedOnDate(date) {
    // Calculate the hours worked on the given date using the hoursWorkedOnDate() function
    const hoursWorked = hoursWorkedOnDate.call(this, date);
  
    // Multiply the hours worked by the employee's payPerHour to get the amount owed
    const payOwed = hoursWorked * this.payPerHour;
  
    // Return the pay owed as a number
    return payOwed;
  }

  function findEmployeeByFirstName(srcArray, firstName) {
    // Find the first record in srcArray where the firstName property matches the firstName argument
    return srcArray.find(function (employee) {
      return employee.firstName === firstName;
    });
  }
  
  function calculatePayroll(employeeRecords) {
    // Sum up the wages for each employee using the allWagesFor() method
    return employeeRecords.reduce(function (totalPay, employee) {
      return totalPay + allWagesFor.call(employee);
    }, 0);
  }
  
  
  
  
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

