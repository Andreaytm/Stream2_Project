queue()
    .defer(d3.json, "/donors/donations")
    .await(makeGraphs);

function makeGraphs(error, donorsdonations) {
    if(error) {
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }

    //Clean donorsdonations data
    var dateFormat = d3.time.format("%Y-%m-%d %H:%M:%S");
    donorsdonations.forEach(function (d) {
        d["date_posted"] = dateFormat.parse(d["date_posted"]);
        d["date_posted"].setDate(1);
        d["total_donations"] = +d["total_donations"];
    });

    //Create a Crossfilter instance
    var ndx = crossfilter(donorsdonations);

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
    var totalDonationsByState = stateDim.group().reduceSum(function (d) {
        return d["total_donations"];
    });

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
    var timeChart = dc.lineChart("#time-line");

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

    //pie charts
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
        .yAxis().ticks(5);

    //select
    selectField  // ["KS", "MN", "KY", "ID", "HI", "NH", "MT", "AK"]=8
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
    resourceTypeChart // books, tech, supplies = 3 (removed 'other', 'visitors' and 'trips' as no detail into spend)
        .ordinalColors(["#00ff00", "#10aa35", "#0078d7", "#ca83bf", "#831c73"])
        .width(300)
        .height(250)
        .dimension(resourceTypeDim)
        .group(numDonationsByResourceType)
        .xAxis().ticks(4);

    povertyLevelChart // low, moderate, high, highest =4
        .ordinalColors(["#ff0000", "#f8a900", "#f8f800", "#00ff00"])
        .width(300)
        .height(250)
        .dimension(povertyLevelDim)
        .group(numDonationsByPovertyLevel)
        .xAxis().ticks(4);

    pfAreaChart /// math & science, literacy & language, applied learning, music & arts,
                /// history & civics, special needs, health & sports =7
        .ordinalColors(["#ff0000", "#f8a900", "#f8f800", "#00ff00"])
        .width(300)
        .height(250)
        .dimension(pfAreaDim)
        .group(numDonationsByPrimaryFocusArea)
        .xAxis().ticks(4);

    pfSubjectChart  //28
        .ordinalColors(["#ff0000", "#f8a900", "#f8f800", "#00ff00"])
        .width(300)
        .height(250)
        .dimension(pfSubjectDim)
        .group(numDonationsByPrimaryFocusSubject)
        .xAxis().ticks(4);

    //pie
    fundingStatusChart //completed, expired, reallocated, live = 4
        .ordinalColors(["#ff0000", "#f8f800", "#00ff00"])
        .height(220)
        .radius(90)
        .innerRadius(40)
        .transitionDuration(1500)
        .dimension(fundingStatusDim)
        .group(numDonationsByFundingStatus);

    gradeLevelChart // 3-5, preK-2, 6-8, 9-12 =4
        .ordinalColors(["#ff0000", "#f8f800", "#00ff00"])
        .height(220)
        .radius(90)
        .innerRadius(40)
        .transitionDuration(1500)
        .dimension(gradeLevelDim)
        .group(numDonationsByGradeLevel);

    tfAmericaChart //true, false
        .ordinalColors(["#ff0000", "#f8f800", "#00ff00"])
        .height(220)
        .radius(90)
        .innerRadius(40)
        .transitionDuration(1500)
        .dimension(tfAmericaDim)
        .group(numDonationsByTeachForAmerica);

    dc.renderAll();
}
