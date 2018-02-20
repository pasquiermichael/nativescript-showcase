const IMG_REGEX = /<[iI]mg[\=\"a-zA-Z0-9 \/:\._\- \;]+[>$]/g;
const SRC_REGEX = /http(s)?:\/\/[a-zA-Z0-9\{\}\/\.\_\-]+\.(jpg|png|jpeg)/g;

module.exports = {
    getImgRegex:function(){
        return IMG_REGEX;
    },

    getSrcRegex:function(){
        return SRC_REGEX;
    }
};
