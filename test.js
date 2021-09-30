let notificationList =  [
    {
      body: 'abcxyz',
      id: 13,
      label: "notice_contract_start",
      publish_date: "2021-06-05 12:10:00",
      read_date: "2021-07-01 15:22:44",
      read_flag: true,
      title: "like '%/%'"
    },
    {
      body: 'xyzabc',
      id: 12,
      label: "notice_contract_start",
      publish_date: "2021-02-11 09:05:00",
      read_date: "2021-07-01 15:22:44",
      read_flag: false,
      title: "like '%/%/%'"
    },
    {
      body: 'abcjkl',
      id: 11,
      label: "notice_contract_start",
      publish_date: "2021-04-21 15:15:00",
      read_date: "2021-07-01 15:22:44",
      read_flag: false,
      title: "like '%/%/%/%/%'"
    },
    {
      body: 'qwerty',
      id: 10,
      label: "notice_contract_start",
      publish_date: "2021-01-01 08:40:00",
      read_date: "2021-07-01 15:22:44",
      read_flag: true,
      title: "like '%/%/%/%/%/%'"
    },
  ]

  function dateFormat(date) {
    let today = new Date(date)
    let day = today.getDate()
    let month = today.getMonth() + 1
    let year = today.getFullYear()
    let hour = today.getHours()
    let minutes = today.getMinutes()
  
    if (day < 10) {
      day = '0' + day
    }
  
    if (month < 10) {
      month = '0' + month
    }
  
    if (hour < 10) {
      hour = '0' + hour
    }
  
    if (minutes < 10) {
      minutes = '0' + minutes
    }
  
    if (hour !== undefined && minutes !== undefined) {
      return year + '/' + month + '/' + day + ' ' + hour + ':' + minutes
    }
  
    return year + '/' + month + '/' + day
  }
  
  function convertTime(x){
        let timeFormat = new Date(x.publish_date)
        return {...x , publish_date : timeFormat}
  }

  let fortmat = notificationList.map(convertTime)
fortmat.sort((a , b) => a.publish_date > b.publish_date ? -1 : 1)

function fortmater(x){
    let timeFormat = dateFormat(x.publish_date)
    return {...x , publish_date : timeFormat}
}
let result = fortmat.map(fortmater)
console.log(result);