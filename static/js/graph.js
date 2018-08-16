queue()
    .defer(d3.json, "/USdonors/donations")
    .await(makeGraphs);

function makeGraphs(error, donationsJson) {
    if (error) {
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }

    //Clean donorsdonations data
    var donorsDonations = donationsJson;
    var dateFormat = d3.time.format("%d/%m/%Y %H:%M");
    console.log(dateFormat); //returned %d/%m/%Y %H:%M
    donorsDonations.forEach(function (d) {
        d["date_posted"] = dateFormat.parse(d["date_posted"]);
        d["date_posted"].setDate(1);
        d["total_donations"] = +d["total_donations"];
        d.Year = d.date_posted.getFullYear();
    });

    //Create a Crossfilter instance
    var ndx = crossfilter(donorsDonations);

    //Define Dimensions
    var dateDim = ndx.dimension(function (d) {
        return d["date_posted"];
    });
    var resourceTypeDim = ndx.dimension(function (d) {
        return d["resource_type"];
    });
    var povertyLevelDim = ndx.dimension(function (d) {
        return d["poverty_level"];
    });
    var fundingStatusDim = ndx.dimension(function (d) {
        return d["funding_status"];
    });
    var stateDim = ndx.dimension(function (d) {
        return d["school_state"];
    });
    var pfAreaDim = ndx.dimension(function (d) {
        return d["primary_focus_area"];
    });
    var pfSubjectDim = ndx.dimension(function (d) {
        return d["primary_focus_subject"];
    });
    var gradeLevelDim = ndx.dimension(function (d) {
        return d["grade_level"];
    });
    var tfAmericaDim = ndx.dimension(function (d) {
        return d["teacher_teach_for_america"];
    });

    //Calculate metrics
    var numDonationsByDate = dateDim.group();
    var numDonationsByResourceType = resourceTypeDim.group();
    var numDonationsByPovertyLevel = povertyLevelDim.group();
    var numDonationsByFundingStatus = fundingStatusDim.group();
    var numDonationsByPrimaryFocusArea = pfAreaDim.group();
    var numDonationsByPrimaryFocusSubject = pfSubjectDim.group();
    var numDonationsByGradeLevel = gradeLevelDim.group();
    var numDonationsByTeachForAmerica = tfAmericaDim.group();

    var stateGroup = stateDim.group();

    var all = ndx.groupAll();
    var totalDonations = ndx.groupAll().reduceSum(function (d) {
        return d["total_donations"];
    });

    // Define values to be used in charts
    var minDate = dateDim.bottom(1)[0]["date_posted"];
    var maxDate = dateDim.top(1)[0]["date_posted"];

    // Charts
    //Line charts
    var timeChart = dc.lineChart("#time-chart");
    //Select menu
    var selectField = dc.selectMenu("#menu-select");

    //Number display
    var numberDonationsND = dc.numberDisplay("#number-donations-nd");
    var totalDonationsND = dc.numberDisplay("#total-donations-nd");

    //Row charts
    var resourceTypeChart = dc.rowChart("#resource-type-rc");
    var povertyLevelChart = dc.rowChart("#poverty-level-rc");
    var pfAreaChart = dc.rowChart("#pf-area-rc");
    var pfSubjectChart = dc.rowChart("#pf-subject-rc");

    //Pie charts
    var fundingStatusChart = dc.pieChart("#funding-status-pie");
    var gradeLevelChart = dc.pieChart("#grade-level-pie");
    var tfAmericaChart = dc.pieChart("#tf-america-pie");

    //data Table
    datatable = dc.dataTable("#data-table");
    datacount = dc.numberDisplay("#data-count");

    //Configure chart parameters
    //line
    timeChart
        .ordinalColors(["#0078d7"])
        .width(1000)
        .height(300)
        .margins({top: 30, right: 50, bottom: 30, left: 50})
        .dimension(dateDim)
        .group(numDonationsByDate)
        .renderArea(true)
        .transitionDuration(500)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .elasticY(true)
        .xAxisLabel("Year")
        .yAxis().ticks(6);

    //select //
    selectField
        .dimension(stateDim)
        .group(stateGroup);

    //number
    numberDonationsND //1 figure
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(all);

    totalDonationsND // 1 figure
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(totalDonations)
        .formatNumber(d3.format("$.3s"));

    //row
    resourceTypeChart // books, other, supplies, tech, trips, visitors= 6 [roygbi]
        .ordinalColors(["#ff0000", "#f8a900", "#f8f800", "#10aa35", "#0078d7", "#ca83bf"])
        .width(300)
        .height(250)
        .dimension(resourceTypeDim)
        .group(numDonationsByResourceType)
        .xAxis().ticks(5);

    povertyLevelChart // highest, high, moderate, low =4 [royg]
        .ordinalColors(["#ff0000", "#f8a900", "#f8f800", "#00ff00"])
        .width(300)
        .height(250)
        .dimension(povertyLevelDim)
        .group(numDonationsByPovertyLevel)
        .ordering(function (d) {
            return -d.value
        }) //reordered so poverty with largest count is at top of chart.
        .xAxis().ticks(5);

    pfAreaChart /// R =applied learning,  O=health & sports, Y=history & civics, G =literacy & language,
    // B =math & science, I =music & arts, P= special needs =7
        .ordinalColors(["#ff0000", "#f8a900", "#f8f800", "#10aa35", "#0078d7", "#ca83bf", "#831c73"])
        .width(300)
        .height(250)
        .dimension(pfAreaDim)
        .group(numDonationsByPrimaryFocusArea)
        .xAxis().ticks(4);

    pfSubjectChart  //28
        .ordinalColors([
            "#0078d7", "#ff0000", "#f8f800", "#ff0000", //1B 2R 3Y 4R
            "#ff0000", "#10aa35", "#ff0000", "#f8f800", //5R 6G 7R 8Y
            "#0078d7", "#ff0000", "#f8f800", "#10aa35", //9B 10R 11Y 12G
            "#f8a900", "#0078d7", "#f8a900", "#f8f800", //13O 14B 15O 16Y
            "#10aa35", "#10aa35", "#0078d7", "#ca83bf", //17G 18G 19B 20I
            "#f8a900", "#ff0000", "#ff0000", "#ca83bf", //21O 22R 23R 24I
            "#f8f800", "#831c73", "#f8a900", "#ca83bf" //25Y 26P 27O 28I
        ])
        .width(1000)
        .height(500)
        .dimension(pfSubjectDim)
        .group(numDonationsByPrimaryFocusSubject)
        .xAxis().ticks(5);

    // Setup the charts

    datatable
        .dimension(dateDim)
        .group(function(d) { return d.Year; })
        .turnOnControls(true)
        .size(Infinity)
        .columns([
            function (d) {
                return ("0" + (d.date_posted.getMonth()+1)).slice(-2)
                    + "-" + d.date_posted.getFullYear();
            },
            function (d) {
                return "$" + d.total_donations
            },
            function (d) {
                return d.num_donors
            },
            function (d) {
                return d.resource_type
            },
            function (d) {
                return d.school_state
            },
            function (d) {
                return d.school_county
            },
            function (d) {
                return d.students_reached
            },
            function (d) {
                return d.funding_status
            }
        ])
        .sortBy(function (d) {
            return d.Year;
        }) //Added sort by Year to fix issue of data not displaying
        .order(d3.descending);

    datacount
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(all);
    //pie
    fundingStatusChart //completed, expired, live, reallocated= 4 (lime/ red/ forestgreen /yellow)
        .ordinalColors(["#00ff00", "#ff0000", "#10aa35", "#f8f800"])
        .height(250)
        .radius(90)
        .transitionDuration(1500)
        .dimension(fundingStatusDim)
        .group(numDonationsByFundingStatus)
        .cx(170)
        .cy(140)
        .legend(dc.legend());

    gradeLevelChart // 3-5, 6-8, 9-12, preK-2,=4 (orange/ yellow/ dodgerblue/ purple)
        .ordinalColors(["#f8a900", "#f8f800", "#0078d7", "#831c73"])
        .height(250)
        .radius(100)
        .innerRadius(70)
        .transitionDuration(1200)
        .dimension(gradeLevelDim)
        .group(numDonationsByGradeLevel)
        .legend(dc.legend().x(110).y(90));

    tfAmericaChart // false, true (red/ lime)
        .ordinalColors(["#ff0000", "#00ff00"])
        .height(250)
        .radius(90)
        .innerRadius(40)
        .transitionDuration(1500)
        .dimension(tfAmericaDim)
        .group(numDonationsByTeachForAmerica)
        .legend(dc.legend().x(145).y(105));

    update();
    dc.renderAll();
}
console.log(typeof "#data-count"); //test confirmed #data-count is a string

//taken and adapted from https://dc-js.github.io/dc.js/docs/html/dc.dataTable.html &
//https://dc-js.github.io/dc.js/examples/table-pagination.html
var startpt = 0, endpt = 10; //changed variables to be more meaningful
function display() {
    d3.select('#start')
        .text(startpt+1);
    d3.select('#end')
        .text(startpt+endpt);
    d3.select('#prev')
        .attr('disabled', startpt-endpt<0 ? 'true' : null);
    d3.select('#next')
        .attr('disabled', startpt+endpt>=parseInt($("#data-count").text()) ? 'true' : null);
    //use jQuery to convert string: #data-count to Integer.
}
function update() {
    datatable.beginSlice(startpt);
    datatable.endSlice(startpt+endpt);
    display();
}
function prev() {
    startpt -= endpt;
    update();
    datatable.redraw();
}
function next() {
    startpt += endpt;
    update();
    datatable.redraw();
}
//Added reset table function
function resetTable() {
    startpt = 0;
    update();
    datatable.redraw();
}
