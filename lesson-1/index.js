let list = $('.list')
let pictureAreaElem =  $('.picture-area')
let counts = {};

for (const num of [1,2]) {
    counts[num] = 0;
    let elem = $('<li></li>')
    elem.attr('id', `cat-${num}`)
    elem.text(`cat-${num}`)
    elem.click(clickHandler)
    list.append(elem)
}

function clickHandler(e) {
    let number = e.target.id.split('-')[1]

    $('#title').text(`kitten-${number}`)
    $('#count').text(counts[number])

    $('#kitten').attr('src', `kitten-${number}.jpg`)
    $('#kitten').off()
    $('#kitten').click(((num) => {
        return function() {
            $('#count').text(++counts[num])
        }
    })(number))
}
