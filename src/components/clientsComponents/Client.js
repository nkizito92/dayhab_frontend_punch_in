import { Link } from "react-router-dom"
const Client = ({ client, punches, month }) => {
    let time = []
    let theseClientPunches = punches.filter(punch => punch.client_id === client.id)
    let clockOuts = (clockingOut = []) => {
        for (let i = 0; i < theseClientPunches.length; i++) {
            if (i % 2 !== 0 && theseClientPunches[i].date === month) clockingOut.push(theseClientPunches[i])
        }
        const unique = [...new Map(clockingOut.map(cOut => [cOut.id, cOut])).values()]
        return unique
    }

    let clockIns = (clockingIn = []) => {
        for (let i = 0; i < theseClientPunches.length; i++) {
            if (i % 2 === 0 && theseClientPunches[i].date === month) clockingIn.push(theseClientPunches[i])
        }
        const unique = [...new Map(clockingIn.map(cIn => [cIn.id, cIn])).values()]
        return unique
    }

    let convertHoursToMinutes = times => {
        let hours = []
        let minutes = []
        let calculatingMinutes
        if (times) {
            for (let i = 0; i < clockOuts().length; i++) {
                hours.push(Number(parseInt(times.split("").slice(0, 2).join(""))))
                minutes.push(Number(parseInt(times.split("").slice(2, 4).join(""))))
                calculatingMinutes = (hours[i] * 60) + minutes[i]
            }
        }
        return calculatingMinutes
    }
    let totalMinutes = () => {
        for (let i = 0; i < clockOuts().length; i++) {
            if (clockIns().length === clockOuts().length) {
                time.push(
                    (convertHoursToMinutes(clockOuts()[i].clock_out))
                    - (convertHoursToMinutes(clockIns()[i].clock_in))
                )
            }
        }
        return time
    }
    function displayAllMinutes() {
        let showAllMinutes = 0;
        for (let minutes of totalMinutes()) {
            showAllMinutes = minutes + showAllMinutes
        }
        let hours = Math.floor(showAllMinutes / 60);
        let minutes = showAllMinutes % 60;
        if (minutes < 10) minutes = (`0${minutes}`)
        if (hours < 1) hours = 0
        return `${hours}:${minutes}`
    }
    function setPayment(pay, hr) {
        return (pay * (hr / 5.00)).toFixed(2)
    }
    let time_convert = (num, newNumb = []) => {
        for (let i = 0; i < num.length / 2; i++) newNumb.push(num[i])

        // function isWeekday(year, month, day) {
        //     let thisday = new Date(year, month, day).getDay();
        //     return thisday !== 0 && thisday !== 6;
        // }

        // function getWeekdaysInMonth(month, year) {
        //     let weekdays = 0;
        //     for (var i = 0; i < daysRightNow; i++) {
        //         if (isWeekday(year, month, i + 1)) weekdays++;
        //     }
        //     return weekdays;
        // }
        // let d = new Date()
        // let year = d.getFullYear()
        // let month = d.getMonth()
        // let time = new Date(year, month, 0)
        // let daysRightNow = time.getDate()
        // let workDays = getWeekdaysInMonth(month, year)
        // let extraMinutes = 0
        let allMinutes = 0
        if (newNumb[1] !== "") {
            for (let ele of newNumb) if (ele !== undefined) allMinutes += ele
        } else {
            allMinutes = newNumb
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
        // if (allMinutes > 60 * 40) {
        //     allMinutes = 60 * 40
        // }
        let hours = Math.floor(allMinutes / 60);
        return (
            setPayment(client.pay_rate, hours)
        )
    }
    return (
        <>
            <td><Link to={`/clients/${client.id}`}>{client.full_name}</Link> </td>
            <td>${client.pay_rate}</td>
            <td>{displayAllMinutes()}</td>
            <td>${time_convert(totalMinutes())}</td>
        </>
    )
}

export default Client