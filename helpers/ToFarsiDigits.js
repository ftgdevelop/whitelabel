String.prototype.toFarsiDigits = function() {

    const num_dic = {
        "1": "۱",
        "2": "۲",
        "3": "۳",
        "4": "۴",
        "5": "۵",
        "6": "۶",
        "7": "۷",
        "8": "۸",
        "9": "۹",
        "0": "۰"
    };

    return this.replace(/[0-9]/g, digit => (num_dic[digit]));

};