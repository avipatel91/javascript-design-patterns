/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());


/* STUDENT APPLICATION */
$(function() {
    var attendance = JSON.parse(localStorage.attendance),
        $allMissed = $('tbody .missed-col'),
        $allCheckboxes = $('tbody input');

    // Count a student's missed days
    function countMissing(student, name) {
        let inputs = student.children('td').children('input');
        let missingCount = 0;
        inputs.each((index) => {
            if (attendance[name][index]) missingCount++;
        });
        student.children('.missed-col').text(missingCount)
    }

    // Check boxes, based on attendace records
    $.each(attendance, function(name, days) {
        var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
            dayChecks = $(studentRow).children('.attend-col').children('input');
        dayChecks.each(function(i) {
            $(this).prop('checked', days[i]);
        });
        countMissing(studentRow, name);
    });

    // When a checkbox is clicked, update localStorage
    $allCheckboxes.on('click', function() {
        let name = $(this).parent().parent().children('.name-col').text();
        let student = $('tbody .name-col:contains("' + name + '")').parent()
        let inputs = student.children('td').children('input');
        inputs.each(function(index) {
            attendance[name][index] = $(this).prop('checked');
        });
        countMissing(student, name);
        localStorage.attendance = JSON.stringify(attendance);
    });

}());
