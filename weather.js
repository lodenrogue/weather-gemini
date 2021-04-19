const axios = require('axios');

const URL = 'https://wttr.in'

class Weather {

    constructor(location) {
        this.location = location;
    }

    async forecast() {
        const data = await this.getData(this.location);
        const formatted = this.formatData(data);
        return formatted;
    }

    formatData(data) {
        const cleaned = data
                .split('\n')
                .map(this.removeAd)
                .join('\n');

        return "```\n" + cleaned + "```";
    }

    removeAd(line) {
        return line.startsWith('Follow') ? '' : line;
   }

    async getData(location) {
        return new Promise((resolve, reject) => {
            axios.get(`${URL}/${location}?AT`).then(res => resolve(res.data));
        });
    }
}

module.exports = Weather;
