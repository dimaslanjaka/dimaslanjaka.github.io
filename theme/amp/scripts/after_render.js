'use strict';

hexo.extend.filter.register('after_post_render', data => {
    
    const regex_img = /<img .*?>/gi;
    const regex_rel  = /rel="external"/g;
    
    function getAttributeValue(tag, attribute) {
        const regex = new RegExp('\\b' + attribute + '="([^"]*)"', 'i');
        const match = tag.match(regex);

        return ' ' + attribute + '="' + (match ? match[1] : '') + '"';
    }
    
    data.content = data.content.replace(regex_img, $0 => {
        let xml = '<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive"';

        xml += getAttributeValue($0, 'width');
        xml += getAttributeValue($0, 'height');
        xml += getAttributeValue($0, 'src');
        xml += getAttributeValue($0, 'alt');
        xml += getAttributeValue($0, 'title');
        xml += ' ></amp-img>';
        
        return xml;
        
    }).replace(regex_rel, '');
    
    return data;

});
