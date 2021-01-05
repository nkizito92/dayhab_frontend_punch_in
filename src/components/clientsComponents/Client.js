const Client = ({ client }) => {
    function setPayment(pay, hr) {
        return pay * (hr / 5)
    }
    let time = []
    let clockingOut = []
    let clockingIn = []
    let clockOuts = () => {
        for (let i = 0; i < client.punches.length; i++) {
            if (i % 2 !== 0) clockingOut.push(client.punches[i])
        }
        const unique = [...new Map(clockingOut.map(cOut => [cOut.id, cOut])).values()]
        return unique
    }

    let clockIns = () => {
        for (let i = 0; i < client.punches.length; i++) {
            if (i % 2 === 0) clockingIn.push(client.punches[i])
        }
        const unique = [...new Map(clockingIn.map(cIn => [cIn.id, cIn])).values()]
        return unique
    }
    let totalMinutes = () => {
        for (let i = 0; i < clockOuts().length; i++) {
            time.push(((Number(parseInt(clockOuts()[i].clock_out))) - (Number(parseInt(clockIns()[i].clock_in)))))
        }
        return time
    }
    let time_convert = num => {
        
        function isWeekday(year, month, day) {
            let thisday = new Date(year, month, day).getDay();
            return thisday !== 0 && thisday !== 6;
        }

        function getWeekdaysInMonth(month, year) {
            let weekdays = 0;
            for(var i=0; i< daysRightNow; i++) {
                if (isWeekday(year, month, i+1)) weekdays++;
            }
            return weekdays;
        }
        let d = new Date()
        let year = d.getFullYear()
        let month = d.getMonth()
        let time = new Date(year, month, 0)
        let daysRightNow = time.getDate()
        let workDays = getWeekdaysInMonth(month, year)
        let extraMinutes = 0
        let allMinutes = 0
        if (num[1] !== "") {
            for (let ele of num) if (ele !== undefined) allMinutes += ele
        } else {
            allMinutes = num
        }
        // if(allMinutes > 300) {
        //     extraMinutes = allMinutes - 300
        //     allMinutes = 300
        // }
        // if(allMinutes < 300) {
        //     allMinutes += extraMinutes
        // }
        // 5 hours a day is the clients pay rate
        // less then 5 a day is a percentage
        if (allMinutes > 60 * 40) {
            allMinutes = 60 * 40
        }
        let hours = Math.floor(allMinutes / 60);
        let minutes = allMinutes % 60;
        // display time and the payment
        return (
                   setPayment(client.pay_rate, hours) 
                   
            )
        
    }
    return (
        <tr>
            <td>{client.full_name}</td>
            <td>${client.pay_rate}</td>
            <td>{client.punches.map(punch => punch.clock_in)}</td>
            <td>{"$"+time_convert(totalMinutes())}</td>
        </tr>
    )
}

export default Client