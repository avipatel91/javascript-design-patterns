let list = $('.list')
let pictureAreaElem =  $('.picture-area')
let editButtonEnabled = false;
let data = {};

for (const num of [1,2]) {
    data[num] = {
        name: 'kitten-' + num,
        count: 0,
    };
    let elem = $('<li></li>')
    elem.attr('id', num)
    elem.text(data[num].name)
    elem.click(clickHandler)
    list.append(elem)
}

function clickHandler(e) {
    let id = e.target.id;
    renderPicture(id)
    addRemoveEditButton(id);
}

function renderPicture(id) {
    $('#title').text(data[id].name)
    $('#count').text(data[id].count)

    $('#kitten').attr('src', `kitten-${id}.jpg`)
    $('#kitten').off()
    $('#kitten').click(((id) => {
        return function() {
            $('#count').text(++data[id].count)
        }
    })(id))
}

function addRemoveEditButton(id) {
    $('.edit').empty()
    let button = $('<button>Edit</button>')
    $('.edit').append(button)
    button.click(() => {
        if (editButtonEnabled) {
            $('.form').empty()
            editButtonEnabled = false;
            return;
        }
        editButtonEnabled = true;
        $('.form').append(
            `<div> Name: <input class="name-input" type=text></input></div>` +
            `<div> Clicks: <input class="count-input" type=text></input></div>` +
            `<button class="save" style="margin: 5px">Save</button>`
        )
        $('.name-input').val(data[id].name)
        $('.count-input').val(data[id].count)
        $('.save').click(() => {
            data[id].name = $('.name-input').val()
            data[id].count = $('.count-input').val()
            renderPicture(id)
            editButtonEnabled = false;
            $('.form').empty()
        });
    });
}
