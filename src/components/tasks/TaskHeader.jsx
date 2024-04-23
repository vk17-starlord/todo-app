function TaskHeader() {
    const today = new Date();
    const day = today.getDate(); // Get the day of the month
    const year = today.getFullYear(); // Get the four-digit year
    // Define an array of month names
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    // Get the current month as a name
    const monthName = monthNames[today.getMonth()]; // Get the month name from the array

    // Construct the formatted date
    const formattedDate = `${day} ${monthName} ${year}`;

    return (
        <div className="w-full">
            <div className="w-full task-header">
                <div>
                    <h2>Hello , User 👋🏻</h2>
                    <p>Today , {formattedDate} </p>
                </div>
                <div>
                    <img
                        className="avatar"
                        src="https://cdn.dribbble.com/users/418623/screenshots/19215624/media/94e84860880e81d910bca36869c2435f.jpg"
                        alt=""
                    />
                </div>
            </div>
            <p className="notice">
                Please Drag and Drop Boxes around the boards to manage them , or click on the
                checkbox to mark them
            </p>
            <p className="notice">
                Click on Categories in sidebar to filter the tasks by categories
            </p>
        </div>
    );
}

export default TaskHeader;
