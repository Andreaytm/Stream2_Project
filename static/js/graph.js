queue()
    .defer(d3.json, "/USdonors/donations")
    .await(makeGraphs);

function makeGraphs(error, donationsJson) {
    if (error) {
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }

    //Clean donorsdonations data
    var donorsDonations = donationsJson
    var dateFormat= d3.time.format(("%d/%m/%Y %H:%M"));
    donorsDonations.forEach(function(d) {
        d["date_posted"] = dateFormat.parse(d["date_posted"]);
        d["date_posted"].setDate(1);
        d["total_donations"] = +d["total_donations"];
    });


    //Create a Crossfilter instance
    var ndx = crossfilter(donorsDonations);

    //Define Dimensions
    var dateDim = ndx.dimension(function(d) {
        return d["date_posted"];
    });
    var resourceTypeDim = ndx.dimension(function(d) {
        return d["resource_type"];
    });
    var povertyLevelDim = ndx.dimension(function(d) {
        return d["poverty_level"];
    });
    var fundingStatusDim = ndx.dimension(function(d) {
        return d["funding_status"];
    });
    var stateDim = ndx.dimension(function(d) {
        return d["school_state"];
    });
    var pfAreaDim = ndx.dimension(function(d) {
        return d["primary_focus_area"];
    });
    var pfSubjectDim = ndx.dimension(function(d) {
        return d["primary_focus_subject"];
    });
    var gradeLevelDim = ndx.dimension(function(d) {
        return d["grade_level"];
    });
    var tfAmericaDim = ndx.dimension(function(d) {
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
    var totalDonationsByState = stateDim.group().reduceSum(function(d) {
        return d["total_donations"];
    });
    var stateGroup = stateDim.group();

    var all = ndx.groupAll();
    var totalDonations = ndx.groupAll().reduceSum(function(d) {
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

    //Configure chart parameters
    //line
    timeChart
        .ordinalColors(["#0078d7"])
        .width(1200)
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

    //select // ["KS", "DE", "MN", "KY", "HI", "ID", "AK"]=7
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
        .formatNumber(d3.format(".3s"));

    //row
    resourceTypeChart // books, other, supplies, tech, trips, visitors= 6 [roygbi]
        .ordinalColors(["#ff0000", "#f8a900", "#10aa35", "#0078d7", "#f8f800", "#ca83bf"])
        .width(300)
        .height(250)
        .dimension(resourceTypeDim)
        .group(numDonationsByResourceType)
        .xAxis().ticks(4);

    povertyLevelChart // highest, high, moderate, low =4 [royg]
        .ordinalColors(["#ff0000", "#f8a900", "#f8f800", "#00ff00"])
        .width(300)
        .height(250)
        .dimension(povertyLevelDim)
        .group(numDonationsByPovertyLevel)
        .ordering(function (d) {
            return -d.value
        }) //reordered so type of poverty with largest count is at top of chart.
        .xAxis().ticks(4);

    pfAreaChart /// R =applied learning,  O=health & sports, Y=history & civics, G =literacy & language,
    // B =math & science, P =music & arts, I= special needs =7
        .ordinalColors(["#ff0000", "#f8a900", "#f8f800", "#10aa35", "#0078d7", "#ca83bf", "#831c73"])
        .width(300)
        .height(250)
        .dimension(pfAreaDim)
        .group(numDonationsByPrimaryFocusArea)
        .xAxis().ticks(7);

    pfSubjectChart  //28
        .ordinalColors([
            "#0078d7", "#ff0000", "#f8f800", "#ff0000", //1B 2R 3Y 4R
            "#ff0000", "#10aa35", "#ff0000", "#f8f800",//5R 6G 7R 8Y
            "#0078d7", "#ff0000", "#10aa35", "#f8a900",//9B 10R 11G 12O
            "#0078d7", "#f8a900", "#f8f800", "#10aa35", //13B 14O 15Y 16G
            "#10aa35", "#0078d7", "#ca83bf", "#f8a900",//17G 18B 19I 20O
            "#ff0000", "#ff0000", "#ca83bf", "#f8f800", // 21R 22R 23I 24Y
            "#831c73", "#f8a900", "#ca83bf" //25P 26O 27I
        ])
        .width(1200)
        .height(500)
        .dimension(pfSubjectDim)
        .group(numDonationsByPrimaryFocusSubject)
        .xAxis().ticks(8);

    //pie
    fundingStatusChart //completed, expired, reallocated, live = 4 (lime/ red /yellow/ forestgreen)
        .ordinalColors(["#00ff00", "#ff0000", "#f8f800", "#10aa35"])
        .height(220)
        .radius(90)
        .innerRadius(40)
        .transitionDuration(1500)
        .dimension(fundingStatusDim)
        .group(numDonationsByFundingStatus)
        .legend(dc.legend());

    gradeLevelChart // 3-5, preK-2, 6-8, 9-12 =4 (orange/ yellow/ dodgerblue/ purple)
        .ordinalColors(["#f8a900", "#f8f800", "#0078d7", "#831c73"])
        .height(220)
        .radius(90)
        .innerRadius(40)
        .transitionDuration(1500)
        .dimension(gradeLevelDim)
        .group(numDonationsByGradeLevel)
        .legend(dc.legend());

    tfAmericaChart // false, true (red/ lime)
        .ordinalColors(["#ff0000", "#00ff00"])
        .height(220)
        .radius(90)
        .innerRadius(40)
        .transitionDuration(1500)
        .dimension(tfAmericaDim)
        .group(numDonationsByTeachForAmerica)
        .legend(dc.legend());

    dc.renderAll();
}