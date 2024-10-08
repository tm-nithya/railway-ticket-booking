angular.module('ticketBookingApp', [])
.controller('TicketController', ['$scope', function($scope) {
    var ctrl = this;
    ctrl.from = '';
    ctrl.to = '';
    ctrl.date = '';
    ctrl.class = '';
    ctrl.category = 'GENERAL';
    ctrl.disability = false;
    ctrl.flexibleDate = false;
    ctrl.availableBerth = false;
    ctrl.passConcession = false;
    ctrl.searchResults = [];
    ctrl.totalCost = 0;
    ctrl.seats = 1; // Default number of seats
    ctrl.cities = ["New Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore", "Hyderabad", "Ahmedabad", "Pune", "Jaipur", "Lucknow", "Kanpur", 
    "Nagpur", "Visakhapatnam", "Indore", "Thane", "Bhopal", "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut",
     "Rajkot", "Kalyan-Dombivali", "Vasai-Virar", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad", "Ranchi",
      "Howrah", "Coimbatore", "Jabalpur", "Gwalior", "Vijayawada", "Jodhpur", "Madurai", "Raipur", "Kota", "Guwahati", "Chandigarh"];
    ctrl.selectedResult = null;
    // Initialize filteredCities
    ctrl.filteredCities = angular.copy(ctrl.cities);

    // Function to filter cities for "To" dropdown
    ctrl.updateToCities = function() {
        ctrl.filteredCities = ctrl.cities.filter(function(city) {
            return city !== ctrl.from;
        });
    };

    // Function to calculate cost based on selected cities
    ctrl.calculateCost = function() {
        // For demonstration, let's assume the cost is based on the distance between cities
        // You can define a more complex logic here or use a cost matrix
        if (ctrl.from && ctrl.to) {
            // Example logic: cost increases with alphabetical distance between cities
            var fromIndex = ctrl.cities.indexOf(ctrl.from);
            var toIndex = ctrl.cities.indexOf(ctrl.to);
            ctrl.cost = Math.abs(fromIndex - toIndex) * 100; // Example calculation
        } else {
            ctrl.cost = 0;
        }
        ctrl.calculateTotalCost();
    };

    // Function to calculate total cost
    ctrl.calculateTotalCost = function() {
        ctrl.totalCost = ctrl.seats * ctrl.cost;
    };

    // Watch for changes in "From" city and update "To" cities accordingly
    $scope.$watch('ctrl.from', function(newVal, oldVal) {
        if (newVal !== oldVal) {
            ctrl.updateToCities();
            ctrl.calculateCost(); // Recalculate cost whenever the "From" city changes
        }
    });

    // Watch for changes in "To" city and recalculate the cost
    $scope.$watch('ctrl.to', function(newVal, oldVal) {
        if (newVal !== oldVal) {
            ctrl.calculateCost(); // Recalculate cost whenever the "To" city changes
        }
    });

    ctrl.search = function() {
        var searchData = {
            from: ctrl.from,
            to: ctrl.to,
            date: ctrl.date,
            class: ctrl.class,
            category: ctrl.category,
            disability: ctrl.disability,
            flexibleDate: ctrl.flexibleDate,
            availableBerth: ctrl.availableBerth,
            passConcession: ctrl.passConcession
        };

        // Simulating search results
        ctrl.searchResults = [
            {
                from: ctrl.from,
                to: ctrl.to,
                departureTime: '08:00 AM',
                arrivalTime: '12:00 PM'
            },
            {
                from: ctrl.from,
                to: ctrl.to,
                departureTime: '02:00 PM',
                arrivalTime: '06:00 PM'
            },
            {
                from: ctrl.from,
                to: ctrl.to,
                departureTime: '08:00 PM',
                arrivalTime: '11:00 PM'
            }
        ];

        // Calculate total cost based on the number of seats and cost per seat
        ctrl.calculateTotalCost();
    };

    ctrl.redirectToIRCTC = function() {
        window.location.href = 'https://www.irctc.co.in';
    };
    ctrl.dummyPay = function() {
        if (ctrl.selectedResult) {
            alert('Payment successfull');
    };
};
ctrl.getTodayDate = function() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
};

// Initialize the minimum date for the date input field
ctrl.minDate = ctrl.getTodayDate();
 }]);