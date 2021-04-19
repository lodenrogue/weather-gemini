const axios = require('axios');

const BASE_URL = 'https://wttr.in'

class Weather {

    constructor(location) {
        this.location = location;
    }

    async forecast(isMetric = false) {
        const data = await this.getData(this.location, isMetric);
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

    async getData(location, isMetric) {
        return new Promise((resolve, reject) => {
            let url = `${BASE_URL}/${location}?AT`;
            url = isMetric ? `${url}m` : url;
            axios.get(url).then(res => resolve(res.data));
        });
    }
}

module.exports = Weather;
